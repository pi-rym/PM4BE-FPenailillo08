import { Category } from '../../categories/entities/category.entity';

export interface IProductSeed {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: Category;
}

export interface ICreateProduct{
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
}

export interface IUpdateProduct extends Partial<ICreateProduct>{}