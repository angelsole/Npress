import { Repository, EntityRepository } from "typeorm";
import { Article } from "./article.entity";
import { User } from "src/auth/user.entity";
import { ArticleStatus } from "./article-status.enum";
import { CreateArticleDto } from "./dto/create-article.dto";
import { GetArticlesFilterDto } from './dto/get-articles-filter.dto';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {

  async getArticles(filterDto: GetArticlesFilterDto): Promise<Article[]> {
    const { search, limit, offset } = filterDto;
    const query = this.createQueryBuilder('article')
    .innerJoin("article.user", "user")
    .addSelect(["user.username", "user.id"])
    .limit(limit)
    .skip(offset)

    query.andWhere('article.status = :status', { status: 'PUBLISHED'});

    if (search) {
     query.andWhere('article.title LIKE :search OR article.description LIKE :search', { search: `%${search}%` });
    }

    const articles = await query.getMany();

    return articles;
  }

  async getOwnUserArticles(filterDto: GetArticlesFilterDto, user: User): Promise<Article[]> {
    const { search, limit, offset } = filterDto;
    const query = this.createQueryBuilder('article')
    .limit(limit)
    .skip(offset);

    query.where('article.userId = :userId', { userId: user.id })

    if (search) {
     query.andWhere('article.title LIKE :search OR article.description LIKE :search', { search: `%${search}%` });
    }

    const articles = await query.getMany();
    return articles;
  }

  async getArticlesByUser(filterDto: GetArticlesFilterDto, paramUserId: string): Promise<Article[]> {
    const { search, limit, offset } = filterDto;
    const query = this.createQueryBuilder('article')
    .limit(limit)
    .skip(offset);

    query.where('article.userId = :userId', { userId: paramUserId })
    query.andWhere('article.status = :status', { status: 'PUBLISHED'});

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
    article.status = ArticleStatus.DRAFT;
    article.user = user;

    await article.save();

    delete article.user;

    return article;
  }
}