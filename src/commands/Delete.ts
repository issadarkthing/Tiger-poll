import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed, PermissionResolvable } from "discord.js";
import { client } from "..";
import { NFT } from "../structure/NFT";
import { Pagination } from "../structure/Pagination";

export default class extends Command {
  name = "delete";
  description = "delete an nft";
  permissions: PermissionResolvable[] = ["ADMINISTRATOR"];

  async exec(msg: Message) {

    const nfts = client.nft.map((x: NFT, id: number | string) => {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(x.url)
        .addField("ID", `#${id}`);

      return embed;
    });


    const menu = new Pagination(msg, nfts);

    menu.setOnSelect(i => {

      const nft = nfts[i];
      const { value: id } = nft.fields[0];

      client.nft.delete(parseInt(id));
      msg.channel.send(`Successfully deleted #${id}`);

    })

    await msg.channel.send("Please select which nft to be deleted");
    await menu.run();
  }
}
