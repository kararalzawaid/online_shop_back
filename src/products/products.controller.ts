import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Body, Post, Get, Query, Param, Put, HttpCode, Delete, UseGuards } from '@nestjs/common';
import { ApiImplicitQueries } from 'nestjs-swagger-api-implicit-queries-decorator';

import { ProductDto } from '@products/dto/product.dto';

import { ProductsService } from '@products/products.service';

import { FiltersListDto } from '@users/dto/filters-list.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create product' })
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

  // @Get('/:id')
  // @ApiOperation({ summary: 'Get user by id' })
  // async getById(@Param('id') id: string): Promise<any> {
  //   return this.usersService.getById(id);
  // };

  // @Put('/:id')
  // @ApiOperation({ summary: 'Update user by id' })
  // async update(@Param('id') id: string, @Body() userDto: UserDto): Promise<any> {
  //   return this.usersService.update(id, userDto);
  // };

  // @Delete('/:id')
  // @ApiOperation({ summary: 'Delete user by id' })
  // async delete(@Param('id') id: string): Promise<void> {
  //   return this.usersService.delete(id);
  // };
}
