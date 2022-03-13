import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ProductDto } from '@products/dto/product.dto';

import { Product, ProductDocument } from '@products/schema/products.schema';

import { FiltersListDto } from '@common/dto/filters-list.dto';

import { getLimitIndex, getStartIndex } from '@common/helpers/pagination';

import { SORT_DESC, SORT_ASC } from '@common/constants/sorting.constants';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) { }

  async create(productDto: ProductDto): Promise<Product> {
    return new this.productModel(productDto).save();
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

    const total = await this.productModel.count(conditions);

    const products = isPaginated
      ? await this.productModel
        .find(conditions)
        .skip(offset)
        .limit(itemsLimit)
        .sort(sortOptions)
        .exec()
      : await this.productModel
        .find(conditions)
        .sort(sortOptions)
        .exec();

    return { items: products, total };
  }

  private getFilterListConditions(filtersListDto: FiltersListDto) {
    let conditions = {};
    const { search } = filtersListDto;

    if (search) {
      const regexp = new RegExp(search, 'i');

      conditions = {
        $or: [
          { name: { $regex: regexp } }
        ]
      };
    }

    return conditions;
  }

  async getById(id: string): Promise<Product> {
    return this.productModel.findById(id);
  };

  async update(id: string, productDto: ProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productDto);
  };

  async delete(id: string): Promise<void> {
    await this.productModel.remove({ _id: id });
  };
}
