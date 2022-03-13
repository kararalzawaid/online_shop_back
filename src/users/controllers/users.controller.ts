import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Body, Post, Get, Query, Param, Put, HttpCode, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { ApiImplicitQueries } from 'nestjs-swagger-api-implicit-queries-decorator';

import { UsersService } from '@users/services/users.service';

import { UserDto } from '@users/dto/user.dto';
import { FiltersListDto } from '@common/dto/filters-list.dto';
import { LoginUserDto } from '@common/dto/login.dto';

import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { AdminGuard } from '@auth/guards/admin.guard';

import { User } from '@users/schemas/users.schema';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return await this.usersService.login(loginUserDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async create(@Body() userDto: UserDto): Promise<User> {
    return await this.usersService.create(userDto);
  }

  @Get()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiImplicitQueries([
    { name: 'search', description: 'Search by key or value', required: false, type: 'string' },
    { name: 'isPaginated', description: 'If no then it will return all insurances', required: false, type: 'boolean' },
    { name: 'page', description: 'Current page', required: false },
    { name: 'limit', description: 'Number of items per page', required: false },
    { name: 'sort', description: 'Sort items', required: false },
    { name: 'sortOrder', description: 'Sort items by order ASC or DESC', required: false }
  ])
  async getAll(@Query() filtersDto: FiltersListDto): Promise<any> {
    return this.usersService.getList(filtersDto);
  };

  @Get('/order-history')
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
    return this.usersService.getAllOrders(filtersDto);
  };

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by id' })
  async getById(@Param('id') id: string): Promise<User> {
    return this.usersService.getById(id);
  };

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user by id' })
  async update(@Param('id') id: string, @Body() userDto: UserDto): Promise<User> {
    return this.usersService.update(id, userDto);
  };

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user by id' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(id);
  };
}
