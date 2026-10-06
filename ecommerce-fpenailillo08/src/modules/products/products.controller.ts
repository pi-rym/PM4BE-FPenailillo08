import { Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { AuthGuard } from '../auth/auth.guard';

//Crear todos los endpoints CRUD para Products y Users 
//(GET, GET{id}, POST, PUT{id}, DELETE{id}).

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Get()
    getProducts(): Promise<Product[]> {
        return this.productsService.getProducts();
    }

    @Get("seeder")
    async getSeeder(){
        return await this.productsService.seedProducts()
    }

    @Get(":id")
    getProductsById(): string {
        return "Este endpoint devuelve un productor por ID"
    }

    @Post()
    @UseGuards(AuthGuard)
    createProduct(): string {
        return "Este endpoint devuelve un nuevo producto"
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    updateProduct(): string{
        return "Este endpoint actualiza un producto"
    }

}
