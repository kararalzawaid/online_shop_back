import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Body, Post, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';

import { LikedItemsService } from '@users/services/liked-items.service';

import { LikedItemsDto } from '@users/dto/liked-items.dto';

import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

import { LikedItems } from '@users/schemas/liked-items.schema';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class LikedItemsController {
  constructor(
    private readonly LikedItemsService: LikedItemsService
  ) { }

  @Post('/:id/liked-items')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create liked items' })
  async create(@Param('id') id: string, @Body() likedItemsDto: LikedItemsDto): Promise<LikedItems> {
    return await this.LikedItemsService.create(id, likedItemsDto);
  }

  @Get('/:id/liked-items')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get liked item by id' })
  async get(@Param('id') id: string): Promise<LikedItems[]> {
    return this.LikedItemsService.getByUserId(id);
  }

  @Delete('/:id/liked-items/:likedItemId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete liked item by id' })
  async delete(@Param('id') id: string, @Param('likedItemId') likedItemId: string): Promise<void> {
    this.LikedItemsService.delete(id, likedItemId);
  }

  @Put('/:id/liked-items/:likedItemId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update liked item by id' })
  async update(@Param('id') id: string, @Param('likedItemId') likedItemId: string, @Body() likedItemsDto: LikedItemsDto): Promise<LikedItems> {
    return this.LikedItemsService.update(id, likedItemId, likedItemsDto);
  }
}
