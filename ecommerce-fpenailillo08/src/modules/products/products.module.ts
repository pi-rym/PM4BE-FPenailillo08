import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoriesModule } from '../categories/categories.module';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product, Category]), CategoriesModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository]
})
export class ProductsModule {}
