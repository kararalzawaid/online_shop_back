import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Body, Post, Get, Query, Param, Put, HttpCode, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { ApiImplicitQueries } from 'nestjs-swagger-api-implicit-queries-decorator';

import { GuestOrderDto } from '@guests/order.dto';

import { OrdersService } from '@guests/order.service';

import { AdminGuard } from '@auth/guards/admin.guard';

import { Order } from '@guests/order.schema';

import { FiltersListDto } from '@common/dto/filters-list.dto';

@ApiTags('guests')
@Controller('orders')
@ApiBearerAuth()
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService
  ) { }

  @Post('guests')
  @ApiOperation({ summary: 'Create order' })
  async create(@Body() guestOrderDto: GuestOrderDto): Promise<Order> {
    return await this.ordersService.create(guestOrderDto);
  }

  @Get('guests/orders')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get all users commands' })
  @ApiImplicitQueries([
    { name: 'search', description: 'Search by key or value', required: false, type: 'string' },
    { name: 'isPaginated', description: 'If no then it will return all insurances', required: false, type: 'boolean' },
    { name: 'page', description: 'Current page', required: false },
    { name: 'limit', description: 'Number of items per page', required: false },
    { name: 'sort', description: 'Sort items', required: false },
    { name: 'sortOrder', description: 'Sort items by order ASC or DESC', required: false }
  ])
  async getAllOrders(@Query() filtersDto: FiltersListDto): Promise<any> {
    return this.ordersService.getAllOrders(filtersDto);
  };

  @Put('guests/orders/:id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update order by id' })
  async update(@Param('id') id: string, @Body() guestOrderDto: GuestOrderDto): Promise<Order> {
    return this.ordersService.update(id, guestOrderDto);
  }
}
