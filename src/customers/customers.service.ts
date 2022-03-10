import bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UnauthorizedException, Injectable, NotFoundException } from '@nestjs/common';

import { AuthService } from '@auth/services/auth/auth.service';

import { LoginUserDto } from '@common/dto/login.dto';
import { CustomerDto } from '@customers/dto/customer.dto';
import { FiltersListDto } from '@customers/dto/filters-list.dto';

import { getStartIndex, getLimitIndex } from '@common/helpers/pagination';

import { SORT_DESC, SORT_ASC } from '@common/constants/sorting.constants';

import { Customer, CustomerDocument } from '@customers/schemas/customers.schema';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    private authService: AuthService
  ) { }

  async create(customerDto: CustomerDto): Promise<any> {
    const user = await this.customerModel.findOne({ email: customerDto.email });

    if (user) {
      throw new Error('User already exist!.');
    }

    customerDto.password = await bcrypt.hash(customerDto.password, 12);

    return new this.customerModel(customerDto).save();
  };

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.customerModel.findOne({ email: loginUserDto.email });

    if (!user) {
      throw new NotFoundException('Invalid credentials!.');
    }

    const isValid = await this.authService.comparePasswords(loginUserDto.password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Login was not Successfully!.');
    }

    return this.authService.generateJwt(user);
  };

  async getList(filtersListDto: FiltersListDto): Promise<any> {
    const sortOptions = {};
    const {
      sort,
      sortOrder,
      isPaginated = true,
      page = 1,
      limit = 10
    } = filtersListDto;

    const conditions = this.getFilterListConditions(filtersListDto);
    const offset = getStartIndex(page, limit);
    const itemsLimit = getLimitIndex(limit);

    if (sort) {
      sortOptions[sort] = sortOrder.toLowerCase() === 'desc' ? SORT_DESC : SORT_ASC;
    }

    const total = await this.customerModel.count(conditions);

    const customers = isPaginated
      ? await this.customerModel
        .find(conditions)
        .skip(offset)
        .limit(itemsLimit)
        .sort(sortOptions)
        .exec()
      : await this.customerModel
        .find(conditions)
        .sort(sortOptions)
        .exec();

    return { items: customers, total };
  }

  private getFilterListConditions(filtersListDto: FiltersListDto) {
    let conditions = {};
    const { search } = filtersListDto;

    if (search) {
      const regexp = new RegExp(search, 'i');

      conditions = {
        $or: [
          { firstName: { $regex: regexp } },
          { lastName: { $regex: regexp } },
          { email: { $regex: regexp } },
          { phoneNumber: { $regex: regexp } }
        ]
      };
    }

    return conditions;
  }

  async getById(id: string): Promise<any> {
    return this.customerModel.findById(id);
  };

  async update(id: string, customerDto: CustomerDto): Promise<any> {
    return this.customerModel.findByIdAndUpdate(id, customerDto);
  };

  async delete(id: string): Promise<void> {
    await this.customerModel.remove({ _id: id });
  };
}
