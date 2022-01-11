import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { client } from "..";
import { Pagination } from "../structure/Pagination";


export default class extends Command {
  name = "nft";
  description = "show all nft";

  async exec(msg: Message) {

    const nfts = client.nft.map((x: string, id: number | string) => {
      const votes = client.vote.get(id) || 0;
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(x)
        .addField("ID", `${id}`, true)
        .addField("Votes", `${votes}`, true)

      return embed;
    });


    const menu = new Pagination(msg, nfts);

    await menu.run();
  }
}
