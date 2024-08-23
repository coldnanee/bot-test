import { DynamicModule, Module } from '@nestjs/common';
import type { IBotModuleAsyncOptions } from './bot.interface';
import { BotService } from './bot.service';
import { BOT_MODULE_OPTIONS } from './bot.constants';

@Module({})
export class BotModule {
  public static forRootAsync(options: IBotModuleAsyncOptions): DynamicModule {
    return {
      module: BotModule,
      imports: options.imports,
      providers: [
        BotService,
        {
          provide: BOT_MODULE_OPTIONS,
          useFactory: async (...args: any[]) => {
            const config = await options.useFactory(...args);
            return config;
          },
          inject: options.inject || [],
        },
      ],
      exports: [BotService],
    };
  }
}
