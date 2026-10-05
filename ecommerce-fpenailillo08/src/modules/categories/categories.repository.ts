import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class CategoriesRepository {

    constructor(@InjectRepository(Category) 
    private readonly categoryRepository: Repository<Category>){}

    async getCategories(): Promise<Category[]>{
        return await this.categoryRepository.find()
    }
    async addCategories(names:string[]):Promise<Category[]>{
        
        const existingCategories = await this.getCategories()
        
        const newNames = names.filter(name => !existingCategories.some(category => category.name === name))
        const categories = newNames.map(name => ({ name: name }))

        const newCategories = this.categoryRepository.create(categories)
        const savedCategories = await this.categoryRepository.save(newCategories)

        return savedCategories
    }
}