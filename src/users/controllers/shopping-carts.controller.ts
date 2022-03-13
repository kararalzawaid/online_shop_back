import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Body, Post, Get, Query, Param, Put, HttpCode, Delete, UseGuards, SetMetadata } from '@nestjs/common';

import { ShoppingCartsService } from '@users/services/shopping-carts.service';

import { ShoppingCartDto } from '@users/dto/shopping-cart.dto';

import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

import { ShoppingCart } from '@users/schemas/shopping-cart.schema';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class ShoppingCartsController {
  constructor(
    private readonly shoppingCartsService: ShoppingCartsService
  ) { }

  @Post('/:id/shopping-cart')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create shopping cart' })
  async create(@Param('id') id: string, @Body() shoppingCartDto: ShoppingCartDto): Promise<ShoppingCart> {
    return await this.shoppingCartsService.create(id, shoppingCartDto);
  }

  @Get('/:id/shopping-cart')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get cart by id' })
  async get(@Param('id') id: string): Promise<ShoppingCart[]> {
    return this.shoppingCartsService.getByUserId(id);
  }

  @Delete('/:id/shopping-cart/:cartId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete cart by id' })
  async delete(@Param('id') id: string, @Param('cartId') cartId: string): Promise<void> {
    this.shoppingCartsService.delete(id, cartId);
  }

  @Put('/:id/shopping-cart/:cartId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update cart by id' })
  async update(@Param('id') id: string, @Param('cartId') cartId: string, @Body() shoppingCartDto: ShoppingCartDto): Promise<ShoppingCart> {
    return this.shoppingCartsService.update(id, cartId, shoppingCartDto);
  }
}
