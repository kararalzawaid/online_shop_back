import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Body, Post, Get, Query, Param, Put, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiImplicitQueries } from 'nestjs-swagger-api-implicit-queries-decorator';

import { ProductDto } from '@products/dto/product.dto';

import { ProductsService } from '@products/services/products.service';

import { FiltersListDto } from '@common/dto/filters-list.dto';

import { Product } from '@products/schema/products.schema';

import { AdminGuard } from '@auth/guards/admin.guard';
import { FilesInterceptor } from '@nestjs/platform-express';

import { FilesToBodyInterceptor } from '@products/interceptors/files';

@ApiTags('products')
@Controller('products')
@ApiBearerAuth()
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) { }

  @Post()
  @UseGuards(AdminGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'), FilesToBodyInterceptor)
  async create(@Body() productDto: ProductDto): Promise<any> {
    return await this.productsService.create(productDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiImplicitQueries([
    { name: 'search', description: 'Search by key or value', required: false, type: 'string' },
    { name: 'isPaginated', description: 'If no then it will return all insurances', required: false, type: 'boolean' },
    { name: 'page', description: 'Current page', required: false },
    { name: 'limit', description: 'Number of items per page', required: false },
    { name: 'sort', description: 'Sort items', required: false },
    { name: 'sortOrder', description: 'Sort items by order ASC or DESC', required: false }
  ])
  async getAll(@Query() filtersDto: FiltersListDto): Promise<any> {
    return this.productsService.getList(filtersDto);
  };

  @Get('/:id')
  @ApiOperation({ summary: 'Get product by id' })
  async getById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getById(id);
  };

  @Put('/:id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update product by id' })
  async update(@Param('id') id: string, @Body() productDto: ProductDto): Promise<Product> {
    return this.productsService.update(id, productDto);
  };

  @Delete('/:id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete product by id' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.productsService.delete(id);
  };
}
