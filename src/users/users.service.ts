import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseService } from 'src/response/response.service';
import { MessageService } from 'src/message/message.service';
import { GetUserDTO } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repositoryUser: Repository<UserEntity>,
    private readonly responseService: ResponseService,
    private readonly messageService: MessageService,
  ) {}

  async create(body: CreateUserDTO): Promise<UserEntity> {
    try {
      const userParam: Partial<UserEntity> = { ...body };
      const user = await this.repositoryUser.save(userParam);
      return user;
    } catch (error) {
      Logger.error(error.message, '', this.constructor.name);
      this.responseService.throwError(error);
    }
  }

  async findAll(
    getUserDTO: GetUserDTO,
  ): Promise<{ list: UserEntity[]; count: number }> {
    try {
      const query = this.repositoryUser.createQueryBuilder('user');
      query.where('deleted_at = null');
      if (getUserDTO.search !== undefined) {
        query.where('( user.name ilike :search OR user.email ilike :search )', {
          search: `%${getUserDTO.search}%`,
        });
      }
      if (getUserDTO.is_active !== undefined) {
        query.andWhere(' user.is_active = :is_active ', {
          is_active: getUserDTO.is_active,
        });
      }
      if (getUserDTO.order && getUserDTO.sort) {
        query.orderBy(getUserDTO.sort, getUserDTO.order);
      } else {
        query.orderBy('created_at', 'DESC');
      }
      query.take(getUserDTO.size);
      query.skip(getUserDTO.page * getUserDTO.size);

      const result = await query.getManyAndCount();
      const userListCount = {
        list: result[0],
        count: result[1],
      };
      return userListCount;
    } catch (error) {
      Logger.error(error.message, '', this.constructor.name);
      this.responseService.throwError(error);
    }
  }

  async findOne(id: number): Promise<UserEntity> {
    try {
      const user = this.repositoryUser.findOneBy({
        id: id,
        is_active: true,
        deleted_at: null,
      });

      if (!user) {
        throw new BadRequestException(
          this.responseService.error(
            HttpStatus.BAD_REQUEST,
            [this.messageService.getErrorMessage('id', 'user.id.not_found')],
            'Bad Request',
          ),
        );
      }
      return user;
    } catch (error) {
      Logger.error(error.message, '', this.constructor.name);
      this.responseService.throwError(error);
    }
  }

  async getOrderByUser(id: number): Promise<any> {
    try {
      const userOrders = this.repositoryUser
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.orders', 'order')
        .where('user.id = :userId', { userId: id })
        .getMany();

      if (!userOrders) {
        throw new BadRequestException(
          this.responseService.error(
            HttpStatus.BAD_REQUEST,
            [this.messageService.getErrorMessage('id', 'order.id.not_found')],
            'Bad Request',
          ),
        );
      }
      return userOrders;
    } catch (error) {
      Logger.error(error.message, '', this.constructor.name);
      this.responseService.throwError(error);
    }
  }

  async update(id: number, body: UpdateUserDTO): Promise<UserEntity> {
    try {
      const user = await this.findOne(id);
      const updateUser = await this.repositoryUser.save({ ...user, ...body });
      return updateUser;
    } catch (error) {
      Logger.error(error.message, '', this.constructor.name);
      this.responseService.throwError(error);
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const user = await this.repositoryUser.findOneBy({ id: id });
      user.deleted_at = new Date(Date.now());
      const deleteUser = await this.repositoryUser.save(user);
      return deleteUser;
    } catch (error) {
      Logger.error(error.message, '', this.constructor.name);
      this.responseService.throwError(error);
    }
  }
}
