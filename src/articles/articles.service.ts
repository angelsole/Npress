import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetArticlesFilterDto } from './dto/get-Articles-filter.dto';
import { ArticleRepository } from './article.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { User } from 'src/auth/user.entity';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleRepository)
    private articleRepository: ArticleRepository,
  ) {}

  async getArticles(filterDto: GetArticlesFilterDto): Promise<Article[]> {
    return this.articleRepository.getArticles(filterDto);
  }
  async getArticlesByUser(filterDto: GetArticlesFilterDto, userId: string): Promise<Article[]> {
    if (!userId || !userId.length) {
      throw new BadRequestException(`User id is required`)
    }
    return this.articleRepository.getArticlesByUser(filterDto, userId);
  }

  async getArticleById(id: string, user: User): Promise<Article> {
    const articleFound = await this.articleRepository.findOne({ where: { id, userId: user.id } });
    if (!articleFound) {
      throw new NotFoundException(`Article with id ${id} not found`)
    }
    return articleFound;
  }

  async createArticle(createArticleDto: CreateArticleDto, user: User): Promise<Article> {
    return this.articleRepository.createArticle(createArticleDto, user);
  }

  async getOwnUserArticles(filterDto: GetArticlesFilterDto, user: User): Promise<Article[]> {
    return this.articleRepository.getOwnUserArticles(filterDto, user);
  }

  async updateArticle(
    id: string,
    newArticle: UpdateArticleDto,
    user: User
  ): Promise<Article> {
    if (!Object.entries(newArticle).length) {
      throw new BadRequestException(`Any value of article is required`)
    }
    const currentArticle = await this.getArticleById(id, user);
    return this.articleRepository.updateArticle(currentArticle, newArticle);
  }
}
