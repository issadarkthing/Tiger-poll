import { Command } from "@jiman24/commandment";
import { toNList } from "@jiman24/discordjs-utils";
import { Message, MessageEmbed } from "discord.js";
import { client } from "..";



export default class extends Command {
  name = "top";
  description = "show top 10 nft votes";

  async exec(msg: Message) {

    const nfts = [...client.nft.values()].sort((a, b) => b.votes - a.votes);
    const list = toNList(nfts.map(x => `(${x.votes} votes) ${x.url}`));

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Top 10 NFT")
      .setDescription(list);

    msg.channel.send({ embeds: [embed] });

  }
}
