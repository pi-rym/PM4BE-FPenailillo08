import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../modules/products/entities/product.entity";

@Injectable()
export class FilesRepository {
    constructor(
        @InjectRepository(Product)
        private readonly filesRepository: Repository<Product>
    ){}
}

