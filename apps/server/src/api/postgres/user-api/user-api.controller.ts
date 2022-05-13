import { Controller, Get } from '@nestjs/common';
import { UserServices } from '../../../services/use-cases/user/user-services.service';

@Controller('postgres/user')
export class UserApiController {
  constructor(private readonly service: UserServices) {}

  @Get()
  async getAll() {
    return this.service.getAllUsers();
  }
}
