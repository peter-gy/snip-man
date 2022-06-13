import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserServices } from '../../services/use-cases/user/user-services.service';
import { DataSourceType } from '../../core';
import { CreateUserDto, UserEntity } from '@snip-man/entities';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

export class UserApiControllerBuilder {
  static build(dataSourceType: DataSourceType) {
    const openApiTag = 'User';

    @Controller(`${dataSourceType}/user`)
    class EndpointController {
      constructor(private readonly service: UserServices) {}

      @ApiOperation({
        tags: [openApiTag],
        summary: 'Creates a new user',
      })
      @Post()
      create(@Body() dto: CreateUserDto) {
        return this.service.create(dto);
      }

      @ApiOperation({
        tags: [openApiTag],
        summary: 'Retrieve all users',
      })
      @Get()
      findAll() {
        return this.service.findAll();
      }

      @ApiOperation({
        tags: [openApiTag],
        summary: 'Find user by username',
      })
      @ApiQuery({
        name: 'value',
        required: true,
        description: 'The username of the user to find',
      })
      @Get('find-by-username')
      findByUsername(@Query('value') username: Pick<UserEntity, 'username'>) {
        return this.service.findByUsername(username);
      }

      @ApiOperation({
        tags: [openApiTag],
        summary: 'Find user by email',
      })
      @ApiQuery({
        name: 'value',
        required: true,
        description: 'The email of the user to find',
      })
      @Get('find-by-email')
      findByEmail(@Query('value') email: string) {
        return this.service.findByEmail(email);
      }
    }

    return EndpointController;
  }
}
