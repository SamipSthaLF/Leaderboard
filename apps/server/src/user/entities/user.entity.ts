import { RoleEnum } from '@/common/constants/role.enum';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinTable,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @CreateDateColumn()
  createdOn: string;

  @Column('enum', { enum: RoleEnum, array: true, default: [RoleEnum.User] })
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  roles: RoleEnum[];
}
