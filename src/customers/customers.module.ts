import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersController } from '@customers/customers.controller';

import { CustomersService } from '@customers/customers.service';

import { Customer, CustomerSchema } from './schemas/customers.schema';

import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    AuthModule
  ],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule { }
