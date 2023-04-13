import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ResponseService } from 'src/response/response.service';
import { MessageService } from 'src/message/message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderItemsEntity } from './entities/order-items.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItemsEntity, OrderEntity, UserEntity]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, ResponseService, MessageService],
  exports: [OrdersService],
})
export class OrdersModule {}
