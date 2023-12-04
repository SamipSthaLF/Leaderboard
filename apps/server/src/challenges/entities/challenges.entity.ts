import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { visibilityOptions } from '../dto/challenges.dto';

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description?: string;

  @Column()
  points: number;

  @Column()
  privacy: visibilityOptions;

  @Column()
  author_id: number;

  @Column()
  created_at?: string;

  @BeforeInsert()
  insertCreatedAt() {
    this.created_at = new Date().toString();
  }
}
