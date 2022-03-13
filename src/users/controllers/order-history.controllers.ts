import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Body, Post, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';

import { OrderHistoryService } from '@users/services/order-history.service';

import { OrderHistoryDto } from '@users/dto/order-history.dto';

import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

import { OrderHistory } from '@users/schemas/order-history.schema';

@ApiTags('users-orders-history')
@Controller('users')
@ApiBearerAuth()
export class OrderHistoryController {
  constructor(
    private readonly orderHistoryService: OrderHistoryService
  ) { }

  @Post('/:id/orders-history')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create order history' })
  async create(@Param('id') id: string, @Body() orderHistoryDto: OrderHistoryDto): Promise<OrderHistory> {
    return await this.orderHistoryService.create(id, orderHistoryDto);
  }

  @Get('/:id/orders-history')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get order history by id' })
  async get(@Param('id') id: string): Promise<OrderHistory[]> {
    return this.orderHistoryService.getByUserId(id);
  }

  @Delete('/:id/orders-history/:orderHistoryId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete order history by id' })
  async delete(@Param('id') id: string, @Param('orderHistoryId') orderHistoryId: string): Promise<void> {
    this.orderHistoryService.delete(id, orderHistoryId);
  }

  @Put('/:id/orders-history/:orderHistoryId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update order history by id' })
  async update(@Param('id') id: string, @Param('orderHistoryId') orderHistoryId: string, @Body() orderHistoryDto: OrderHistoryDto): Promise<OrderHistory> {
    return this.orderHistoryService.update(id, orderHistoryId, orderHistoryDto);
  }
}
