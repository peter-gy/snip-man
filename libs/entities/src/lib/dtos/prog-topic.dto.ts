import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProgTopicDto {
  @ApiProperty({ example: 'cl36077510000x0piwzwwx94t' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({ default: null })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  parentId?: string;

  @ApiProperty({ example: 'NestJS & Swagger' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Integration of OpenAPI standards with NestJS' })
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateProgTopicDto extends PartialType(CreateProgTopicDto) {}
