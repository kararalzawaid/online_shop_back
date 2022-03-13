import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { LikedItemsDto } from '@users/dto/liked-items.dto';

import { User, UserDocument } from '@users/schemas/users.schema';
import { LikedItems } from '@users/schemas/liked-items.schema';

@Injectable()
export class LikedItemsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  async create(id: string, likedItemsDto: LikedItemsDto): Promise<LikedItems> {
    const user = await this.userModel.findById(id);

    user.likedItems.push(likedItemsDto);

    return this.userModel.findByIdAndUpdate(id, user);
  };

  async getByUserId(id: string): Promise<LikedItems[]> {
    const user = await this.userModel.findById(id);

    return user.likedItems;
  };

  async delete(id: string, likedItemId: string): Promise<void> {
    const user = await this.userModel.findById(id);
    const index = user.likedItems.findIndex((element: LikedItems) => element._id.toString() === likedItemId);

    if (index > -1) {
      user.likedItems.splice(index, 1);
    }

    await this.userModel.findByIdAndUpdate(id, user);
  }

  async update(id: string, likedItemId: string, likedItemsDto: LikedItemsDto): Promise<LikedItems> {
    const user = await this.userModel.findById(id);

    const likedItem = user.likedItems.findIndex((element: LikedItems) => element._id.toString() === likedItemId);

    Object.assign(user.likedItems[likedItem], likedItemsDto);

    return this.userModel.findByIdAndUpdate(id, user);
  }
}
