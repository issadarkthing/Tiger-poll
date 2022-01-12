import { Command } from "@jiman24/commandment";
import { validateAmount, validateNumber } from "@jiman24/discordjs-utils";
import { Message } from "discord.js";
import { client } from "..";
import { Bet, Player } from "../structure/Player";
import { currency } from "../utils";



export default class extends Command {
  name = "bet";
  description = "bet for your nft";

  async exec(msg: Message, args: string[]) {

    const player = Player.fromUser(msg.author);
    const amount = parseInt(args[0]);
    const nftID = parseInt(args[1]);

    validateNumber(amount);
    validateAmount(amount, player.coins);


    if (player.bet) {
      const bet = player.bet;
      throw new Error(
        `You already placed ${bet.amount} ${currency} for #${bet.nftID}`
      );
    }

    validateNumber(nftID);
    const nft = client.nft.get(nftID);

    if (!nft) {
      throw new Error(`#${nftID} nft does not exists`);
    }

    const bet: Bet = {
      amount,
      nftID,
      nftUrl: nft.url,
    }

    player.bet = bet;
    player.coins -= amount;

    player.save();

    msg.channel.send(`Successfully placed ${amount} ${currency} bet for #${bet.nftID}`);

  }
}
