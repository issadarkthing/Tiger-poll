import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed, User } from "discord.js";
import { client } from "..";
import { combination } from "../utils";
import { random, time } from "@jiman24/discordjs-utils";
import { ButtonHandler } from "@jiman24/discordjs-button";
import { Player } from "../structure/Player";


export default class extends Command {
  name = "vote";
  description = "start voting";
  block = true;
  maxRound = 10;
  timeout = 10 * time.MINUTE;
  maxUser = 1000;

  async exec(msg: Message) {

    if (client.nft.size < 2) {
      throw new Error("Needs at least 2 nft");
    }


    const combinations = combination([...client.nft.map(x => x.url)]);

    let rounds = combinations.length;

    if (rounds > this.maxRound) {
      rounds = this.maxRound;
    }

    const pairs = random.sample(combinations, rounds);
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

      const sentMsg = await msg.channel.send({ embeds: embed });

      const menu = new ButtonHandler(msg, "Please vote between A or B");

      const handleClick = (user: User, id: string) => {

        const player = Player.fromUser(user);

        if (player.voted) {
          msg.channel.send(`${player.name} has already voted`);
          return;
        }


        const winner = id === "A" ? pair[0] : pair[1];
        const winnerID = client.nft.findKey(x => x.url === winner)!;

        client.nft.inc(winnerID, "votes");

        msg.channel.send(`${player.name} successfully voted!`);
        player.voted = true;
        player.save();
      }

      menu.setMultiUser(this.maxUser);
      menu.setTimeout(this.timeout);

      menu.addButton("A", handleClick);
      menu.addButton("B", handleClick);

      await menu.run();
      await sentMsg.delete();


      msg.channel.send(`Round ${i + 1} completed`);
    }

    
    msg.channel.send("voting session completed");
  }
}
