import { Command } from "@jiman24/commandment";
import { Message, PermissionResolvable } from "discord.js";
import { Prompt } from "@jiman24/discordjs-prompt";
import { client } from "..";
import { NFT } from "../structure/NFT";
import { time } from "@jiman24/discordjs-utils";

export default class extends Command {
  name = "upload";
  description = "upload new nft";
  permissions: PermissionResolvable[] = ["ADMINISTRATOR"];

  async exec(msg: Message) {

    const prompt = new Prompt(msg, { time: 10 * time.MINUTE });

    const collected = await prompt.collect(
      "Please upload nft. You may upload multiple nft at once"
    );
    const attachments = collected.attachments;

    if (attachments.size <= 0) {
      throw new Error("no image was uploaded");
    }

    for (const image of attachments.values()) {

      const imageUrl = image.url;
      const id = client.nft.autonum;

      client.nft.set(id, { ...new NFT(imageUrl) });

      msg.channel.send(`Successfully saved #${id} nft`);
    }

  }
}
