import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ResponseService } from 'src/response/response.service';
import { MessageService } from 'src/message/message.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly responseService: ResponseService,
    private readonly messageService: MessageService,
  ) {}

  async create(body: CreateOrderDTO): Promise<OrderEntity> {
    try {
      const paramOrder: Partial<OrderEntity> = { ...body };
      const product = await this.orderRepository.save(paramOrder);
      return product;
    } catch (error) {
      Logger.error(error.message, '', this.constructor.name);
      this.responseService.throwError(error);
    }
  }

  async findAll(): Promise<any> {
    const orderData = await this.orderRepository.find({
      relations: {
        user: true,
      },
    });
    return orderData;
  }

  async getOrderById(id: number): Promise<any> {
    try {
      const orderDetail = this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.user', 'user')
        .where('order.id = :orderId', { orderId: id })
        .getOne();

      if (!orderDetail) {
        throw new BadRequestException(
          this.responseService.error(
            HttpStatus.BAD_REQUEST,
            [this.messageService.getErrorMessage('id', 'order.id.not_found')],
            'Bad Request',
          ),
        );
      }
      return orderDetail;
    } catch (error) {
      Logger.error(error.message, '', this.constructor.name);
      this.responseService.throwError(error);
    }
  }

  async update(id: number, body: UpdateOrderDTO): Promise<OrderEntity> {
    try {
      const order = await this.orderRepository.findOne({ where: { id: id } });
      const orderUpdated = await this.orderRepository.save({
        ...order,
        ...body,
      });
      return orderUpdated;
    } catch (error) {
      Logger.error(error.message, '', this.constructor.name);
      this.responseService.throwError(error);
    }
  }
}
