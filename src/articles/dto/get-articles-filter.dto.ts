import { ArticleStatus } from '../article-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class GetArticlesFilterDto {
  @IsOptional()
  @IsIn([ArticleStatus.PUBLISHED, ArticleStatus.DRAFT, ArticleStatus.DELETED])
  status: ArticleStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}