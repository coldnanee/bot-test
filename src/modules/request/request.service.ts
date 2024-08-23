import { Injectable } from '@nestjs/common';
import { IRequest, IStackItem } from './request.interface';
import { LIMIT_REQUESTS } from './request.constants';
import { randomUUID } from 'crypto';
import { RequestEntity } from './entities';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class RequestService {
  private stack: IStackItem[] = [];
  private requests = new Map<string, RequestEntity>();

  constructor() {}

  public async addRequest(
    request: Pick<IStackItem, 'chatId'>,
    bot: TelegramBot,
  ) {
    const { chatId } = request;

    const requestId = randomUUID();

    if (this.requests.size < LIMIT_REQUESTS) {
      this.requests.set(
        requestId,
        new RequestEntity({ chatId, requestId }, (res) =>
          this.finish({ requestId, chatId }, res, bot),
        ),
      );

      return bot.sendMessage(chatId, `Request is starting. Id: ${requestId}`);
    }

    const { message_id } = await bot.sendMessage(
      chatId,
      `Request add into stack. Place: ${this.stack.length + 1}`,
    );

    this.stack.push({ ...request, requestId, messageId: String(message_id) });

    return;
  }

  private finish(req: IRequest, result: string, bot: TelegramBot) {
    bot.sendMessage(req.chatId, result);
    this.requests.delete(req.requestId);

    if (this.stack.length) {
      const { messageId, requestId, chatId } = this.stack.shift();

      this.requests.set(
        requestId,
        new RequestEntity({ chatId, requestId }, (res) =>
          this.finish({ requestId, chatId }, res, bot),
        ),
      );

      bot.editMessageText(`Request ${requestId} has started`, {
        message_id: +messageId,
        chat_id: +chatId,
      });

      this.editPlace(requestId, bot);
    }
  }

  private editPlace(requestId: string, bot: TelegramBot) {
    this.stack.forEach((stackItem, index) => {
      bot.editMessageText(
        `Request ${requestId} place updated. Now: ${index + 1}`,
        {
          chat_id: stackItem.chatId,
          message_id: +stackItem.messageId,
        },
      );
    });
  }
}
