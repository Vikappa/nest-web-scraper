import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PlaylistDiVincenzoResponse } from './utils/customTypes';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): PlaylistDiVincenzoResponse {
    return this.appService.getHello();
  }
}
