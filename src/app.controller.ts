import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/soma')
  getHello(@Body('n1') n1: number, @Body('n2') n2: number) {
    return n1 + n2;
  }
}
