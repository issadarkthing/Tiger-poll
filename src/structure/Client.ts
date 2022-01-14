import { CommandManager } from "@jiman24/commandment";
import Enmap from "enmap";
import { Client as DiscordClient } from "discord.js";
import { NFT } from "./NFT";


export class Client extends DiscordClient {
  commandManager = new CommandManager(process.env.PREFIX || "!");
  nft = new Enmap<number, NFT>("nft");
  player = new Enmap("player");
  settings = new Enmap("settings");
}
