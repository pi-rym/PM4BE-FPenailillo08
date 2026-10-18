import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import products from '../../common/data/products.json'
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository){}

    async getCategories(): Promise<Category[]>{
        return await this.categoriesRepository.getCategories()
    }

    async seedCategories(){
        const categories = products.map(product => (product.category))

        const uniqueCategories = [...new Set(categories)]
        const newCategories = await this.categoriesRepository.addCategories(uniqueCategories)
        return newCategories
    }
}
