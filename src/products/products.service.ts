import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseService } from 'src/response/response.service';
import { MessageService } from 'src/message/message.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly responseService: ResponseService,
    private readonly messageService: MessageService,
  ) {}

  async create(body: CreateProductDTO): Promise<ProductEntity> {
    try {
      const productParam: Partial<ProductEntity> = { ...body };
      const product = await this.productRepository.save(productParam);
      return product;
    } catch (error) {
      Logger.error(error.message, '', this.constructor.name);
      this.responseService.throwError(error);
    }
  }

  async findAll(): Promise<any> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<ProductEntity> {
    try {
      const product = this.productRepository.findOneBy({
        id: id,
        is_active: true,
        deleted_at: null,
      });

      if (!product) {
        throw new BadRequestException(
          this.responseService.error(
            HttpStatus.BAD_REQUEST,
            [this.messageService.getErrorMessage('id', 'product.id.not_found')],
            'Bad Request',
          ),
        );
      }
      return product;
    } catch (error) {
      Logger.error(error.message, '', this.constructor.name);
      this.responseService.throwError(error);
    }
  }

  async update(id: number, body: UpdateProductDTO): Promise<ProductEntity> {
    try {
      const product = await this.findOne(id);
      const updateProduct = await this.productRepository.save({
        ...product,
        ...body,
      });
      return updateProduct;
    } catch (error) {
      Logger.error(error.message, '', this.constructor.name);
      this.responseService.throwError(error);
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const product = await this.productRepository.findOneBy({ id: id });
      product.deleted_at = new Date(Date.now());
      const deleteProduct = await this.productRepository.save(product);
      return deleteProduct;
    } catch (error) {
      Logger.error(error.message, '', this.constructor.name);
      this.responseService.throwError(error);
    }
  }
}
