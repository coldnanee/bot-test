import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';
import { validateEnv } from '@/common';

const environmentVariables = z.object({
  SERVER_PORT: z.preprocess(
    Number,
    z
      .number({
        message: 'Server port must be a number',
      })
      .positive('Invalid server port'),
  ),
  TG_BOT_SECRET_KEY: z.string({
    message: 'Telegram bot key must be a string',
  }),
});

export const envConfig: ConfigModuleOptions = {
  isGlobal: true,
  validate: validateEnv(environmentVariables),
};
