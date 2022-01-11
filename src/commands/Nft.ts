import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { client } from "..";
import { NFT } from "../structure/NFT";
import { Pagination } from "../structure/Pagination";


export default class extends Command {
  name = "nft";
  description = "show all nft";

  async exec(msg: Message) {

    const nfts = client.nft.map((x: NFT, id: number | string) => {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(x.url)
        .addField("ID", `#${id}`, true)
        .addField("Votes", `${x.votes}`, true)

      return embed;
    });


    const menu = new Pagination(msg, nfts);

    await menu.run();
  }
}
