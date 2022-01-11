import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { client } from "..";
import { combination } from "../utils";
import { random } from "@jiman24/discordjs-utils";
import { ButtonHandler } from "@jiman24/discordjs-button";


export default class extends Command {
  name = "vote";
  description = "start voting";

  async exec(msg: Message) {

    if (client.nft.size < 2) {
      throw new Error("Needs at least 2 nft");
    }

    let rounds = client.nft.size;

    if (rounds > 10) {
      rounds = 10;
    }

    const pairs = random.sample(combination([...client.nft.map(x => x.url)]), rounds);
    const embeds = pairs.map(pair => {
      return pair.map((x, i) => {
        const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setDescription(i == 0 ? "A" : "B")
          .setImage(x)

        return embed;
      })
    });


    for (let i = 0; i < embeds.length; i++) {
      const embed = embeds[i];
      const pair = pairs[i];
      let win = 0;

      const sentMsg = await msg.channel.send({ embeds: embed });

      const menu = new ButtonHandler(msg, "Please vote between A or B");

      menu.addButton("A", () => { win = 0 });
      menu.addButton("B", () => { win = 1 });

      await menu.run();
      await sentMsg.delete();

      const winner = pair[win];
      const winnerID = client.nft.findKey(x => x.url === winner)!;

      client.nft.inc(winnerID, "votes");

      const nft = client.nft.get(winnerID)!;

      msg.channel.send(`#${winnerID} now has ${nft.votes} votes!`);
    }

    msg.channel.send("voting session completed");
  }
}
