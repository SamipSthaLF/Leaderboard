import { RoleEnum } from '@/common/constants/role.enum';

import {
  Column,
  Entity,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ default: 'user@mail.com' })
  @Column()
  username: string;

  @CreateDateColumn()
  createdOn: string;

  @ApiProperty({ default: ['User'] })
  @Column({
    type: 'enum',
    enum: RoleEnum,
    array: true,
    default: [RoleEnum.USER],
  })
  roles: RoleEnum[];

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}
