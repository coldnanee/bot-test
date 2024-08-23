import { Inject, Injectable } from '@nestjs/common';
import { BOT_MODULE_OPTIONS } from './bot.constants';
import { IBotOptions } from './bot.interface';
import * as TelegramBot from 'node-telegram-bot-api';
import { StartCommand, Command, RequestCommand } from './commands';
import { RequestService } from '@/modules/request/request.service';

@Injectable()
export class BotService {
  public bot: TelegramBot;
  private commands: Command[] = [];
  constructor(
    @Inject(BOT_MODULE_OPTIONS) private readonly options: IBotOptions,
    private readonly requestService: RequestService,
  ) {
    this.bot = new TelegramBot(options.token, { polling: true });
    this.commands = [
      new StartCommand(this.bot),
      new RequestCommand(this.bot, this.requestService),
    ];
    this.init();
  }

  private init() {
    for (const command of this.commands) {
      command.handle();
    }
  }
}
