import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envConfig, getBotConfig } from './config';
import { BotModule } from '@/bot/bot.module';
import { RequestModule } from '@/modules/request/request.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    BotModule.forRootAsync({
      imports: [RequestModule],
      inject: [ConfigService],
      useFactory: getBotConfig,
    }),
    RequestModule,
  ],
})
export class AppModule {}
