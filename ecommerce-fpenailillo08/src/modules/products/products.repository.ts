import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateProduct, IProductSeed, IUpdateProduct } from './interfaces/product.interface';
import { Category } from '../categories/entities/category.entity';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>
  ){}

async getProducts(page:number,limit:number): Promise<Product[]> {

    const skip = (page - 1) * limit
    return await this.productsRepository.find({
      skip: skip,
      take: limit,
      order: {id:"ASC"}
    })
  }

async getProductById(id:string): Promise<Product | null>{
    return await this.productsRepository.findOne({
      where:{id}
    })
}

async createProduct(product: CreateProductDto): Promise<Product> {

    const existingCategory = await this.categoriesRepository.findOne({
        where: { id: product.categoryId }
    });

    if (!existingCategory) {
        throw new NotFoundException("Categoría inexistente");
    }

    const newProduct = this.productsRepository.create({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imgUrl: product.imgUrl ?? undefined,
        category: existingCategory
    });

    return await this.productsRepository.save(newProduct);
}

async updateProducts(id: string, product: UpdateProductDto): Promise<Product>{
  const existingProduct = await this.getProductById(id)

  if(!existingProduct) throw new NotFoundException("Producto inexistente")

  if(product.price !== undefined){
    existingProduct.price = product.price
  }
  if(product.stock !== undefined){
    existingProduct.stock = product.stock
  }
  if(product.name !== undefined){
    existingProduct.name = product.name
  }
  if(product.description !== undefined){
    existingProduct.description = product.description
  }
  if (product.imgUrl !== undefined) {
    existingProduct.imgUrl = product.imgUrl;
  }
  if(product.categoryId !== undefined){
    const existingCategory = await this.categoriesRepository.findOne({
      where: {id: product.categoryId}
    })
    if (!existingCategory) throw new NotFoundException("Categoria inexistente")
    existingProduct.category = existingCategory
  }

  const updatedProduct =  await this.productsRepository.save(existingProduct)
  return updatedProduct
}

async deleteProducts(id:string): Promise<{id:string}>{
  const existingProduct = await this.getProductById(id)

  if(!existingProduct) throw new NotFoundException("Producto inexistente")
  
  const deletedProduct = await this.productsRepository.remove(existingProduct)

  return {id:deletedProduct.id}
}

async addProducts(products: IProductSeed[]): Promise<Product[]>{
  const existingProducts = await this.productsRepository.find()

  const newProducts = products.filter(product => !existingProducts.some(existingProducts => existingProducts.name === product.name))

  const createdProducts = this.productsRepository.create(newProducts)
  const savedProducts = await this.productsRepository.save(createdProducts)

  return savedProducts
}
}
