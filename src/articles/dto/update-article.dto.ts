import {
  IsNotEmpty,
  IsOptional,
  IsIn,
  MinLength,
  IsString,
  NotContains,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ArticleStatus } from '../article-status.enum';

export class UpdateArticleDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  @IsOptional()
  body: string;

  @ApiProperty()
  @IsOptional()
  @IsIn([ArticleStatus.PUBLISHED, ArticleStatus.DRAFT, ArticleStatus.DELETED])
  status: ArticleStatus

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  @IsOptional()
  @NotContains(' ')
  slug: string;

}