import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getConfig() {
    return {
      port: this.configService.get<number>('port'),
      databaseUrl: this.configService.get<string>('database.url'),
      frontendUrl: this.configService.get<string>('frontendUrl'),
    };
  }
}
