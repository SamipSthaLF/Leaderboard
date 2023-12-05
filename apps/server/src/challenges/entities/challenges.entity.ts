import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  Entity,
  BeforeUpdate,
  BeforeInsert,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { visibilityOptions } from '../dto/challenges.dto';

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ default: 'KPI' })
  @Column()
  title: string;

  @ApiPropertyOptional({ default: 'User needs to fill' })
  @Column()
  description?: string;

  @ApiProperty({ default: 1 })
  @Column()
  points: number;

  @ApiProperty({ default: 'public' })
  @Column()
  privacy: visibilityOptions;

  @ApiProperty({ default: 1 })
  @Column()
  author_id: number;

  @CreateDateColumn()
  @ApiPropertyOptional({ default: '2023-09-12' })
  created_at?: Date;

  @BeforeInsert()
  insertCreatedAt() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @CreateDateColumn()
  @ApiPropertyOptional({ default: '2023-09-13' })
  updated_at?: Date;

  @BeforeUpdate()
  insertUpdatedAt() {
    this.updated_at = new Date();
  }
}
