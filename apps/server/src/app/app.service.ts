import { Injectable } from '@nestjs/common';
import { entities } from '@snip-man/entities';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return {
      message: `Welcome to server! Message from a shared lib: ${entities()}`,
    };
  }
}
