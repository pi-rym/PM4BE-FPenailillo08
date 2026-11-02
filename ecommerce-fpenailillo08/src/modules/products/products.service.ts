import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/product.entity';
import products from '../../common/data/products.json'
import { CategoriesRepository } from '../categories/categories.repository';
import { ICreateProduct, IUpdateProduct } from './interfaces/product.interface';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';


@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly categoriesRepository: CategoriesRepository    
    ) {}


    async getProducts(page:number,limit:number): Promise<Product[]> {
        return await this.productsRepository.getProducts(page,limit);
    }

    async getProductById(id:string): Promise<Product | null>{
        return await this.productsRepository.getProductById(id);
    }

    async createProduct(product: CreateProductDto): Promise<Product>{
        return await this.productsRepository.createProduct(product)
    }

    async updateProducts(id:string,product: UpdateProductDto): Promise<Product>{
        return await this.productsRepository.updateProducts(id,product)
    }

    async deleteProducts(id:string):Promise<{id:string}>{
        return await this.productsRepository.deleteProducts(id)
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
