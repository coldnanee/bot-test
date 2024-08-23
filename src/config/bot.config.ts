import { IBotOptions } from '@/bot/bot.interface';
import { ConfigService } from '@nestjs/config';

export const getBotConfig = (config: ConfigService): IBotOptions => ({
  token: config.get('TG_BOT_SECRET_KEY'),
});
