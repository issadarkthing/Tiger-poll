import { Command } from "@jiman24/commandment";
import { toNList } from "@jiman24/discordjs-utils";
import { Message, MessageEmbed } from "discord.js";
import { nftRank } from "../utils";



export default class extends Command {
  name = "top";
  description = "show top 10 nft votes";
  disable = true;

  async exec(msg: Message) {

    const nfts = nftRank().slice(0, 10);
    const list = toNList(nfts.map(x => `(${x.votes} votes) ${x.url}`));

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Top 10 NFT")
      .setDescription(list);

    msg.channel.send({ embeds: [embed] });

  }
}
