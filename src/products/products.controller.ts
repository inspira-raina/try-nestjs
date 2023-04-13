import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ResponseService } from 'src/response/response.service';
import { ResponseSuccessSingleInterface } from 'src/response/response.interface';

@Controller('api/v1/products')
export class ProductsController {
  constructor(
    private readonly responseService: ResponseService,
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  async create(
    @Body() createProductDTO: CreateProductDTO,
  ): Promise<ResponseSuccessSingleInterface> {
    const result = await this.productsService.create(createProductDTO);
    return this.responseService.success(result);
  }

  @Get()
  async findAll(): Promise<any> {
    const products = await this.productsService.findAll();
    return this.responseService.successCollection(products);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<ResponseSuccessSingleInterface> {
    const result = await this.productsService.findOne(id);
    return this.responseService.success(result);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDTO: UpdateProductDTO,
  ): Promise<ResponseSuccessSingleInterface> {
    const result = await this.productsService.update(id, updateProductDTO);
    return this.responseService.success(result);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
  ): Promise<ResponseSuccessSingleInterface> {
    const deleteProduct = await this.productsService.remove(id);
    return this.responseService.success(deleteProduct);
  }
}
