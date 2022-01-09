import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { Prompt } from "@jiman24/discordjs-prompt";

export default class extends Command {
  name = "upload";

  async exec(msg: Message) {

    const prompt = new Prompt(msg);
  }
}
