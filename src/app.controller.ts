import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/soma')
  getHello(@Query('n1') n1: number, @Query('n2') n2: number) {
    return n1 + n2;
  }
}
