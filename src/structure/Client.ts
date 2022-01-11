import { CommandManager } from "@jiman24/commandment";
import Enmap from "enmap";
import { Client as DiscordClient } from "discord.js";


export class Client extends DiscordClient {
  commandManager = new CommandManager(process.env.PREFIX || "!");
  nft = new Enmap("nft");
  vote = new Enmap("vote");
}
