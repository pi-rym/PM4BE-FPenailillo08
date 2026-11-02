import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { AuthGuard } from '../auth/auth.guard';
import type { ICreateProduct, IUpdateProduct } from './interfaces/product.interface';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../../decorators/roles.decorators';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';
import { Role } from '../../common/roles.enum';

//Crear todos los endpoints CRUD para Products y Users 
//(GET, GET{id}, POST, PUT{id}, DELETE{id}).

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}
    @ApiBearerAuth()
    @ApiQuery({
        name: "page",
        required: false,
        type: String,
        description: "Número de página"
    })
    @ApiQuery({
        name: "limit",
        required: false,
        type: String,
        description: "Productos por página"
    })
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    async getProducts(@Query("page")page?:string,@Query("limit")limit?:string): Promise<Product[]> {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)

        const validPage = !isNaN(pageNumber) && pageNumber > 0 ? pageNumber: 1
        const validLimit = !isNaN(limitNumber) && limitNumber > 0 ? limitNumber: 5

        return await this.productsService.getProducts(validPage,validLimit);
    }

    @Get("seeder")
    async getSeeder(){
        return await this.productsService.seedProducts()
    }

    @Get(":id")
    async getProductsById(@Param("id", ParseUUIDPipe)id:string): Promise<Product | null> {
        return await this.productsService.getProductById(id)
    }

    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    async createProduct(@Body() product: CreateProductDto): Promise<{id:string}>{
        const newProduct = await this.productsService.createProduct(product)
        return {id: newProduct.id}
    }

    @ApiBearerAuth()
    @Put(":id")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async updateProduct(@Param("id", ParseUUIDPipe) id:string,@Body() product:UpdateProductDto): Promise<{id:string}>{
        const updatedProduct = await this.productsService.updateProducts(id,product)
        return{id:updatedProduct.id}
    }

    @ApiBearerAuth()
    @Delete(":id")
    @UseGuards(AuthGuard)
    async deleteProduct(@Param("id", ParseUUIDPipe)id:string):Promise<{id:string}>{
        const deletedProduct= await this.productsService.deleteProducts(id)
        return {id: deletedProduct.id}
    }

}
