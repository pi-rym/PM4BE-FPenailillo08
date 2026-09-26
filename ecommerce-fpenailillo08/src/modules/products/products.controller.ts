import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProduct } from './interfaces/product.interface';

//Crear todos los endpoints CRUD para Products y Users 
//(GET, GET{id}, POST, PUT{id}, DELETE{id}).

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Get()
    getProducts(): IProduct[] {
        return this.productsService.getProducts();
    }

    @Get(":id")
    getProductsById(): IProduct {
        return "Este endpoint devuelve un productor por ID"
    }

    @Post()
    createProduct(): IProduct {
        return "Este endpoint devuelve un nuevo usuario"
    }

    @Put(":id")
    updateProduct(): IProduct{
        return "Este endpoint actualiza un producto"
    }

}
