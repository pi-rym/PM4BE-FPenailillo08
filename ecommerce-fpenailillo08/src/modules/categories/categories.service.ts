import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import products from '../../common/data/products.json'

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository){}

    async seedCategories(){
        const categories = products.map(product => (product.category))

        const uniqueCategories = [...new Set(categories)]
        const newCategories = await this.categoriesRepository.addCategories(uniqueCategories)
        return newCategories
    }
}
