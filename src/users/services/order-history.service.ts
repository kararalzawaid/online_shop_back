import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { OrderHistoryDto } from '@users/dto/order-history.dto';

import { User, UserDocument } from '@users/schemas/users.schema';
import { OrderHistory } from '@users/schemas/order-history.schema';

@Injectable()
export class OrderHistoryService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  async create(id: string, orderHistoryDto: OrderHistoryDto): Promise<OrderHistory> {
    const user = await this.userModel.findById(id);

    user.ordersHistory.push(orderHistoryDto);

    return this.userModel.findByIdAndUpdate(id, user);
  };

  async getByUserId(id: string): Promise<OrderHistory[]> {
    const user = await this.userModel.findById(id);

    return user.ordersHistory;
  };

  async delete(id: string, orderHistoryId: string): Promise<void> {
    const user = await this.userModel.findById(id);
    const index = user.ordersHistory.findIndex((element: OrderHistory) => element._id.toString() === orderHistoryId);

    if (index > -1) {
      user.ordersHistory.splice(index, 1);
    }

    await this.userModel.findByIdAndUpdate(id, user);
  }

  async update(id: string, orderHistoryId: string, orderHistoryDto: OrderHistoryDto): Promise<OrderHistory> {
    const user = await this.userModel.findById(id);

    const orderHistory = user.ordersHistory.findIndex((element: OrderHistory) => element._id.toString() === orderHistoryId);

    Object.assign(user.ordersHistory[orderHistory], orderHistoryDto);

    return this.userModel.findByIdAndUpdate(id, user);
  }
}
