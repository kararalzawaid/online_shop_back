import bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UnauthorizedException, Injectable, NotFoundException } from '@nestjs/common';

import { AuthService } from '@auth/services/auth/auth.service';

import { LoginUserDto } from '@common/dto/login.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { FiltersListDto } from 'src/users/dto/filters-list.dto';

import { getStartIndex, getLimitIndex } from '@common/helpers/pagination';

import { SORT_DESC, SORT_ASC } from '@common/constants/sorting.constants';

import { User, UserDocument } from 'src/users/schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService
  ) { }

  async create(userDto: UserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: userDto.email });

    if (user) {
      throw new Error('User already exist!.');
    }

    userDto.password = await bcrypt.hash(userDto.password, 12);

    return new this.userModel(userDto).save();
  };

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const user = await this.userModel.findOne({ email: loginUserDto.email });

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

    const total = await this.userModel.count(conditions);

    const users = isPaginated
      ? await this.userModel
        .find(conditions)
        .skip(offset)
        .limit(itemsLimit)
        .sort(sortOptions)
        .exec()
      : await this.userModel
        .find(conditions)
        .sort(sortOptions)
        .exec();

    return { items: users, total };
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

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id);
  };

  async update(id: string, userDto: UserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto);
  };

  async delete(id: string): Promise<void> {
    await this.userModel.remove({ _id: id });
  };
}
