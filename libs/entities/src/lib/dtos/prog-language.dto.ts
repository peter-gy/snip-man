import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProgLanguageDto {
  @ApiProperty({ example: 'Dart' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2.17.0' })
  @IsString()
  @IsNotEmpty()
  version: string;
}

export class UpdateProgLanguageDto extends PartialType(CreateProgLanguageDto) {}
