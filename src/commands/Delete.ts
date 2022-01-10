import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { client } from "..";
import { Pagination } from "../structure/Pagination";

export default class extends Command {
  name = "delete";
  description = "delete an nft";

  async exec(msg: Message) {

    const nfts = client.nft.map((x: string, id: number | string) => {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(x)
        .addField("ID", `${id}`);

      return embed;
    });


    const menu = new Pagination(msg, nfts);

    menu.setOnSelect(i => {

      const nft = nfts[i];
      const { value: id } = nft.fields[0];

      client.nft.delete(parseInt(id));
      msg.channel.send(`Successfully deleted #${id}`);

    })

    await menu.run();
  }
}
