import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/soma')
  getHello(n1: number, n2: number) {
    return n1 + n2;
  }
}
