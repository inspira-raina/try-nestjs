import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
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
