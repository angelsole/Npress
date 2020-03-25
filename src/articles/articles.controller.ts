import { Controller, Get, Post, Body, Param, Patch, Query, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetArticlesFilterDto } from './dto/get-articles-filter.dto';
import { ArticleStatusValidationPipe } from './pipes/article-status-validation.pipes';
import { Article } from './article.entity';
import { ArticleStatus } from './article-status.enum';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  getArticles(
    @Query(ValidationPipe) filterDto: GetArticlesFilterDto,
  ) {
    return this.articlesService.getArticles(filterDto);
  }
  @Get()
  @UseGuards(AuthGuard())
  getArticlesByUser(
    @Query(ValidationPipe) filterDto: GetArticlesFilterDto,
    @GetUser() user: User
  ) {
    return this.articlesService.getArticlesByUser(filterDto, user);
  }

  @Get('/:id')
  getArticleById(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<Article> {
    return this.articlesService.getArticleById(id, user);
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @GetUser() user: User
  ): Promise<Article> {
    return this.articlesService.createArticle(createArticleDto, user);
  }

  @Patch('/:id/status')
  @UseGuards(AuthGuard())
  updateArticleStatus(
    @Param('id') id: string,
    @Body('status', ArticleStatusValidationPipe) status: ArticleStatus,
    @GetUser() user: User
  ) : Promise<Article> {
    return this.articlesService.updateArticleStatus(id, status, user);
  }

}
