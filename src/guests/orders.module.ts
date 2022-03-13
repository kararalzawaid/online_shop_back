import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrdersService } from '@guests/order.service';

import { OrdersController } from '@guests/orders.controller';

import { Order, OrderSchema } from '@guests/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule { }