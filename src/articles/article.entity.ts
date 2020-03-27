import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { User } from "src/auth/user.entity";
import { ArticleStatus } from "./article-status.enum";

@Entity()
@Unique(['slug', 'userId'])
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  status: ArticleStatus;

  @Column()
  slug: string

  @CreateDateColumn({ type:'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type:'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, user => user.articles, { eager: false })
  user: User;

  @Column({
    select: false
  })
  userId: string;
}