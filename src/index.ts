import path from "path";
import { config } from "dotenv";
import { Client } from "./structure/Client";

config();

export const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.commandManager.verbose = true;
client.commandManager.registerCommands(path.resolve(__dirname, "./commands"));

client.commandManager.registerCommandNotFoundHandler((msg, cmdName) => {
  msg.channel.send(`Cannot find command "${cmdName}"`);
})

client.commandManager.registerCommandOnThrottleHandler((msg, cmd, timeLeft) => {
  const time = (timeLeft / 1000).toFixed(2);
  msg.channel.send(`You cannot run ${cmd.name} command after ${time} s`);
})

client.commandManager.registerCommandMissingPermissionHandler((msg, perms) => {
  msg.channel.send(`Missing permissions \`${perms.join(", ")}\``);
})

client.commandManager.registerCommandErrorHandler((err, msg) => {
  msg.channel.send((err as Error).message);
})

client.on("ready", () => console.log(client.user?.username, "is ready!"))
client.on("messageCreate", msg => { 

  const prefix = client.commandManager.prefix;
  const isUploadCommand = /^.upload$/.test(msg.content);
  const isCommand = msg.content.startsWith(prefix);

  if (isCommand) {

    const count = client.nft.size;

    if (!isUploadCommand && count === 0) {

      msg.channel.send(
        `Please upload at least 2 nft using \`${prefix}upload\` command`
      );

    } else {
      client.commandManager.handleMessage(msg);
    }
  }

});

client.login(process.env.BOT_TOKEN);
