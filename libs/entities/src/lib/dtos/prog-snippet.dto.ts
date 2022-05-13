import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProgSnippetDto {
  @IsString()
  @IsNotEmpty()
  progTopicId: string;

  @IsString()
  @IsNotEmpty()
  headline: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDate()
  lastModified: Date;

  @IsDate()
  createdAt: Date;
}

export class UpdateProgSnippetDto extends PartialType(CreateProgSnippetDto) {}
