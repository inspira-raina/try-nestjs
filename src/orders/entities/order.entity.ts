import user from 'src/message/languages/en/user';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EnumOrderStatus {
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
}

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_number: string;

  @Column({
    type: 'enum',
    enum: EnumOrderStatus,
    default: EnumOrderStatus.PENDING,
  })
  status: EnumOrderStatus;

  @Column({ type: 'number', nullable: true })
  user_id: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: true,
  })
  updated_at: Date;
}
