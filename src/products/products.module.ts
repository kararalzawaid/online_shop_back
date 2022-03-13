import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

import { ProductsController } from '@products/controllers/products.controller';
import { ProductsService } from '@products/services/products.service';

import { Product, ProductSchema } from '@products/schema/products.schema';

@Module({
  imports: [
    MulterModule.register({
      dest: './files'
    }),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }