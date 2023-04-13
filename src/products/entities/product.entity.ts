import { OrderItemsEntity } from 'src/orders/entities/order-items.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('float', {
    nullable: false,
    default: 0.0,
  })
  price: number;

  @Column({ nullable: true })
  is_active: boolean;

  @OneToMany(() => OrderItemsEntity, (orderItems) => orderItems.product)
  orderItems: OrderItemsEntity[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date | string;

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: true,
  })
  updated_at: Date | string;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date | string;
}
