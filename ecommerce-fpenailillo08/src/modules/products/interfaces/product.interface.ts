import { Category } from '../../categories/entities/category.entity';

export interface IProductSeed {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: Category;
}