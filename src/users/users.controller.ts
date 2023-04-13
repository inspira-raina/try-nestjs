import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { PaginationInterface, ResponseSuccessSingleInterface } from 'src/response/response.interface';
import { ResponseService } from 'src/response/response.service';
import { GetUserDTO } from './dto/get-user.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  async create(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<ResponseSuccessSingleInterface> {
    const result = await this.usersService.create(createUserDTO);
    return this.responseService.success(result);
  }

  @Get()
  async findAll(@Query() getUserDTO: GetUserDTO): Promise<any> {
    const users = await this.usersService.findAll(getUserDTO);
    const pagination: PaginationInterface = {
      page: getUserDTO.page,
      total: users.count,
      size: getUserDTO.size,
    };
    return this.responseService.successCollection(users.list, pagination);
  }

  @Get('orders/:id')
  async findUserOrder(@Param('id') id: number): Promise<any> {
    const users = await this.usersService.getOrderByUser(id);
    return this.responseService.successCollection(users);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<ResponseSuccessSingleInterface> {
    const result = await this.usersService.findOne(id);
    return this.responseService.success(result);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<ResponseSuccessSingleInterface> {
    const result = await this.usersService.update(id, updateUserDTO);
    return this.responseService.success(result);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
  ): Promise<ResponseSuccessSingleInterface> {
    const deleteUser = await this.usersService.remove(id);
    return this.responseService.success(deleteUser);
  }
}
