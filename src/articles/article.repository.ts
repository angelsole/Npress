import { Repository, EntityRepository } from "typeorm";
import { Article } from "./article.entity";
import { User } from "src/auth/user.entity";
import { ArticleStatus } from "./article-status.enum";
import { CreateArticleDto } from "./dto/create-article.dto";
import { GetArticlesFilterDto } from './dto/get-articles-filter.dto';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {

  async getArticles(filterDto: GetArticlesFilterDto): Promise<Article[]> {
    const { search, status, limit, offset } = filterDto;
    const query = this.createQueryBuilder('article')
    .innerJoin("article.user", "user")
    .addSelect(["user.id", "user.username"])
    .limit(limit)
    .skip(offset)
;
    if (status) {
      query.andWhere('article.status = :status', { status });
    }
    if (search) {
     query.andWhere('article.title LIKE :search OR article.description LIKE :search', { search: `%${search}%` });
    }

    const articles = await query.getMany();

    return articles;
  }

  async getArticlesByUser(filterDto: GetArticlesFilterDto, user: User): Promise<Article[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('article');

    query.where('article.userId = :userId', { userId: user.id })

    if (status) {
      query.andWhere('article.status = :status', { status });
    }
    if (search) {
     query.andWhere('article.title LIKE :search OR article.description LIKE :search', { search: `%${search}%` });
    }

    const articles = await query.getMany();
    return articles;
  }

  async createArticle(createTaskDto: CreateArticleDto, user: User): Promise<Article> {
    const { title, body } = createTaskDto;
    const article = new Article;
    article.title = title;
    article.body = body;
    article.status = ArticleStatus.PUBLISHED;
    article.user = user;

    await article.save();

    delete article.user;

    return article;
  }
}