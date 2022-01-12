import { User } from "discord.js";
import { client } from "..";

export type Bet = {
  amount: number;
  nftID: number;
  nftUrl: string;
}

export class Player {
  coins = 100;
  user: User;
  bet?: Bet;

  constructor(user: User) {
    this.user = user;
  }

  get id() {
    return this.user.id;
  }

  get name() {
    return this.user.username;
  }

  static fromUser(user: User) {
    const data = client.player.get(user.id);
    const player = new Player(user);

    if (data) {
      Object.assign(player, data);
    }

    return player;
  }

  save() {
    const {user, ...rest} = this;
    client.player.set(this.id, rest);
  }
}
