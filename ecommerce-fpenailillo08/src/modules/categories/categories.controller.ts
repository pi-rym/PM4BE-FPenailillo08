import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @Get()
    async getCategories(): Promise<Category[]>{
        return await this.categoriesService.getCategories()
    }

    @Get("seeder")
    async getSeeder(){
        return await this.categoriesService.seedCategories()
    }

}
