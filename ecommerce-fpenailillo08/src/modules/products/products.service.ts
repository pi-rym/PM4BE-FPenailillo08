import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/product.entity';
import products from '../../common/data/products.json'
import { CategoriesRepository } from '../categories/categories.repository';


@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly categoriesRepository: CategoriesRepository    
    ) {}
    async getProducts(): Promise<Product[]> {
        return await this.productsRepository.getProducts();
    }
    async seedProducts(){
        const categories = await this.categoriesRepository.getCategories()

        const productsWithCategory = products.map(product => {
            const category = categories.find(category => category.name === product.category);
            if (!category) {
            throw new Error(`Categoría ${product.category} no encontrada`)
            }
            return {
                ...product,
                category: category
            }
        })
        const newProducts = await this.productsRepository.addProducts(productsWithCategory)
        return newProducts
    }
}
