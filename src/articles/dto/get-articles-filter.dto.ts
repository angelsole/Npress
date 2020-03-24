import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ArticleStatus } from '../article-status.enum';

export class GetArticlesFilterDto {
  @ApiPropertyOptional({
    description: 'The status of article',
    enum: ArticleStatus,
  })
  @IsOptional()
  @IsIn([ArticleStatus.PUBLISHED, ArticleStatus.DRAFT, ArticleStatus.DELETED])
  status: ArticleStatus;

  @ApiPropertyOptional({
    description: 'Search in title or body of an Article',
  })
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @ApiPropertyOptional({
    description: 'Limit of article number retrieved.',
    default: 20,
  })
  @IsOptional()
  limit: number;

  @ApiPropertyOptional({
    description: 'Offset of article number retrieved.',
    default: 0,
  })
  @IsOptional()
  offset: number;
}