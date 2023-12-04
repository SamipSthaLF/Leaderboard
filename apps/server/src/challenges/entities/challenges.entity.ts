import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { visibilityOptions } from '../dto/challenges.dto';

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  challenge_title: string;

  @Column()
  description?: string;

  @Column()
  challenge_score?: number;

  @Column()
  privacy?: visibilityOptions;

  @Column()
  created_at?: string;
}
