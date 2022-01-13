import { Command } from "@jiman24/commandment";
import { toNList } from "@jiman24/discordjs-utils";
import { Message, MessageEmbed, PermissionResolvable } from "discord.js";
import { client } from "..";
import { Player } from "../structure/Player";
import { nftRank } from "../utils";


export default class extends Command {
  name = "end";
  description = "end the nft polling";
  permissions: PermissionResolvable[] = ["ADMINISTRATOR"];

  async exec(msg: Message) {

    const nftRankings = nftRank();
    const winNFT = nftRankings[0];
    const betsWinCount = client.player.reduce((acc, player: Player) => {
      return player.bet?.nftID === winNFT.id ? acc + 1 : 0;
    }, 0);

    for (const [playerID, p] of client.player) {
      const player = p as Player;
      const bet = player.bet;

      if (!bet) continue;

      if (bet.nftUrl === winNFT.url) {
        const winAmount = bet.amount + Math.round(bet.amount * 3 / (betsWinCount || 1));
        client.player.math(playerID, "+", winAmount, "coins");
        client.player.delete(playerID, "bet");
        client.player.update(`${playerID}`, { voted: false });
      }
    }

    for (const nftID of client.nft.keys()) {
      client.nft.update(`${nftID}`, { votes: 0 });
    }

    const nfts = nftRankings.slice(0, 10);
    const list = toNList(nfts
      .map(x => `#${x.id} (${x.votes} votes) ${x.url}`));

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Top 10 NFT")
      .setDescription(list);

    msg.channel.send({ embeds: [embed] });
  }
}
