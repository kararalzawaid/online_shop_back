import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from '@users/controllers/users.controller';
import { LikedItemsController } from '@users/controllers/liked-items.controller';
import { OrderHistoryController } from '@users/controllers/order-history.controllers';
import { ShoppingCartsController } from '@users/controllers/shopping-carts.controller';

import { UsersService } from '@users/services/users.service';
import { OrderHistoryService } from './services/order-history.service';
import { LikedItemsService } from '@users/services/liked-items.service';
import { ShoppingCartsService } from '@users/services/shopping-carts.service';

import { User, UserSchema } from '@users/schemas/users.schema';

import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [
    UsersController,
    LikedItemsController,
    OrderHistoryController,
    ShoppingCartsController
  ],
  providers: [
    UsersService,
    LikedItemsService,
    OrderHistoryService,
    ShoppingCartsService
  ]
})
export class UsersModule { }
