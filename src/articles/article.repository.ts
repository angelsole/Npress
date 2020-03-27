import { Repository, EntityRepository, TransactionManager } from "typeorm";
import { Article } from "./article.entity";
import { User } from "src/auth/user.entity";
import { ArticleStatus } from "./article-status.enum";
import { CreateArticleDto } from "./dto/create-article.dto";
import { GetArticlesFilterDto } from './dto/get-articles-filter.dto';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { UpdateArticleDto } from "./dto/update-article.dto";

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
    const { title, body, slug } = createTaskDto;

    const formatString = (stringToParse) =>  {
      return stringToParse
      .replace(/[^\w\s]/gi, ' ')
      .replace(/\s+/g, '-')
    }

    const formatedTitle = title.trim();
    const formatedSlug = slug && formatString(slug.trim().toLowerCase());

    const article = new Article;
    article.title = formatedTitle;
    article.body = body;
    article.slug = formatedSlug || formatString(formatedTitle);
    article.status = ArticleStatus.DRAFT;
    article.user = user;
    try {
      await article.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Slug already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }

    delete article.user;

    return article;
  }

  async updateArticle(
    article: Article,
    newArticle: UpdateArticleDto,
  ): Promise<Article> {
    article.status = newArticle.status || article.status;
    article.title = newArticle.title || article.title;
    article.body = newArticle.body || article.body;
    article.slug = newArticle.slug || article.slug;
    await article.save();
    return article;
  }
}