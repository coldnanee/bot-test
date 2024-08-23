import { SEND_REQUEST_COMMAND } from '../bot.constants';
import { getReqexpCommand } from '../utils';
import { Command } from './abstract.command';
import * as TelegramBot from 'node-telegram-bot-api';
import { RequestService } from '@/modules/request/request.service';

export class RequestCommand implements Command {
  constructor(
    private readonly bot: TelegramBot,
    private readonly requestService: RequestService,
  ) {}

  public handle(): void {
    this.bot.onText(getReqexpCommand(SEND_REQUEST_COMMAND), ({ chat }) => {
      this.requestService.addRequest(
        {
          chatId: String(chat.id),
        },
        this.bot,
      );
    });
  }
}
