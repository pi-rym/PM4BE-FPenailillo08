import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { IProductSeed } from './interfaces/product.interface';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ){}

async getProducts(): Promise<Product[]> {
    return await this.productsRepository.find()
  }
async addProducts(products: IProductSeed[]): Promise<Product[]>{
  const existingProducts = await this.getProducts()

  const newProducts = products.filter(product => !existingProducts.some(existingProducts => existingProducts.name === product.name))

  const createdProducts = this.productsRepository.create(newProducts)
  const savedProducts = await this.productsRepository.save(createdProducts)

  return savedProducts
}
}
