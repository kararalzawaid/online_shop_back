import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { ShoppingCartDto } from '@users/dto/shopping-cart.dto';

import { User, UserDocument } from 'src/users/schemas/users.schema';
import { ShoppingCart } from '@users/schemas/shopping-cart.schema';

@Injectable()
export class ShoppingCartsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  async create(id: string, shoppingCartDto: ShoppingCartDto): Promise<ShoppingCart> {
    const user = await this.userModel.findById(id);

    user.shoppingCart.push(shoppingCartDto);

    return this.userModel.findByIdAndUpdate(id, user);
  };

  async getByUserId(id: string): Promise<ShoppingCart[]> {
    const user = await this.userModel.findById(id);

    return user.shoppingCart;
  };

  async delete(id: string, cartId: string): Promise<void> {
    const user = await this.userModel.findById(id);
    const index = user.shoppingCart.findIndex((element: ShoppingCart) => element._id.toString() === cartId);

    if (index > -1) {
      user.shoppingCart.splice(index, 1);
    }

    await this.userModel.findByIdAndUpdate(id, user);
  }

  async update(id: string, cartId: string, shoppingCartDto: ShoppingCartDto): Promise<ShoppingCart> {
    const user = await this.userModel.findById(id);

    const cart = user.shoppingCart.findIndex((element: ShoppingCart) => element._id.toString() === cartId);

    Object.assign(user.shoppingCart[cart], shoppingCartDto);

    return this.userModel.findByIdAndUpdate(id, user);
  }
}
