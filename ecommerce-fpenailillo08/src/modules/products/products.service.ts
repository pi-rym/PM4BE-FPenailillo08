import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}
    getProducts(): IProduct[] {
        return this.productsRepository.getProducts();
    }
}
