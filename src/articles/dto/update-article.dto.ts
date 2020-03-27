import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ArticleStatus } from '../article-status.enum';

export class UpdateArticleDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  body: string;

  @ApiProperty()
  @IsOptional()
  @IsIn([ArticleStatus.PUBLISHED, ArticleStatus.DRAFT, ArticleStatus.DELETED])
  status: ArticleStatus
}