import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { client } from "..";
import { combination } from "../utils";
import { random } from "@jiman24/discordjs-utils";
import { ButtonHandler } from "@jiman24/discordjs-button";


export default class extends Command {
  name = "vote";

  async exec(msg: Message) {

    let rounds = client.nft.size;

    if (rounds > 10) {
      rounds = 10;
    }

    const pairs = random.sample(combination([...client.nft.values()]), rounds);
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
      const winnerID = client.nft.findKey(x => x === winner)!;

      client.vote.set(winnerID, client.vote.get(winnerID) + 1 || 1);
      msg.channel.send(`#${winnerID} now has ${client.vote.get(winnerID)} votes!`);
    }

    msg.channel.send("voting session completed");
  }
}
