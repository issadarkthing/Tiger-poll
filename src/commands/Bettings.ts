import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { Player } from "../structure/Player";
import { currency } from "../utils";



export default class extends Command {
  name = "bettings";
  description = "show your current betting";

  async exec(msg: Message) {

    const player = Player.fromUser(msg.author);
    const bet = player.bet;

    if (!bet) {
      throw new Error("You haven't placed any bets");
    }

    const description = 
      `You've placed your bet on #${bet.nftID} for ${bet.amount} ${currency}`;
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(description)
      .setImage(bet.nftUrl)

    msg.channel.send({ embeds: [embed] });

  }
}
