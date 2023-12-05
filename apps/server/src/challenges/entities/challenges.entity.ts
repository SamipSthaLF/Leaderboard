import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  BeforeUpdate,
} from 'typeorm';
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

  @CreateDateColumn()
  created_at?: Date;

  @BeforeInsert()
  insertCreatedAt() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @CreateDateColumn()
  updated_at?: Date;

  @BeforeUpdate()
  insertUpdatedAt() {
    this.updated_at = new Date();
  }
}
