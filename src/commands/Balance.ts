import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { Player } from "../structure/Player";
import { currency } from "../utils";



export default class extends Command {
  name = "balance";
  description = "check your balance";
  aliases = ["bal"];

  async exec(msg: Message) {

    const player = Player.fromUser(msg.author);
    msg.channel.send(`You have ${player.coins} ${currency}`);
  }
}

