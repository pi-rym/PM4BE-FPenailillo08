import { Injectable } from '@nestjs/common';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductsRepository {
    private products: IProduct[] = [
  {
    id: 1,
    name: 'Notebook Lenovo IdeaPad',
    description: 'Notebook con 16GB de RAM y SSD de 512GB',
    price: 950000,
    stock: true,
    imgUrl: 'https://example.com/notebook.jpg',
  },
  {
    id: 2,
    name: 'Mouse Logitech',
    description: 'Mouse inalámbrico ergonómico',
    price: 35000,
    stock: true,
    imgUrl: 'https://example.com/mouse.jpg',
  },
  {
    id: 3,
    name: 'Teclado Redragon',
    description: 'Teclado mecánico para escritorio',
    price: 75000,
    stock: false,
    imgUrl: 'https://example.com/teclado.jpg',
  },
];
getProducts(): IProduct[] {
    return this.products;
  }
}
