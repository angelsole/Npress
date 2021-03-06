import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany
} from "typeorm";
import * as bcrypt from 'bcrypt';
import { Article } from '../articles/article.entity';

@Entity()
@Unique(['username', 'id'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Article, article => article.user, { eager: true })
  articles: Article[]

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

}