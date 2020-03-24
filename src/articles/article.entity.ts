import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/auth/user.entity";
import { ArticleStatus } from "./article-status.enum";

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  status: ArticleStatus;

  @ManyToOne(type => User, user => user.articles, { eager: false })
  user: User;

  @Column()
  userId: string;
}