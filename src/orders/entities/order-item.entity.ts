import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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
