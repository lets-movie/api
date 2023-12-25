import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScrapperModule } from './scrapper/scrapper.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ScrapperModule],
})
export class WorkerModule {}
