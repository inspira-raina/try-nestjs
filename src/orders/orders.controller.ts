import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ResponseService } from 'src/response/response.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { ResponseSuccessSingleInterface } from 'src/response/response.interface';
import { OrderEntity } from './entities/order.entity';
import { UpdateOrderDTO } from './dto/update-order.dto';

@Controller('api/v1/orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDTO,
  ): Promise<ResponseSuccessSingleInterface> {
    const result = await this.ordersService.create(createOrderDto);
    return this.responseService.success(result);
  }

  @Get()
  async findAll(): Promise<any> {
    const orders = await this.ordersService.findAll();
    return this.responseService.successCollection(orders);
  }

  @Get(':id')
  async getOrderById(
    @Param('id') id: number,
  ): Promise<ResponseSuccessSingleInterface> {
    const result = await this.ordersService.getOrderById(id);
    return this.responseService.success(result);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderDTO: UpdateOrderDTO,
  ): Promise<ResponseSuccessSingleInterface> {
    const result = await this.ordersService.update(id, updateOrderDTO);
    return this.responseService.success(result);
  }
}
