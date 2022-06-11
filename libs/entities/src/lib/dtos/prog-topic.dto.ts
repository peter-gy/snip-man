import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TagEntity } from '../entities';

export class CreateProgTopicDto {
  @ApiProperty({ example: 'cl36077510000x0piwzwwx94t' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({ default: null })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  parentId?: string;

  @ApiProperty({ example: 'NestJS & Swagger' })
  @IsString()
  @IsNotEmpty({ always: true })
  name: string;

  @ApiPropertyOptional({
    example: 'Integration of OpenAPI standards with NestJS',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: [], description: 'Array of tags on this topic' })
  tags: Partial<TagEntity>[] = [];
}

export class UpdateProgTopicDto extends PartialType(CreateProgTopicDto) {}
