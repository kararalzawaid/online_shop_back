import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { GuestOrderDto } from '@guests/order.dto';

import { Order, OrderDocument } from '@guests/order.schema';

import { FiltersListDto } from '@common/dto/filters-list.dto';

import { getStartIndex, getLimitIndex } from '@common/helpers/pagination';

import { SORT_DESC, SORT_ASC } from '@common/constants/sorting.constants';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>
  ) { }

  async create(guestOrderDto: GuestOrderDto): Promise<Order> {
    return new this.orderModel(guestOrderDto).save();
  };

  async getAllOrders(filtersListDto: FiltersListDto): Promise<any> {
    const sortOptions = {};
    const {
      sort,
      sortOrder,
      isPaginated = true,
      page = 1,
      limit = 10
    } = filtersListDto;

    const offset = getStartIndex(page, limit);
    const itemsLimit = getLimitIndex(limit);

    if (sort) {
      sortOptions[sort] = sortOrder.toLowerCase() === 'desc' ? SORT_DESC : SORT_ASC;
    }

    const total = await this.orderModel.find({ 'status': 0 }).count();

    const users = isPaginated
      ? await this.orderModel
        .find({ 'status': 0 })
        .skip(offset)
        .limit(itemsLimit)
        .sort(sortOptions)
        .exec()
      : await this.orderModel
        .find({ 'status': 0 })
        .sort(sortOptions)
        .exec();

    return { items: users, total };
  }

  async update(id: string, guestOrderDto: GuestOrderDto): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(id, guestOrderDto);
  };
}
