import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService {
  private readonly logger = new Logger(LoggingService.name);

  logRequest(url: string, payload: any) {
    this.logger.log(`URL: ${url}`);
    this.logger.log(`Payload: ${JSON.stringify(payload)}`);
  }

  logResponse(url: string, response: any) {
    this.logger.log(`URL: ${url} - Response: ${JSON.stringify(response)}`);
  }

  logError(url: string, error: any) {
    this.logger.error(`URL: ${url} - Error: ${JSON.stringify(error)}`);
  }
}
