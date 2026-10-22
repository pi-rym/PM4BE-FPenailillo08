import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { AuthGuard } from '../auth/auth.guard';
import type { ICreateProduct, IUpdateProduct } from './interfaces/product.interface';

//Crear todos los endpoints CRUD para Products y Users 
//(GET, GET{id}, POST, PUT{id}, DELETE{id}).

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getProducts(@Query("page")page:string = "1",@Query("limit")limit:string = "5"): Promise<Product[]> {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)

        //VALIDACION NAN

        return await this.productsService.getProducts(pageNumber,limitNumber);
    }

    @Get("seeder")
    async getSeeder(){
        return await this.productsService.seedProducts()
    }

    @Get(":id")
    async getProductsById(@Param("id", ParseUUIDPipe)id:string): Promise<Product | null> {
        return await this.productsService.getProductById(id)
    }

    @Post()
    @UseGuards(AuthGuard)
    async createProduct(@Body() product: ICreateProduct): Promise<{id:string}>{
        const newProduct = await this.productsService.createProduct(product)
        return {id: newProduct.id}
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    async updateProduct(@Param("id", ParseUUIDPipe) id:string,@Body() product:IUpdateProduct): Promise<{id:string}>{
        const updatedProduct = await this.productsService.updateProducts(id,product)
        return{id:updatedProduct.id}
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    async deleteProduct(@Param("id", ParseUUIDPipe)id:string):Promise<{id:string}>{
        const deletedProduct= await this.productsService.deleteProducts(id)
        return {id: deletedProduct.id}
    }

}
