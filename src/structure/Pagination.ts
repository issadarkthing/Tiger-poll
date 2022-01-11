import { Message, MessageEmbed } from "discord.js";
import { ButtonHandler } from "@jiman24/discordjs-button";

type OnSelectCallback = (index: number) => Promise<void> | void;

export class Pagination {
  private onSelect?: OnSelectCallback;

  constructor(
    private msg: Message,
    private pages: MessageEmbed[],
    private userID?: string,
    private index = 0
  ) {}

  setOnSelect(cb: OnSelectCallback) {
    this.onSelect = cb;
  }

  async run() {
    if (this.pages.length <= 0)
      throw new Error("cannot paginate with zero pages");

    const currentPage = this.pages[this.index];
    const menu = new ButtonHandler(this.msg, currentPage, this.userID);

    const resetEmbed = () => {
      menu.setEmbed(this.pages[this.index]);
    }

    menu.addButton(
      "<<",
      () => {
        this.index = 0;
        resetEmbed();
      },
    );

    menu.addButton(
      "<",
      () => {
        const hasPage = this.pages[this.index - 1];
        if (hasPage) {
          this.index--;
        }

        resetEmbed();
      }
    );

    menu.addButton(
      ">",
      () => {
        const hasPage = this.pages[this.index + 1];
        if (hasPage) {
          this.index++;
        }

        resetEmbed();
      }
    );

    menu.addButton(
      ">>",
      () => {
        this.index = this.pages.length - 1;
        resetEmbed();
      }
    );

    const onSelect = this.onSelect;
    if (onSelect) {
      menu.addButton("select", () => onSelect(this.index));
    }

    await menu.run();
  }
}
