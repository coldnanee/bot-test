import { SEND_REQUEST_COMMAND } from '../bot.constants';
import { Command } from './abstract.command';
import * as TelegramBot from 'node-telegram-bot-api';

export class StartCommand implements Command {
  constructor(private readonly bot: TelegramBot) {}

  public handle(): void {
    this.bot.onText(/\/start/, async (msg) => {
      this.bot.sendMessage(msg.chat.id, 'Hello!', {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [[{ text: SEND_REQUEST_COMMAND }]],
          // one_time_keyboard: true,
        },
      });
    });
  }
}
