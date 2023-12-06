import {
  Column,
  Entity,
  JoinTable,
  BaseEntity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Role } from '@/roles/entities/role.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ default: 'lftech@gmail.com' })
  @Column()
  username: string;

  @ApiPropertyOptional({ default: '2023-09-13' })
  @Column()
  createdOn: string;

  @ApiPropertyOptional({ default: '2023-09-14' })
  @Column()
  lastLoginTime: string;

  @ManyToMany(() => Role, (role) => role.users, { cascade: true })
  @JoinTable()
  roles: Role[];
}
