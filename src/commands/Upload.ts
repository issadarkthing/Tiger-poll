import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { Prompt } from "@jiman24/discordjs-prompt";
import { client } from "..";

export default class extends Command {
  name = "upload";

  async exec(msg: Message) {

    const prompt = new Prompt(msg);

    const collected = await prompt.collect("Please upload nft");
    const image = collected.attachments.first();

    if (!image) {
      throw new Error("no image was uploaded");
    }

    const imageUrl = image.url;
    const id = client.nft.autonum;

    client.nft.set(id, imageUrl);

    msg.channel.send(`Successfully saved #${id} nft`);
  }
}
