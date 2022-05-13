import { Module } from '@nestjs/common';
import { UserApiController } from './user-api.controller';
import { UserServicesModule } from '../../../services/use-cases/user/user-services.module';

@Module({
  controllers: [UserApiController],
  imports: [UserServicesModule.register('postgres')],
})
export class UserApiModule {}
