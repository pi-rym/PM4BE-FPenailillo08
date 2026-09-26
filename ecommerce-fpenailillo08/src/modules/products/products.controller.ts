import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProduct } from './interfaces/product.interface';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Get()
    getProducts(): IProduct[] {
        return this.productsService.getProducts();
    }
}
