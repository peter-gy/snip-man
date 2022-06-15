import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ProgLanguageEntity } from '../entities';

export class CreateProgSnippetDto {
  @ApiProperty({
    example: 'cl36077510000x0piadfdwx94t',
    description:
      'ID of the ProgTopic inside which this snippet should be created',
  })
  @IsString()
  @IsNotEmpty()
  progTopicId: string;

  @ApiProperty({ example: 'Factorial' })
  @IsString()
  @IsNotEmpty()
  headline: string;

  @ApiProperty({ example: 'const f = (x) => x == 0 ? 1 : x*f(x-1)' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: null })
  @IsDate()
  @IsOptional()
  lastModified?: Date;

  @ApiProperty({ example: null })
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({
    example: {
      id: 'cl36077510000x0piasffdwx94t',
      name: 'JavaScript',
      version: 'ES6',
    },
    description: 'ProgLanguage in which this snippet is written',
  })
  progLanguage: Partial<ProgLanguageEntity>;

  @ApiProperty({ example: null, description: 'Email address of the author' })
  userEmail?: string;
}

export class UpdateProgSnippetDto extends PartialType(CreateProgSnippetDto) {}
