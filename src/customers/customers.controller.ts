import { Observable } from 'rxjs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Controller, Body, Post, Get, Query, Param, Put, HttpCode, Delete, UseGuards } from '@nestjs/common';
import { ApiImplicitQueries } from 'nestjs-swagger-api-implicit-queries-decorator';

import { CustomersService } from '@customers/customers.service';

import { CustomerDto } from '@customers/dto/customer.dto';
import { FiltersListDto } from './dto/filters-list.dto';
import { LoginUserDto } from '@common/dto/login.dto';

import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

@ApiTags('customers')
@Controller('customers')
@ApiBearerAuth()
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService
  ) { }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto): Promise<Observable<any>> {
    return await this.customersService.login(loginUserDto)
  }

  @Post()
  @ApiOperation({ summary: 'Create customer' })
  async create(@Body() customerDto: CustomerDto): Promise<any> {
    console.log(customerDto);
    return await this.customersService.create(customerDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all customers' })
  @ApiImplicitQueries([
    { name: 'search', description: 'Search by key or value', required: false, type: 'string' },
    { name: 'isPaginated', description: 'If no then it will return all insurances', required: false, type: 'boolean' },
    { name: 'page', description: 'Current page', required: false },
    { name: 'limit', description: 'Number of items per page', required: false },
    { name: 'sort', description: 'Sort items', required: false },
    { name: 'sortOrder', description: 'Sort items by order ASC or DESC', required: false },
  ])
  async getAll(@Query() filtersDto: FiltersListDto): Promise<any> {
    return this.customersService.getList(filtersDto);
  };

  @Get('/:id')
  @ApiOperation({ summary: 'Get customer by id' })
  async getById(@Param('id') id: string): Promise<any> {
    return this.customersService.getById(id);
  };

  @Put('/:id')
  @ApiOperation({ summary: 'Update customer by id' })
  async update(@Param('id') id: string, @Body() customerDto: CustomerDto): Promise<any> {
    return this.customersService.update(id, customerDto);
  };

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete customer by id' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.customersService.delete(id);
  };
}
