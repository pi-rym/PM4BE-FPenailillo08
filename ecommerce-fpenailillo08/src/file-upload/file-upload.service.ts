import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { Repository } from 'typeorm';
import { Product } from '../modules/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileUploadService {
    constructor(
        private readonly fileUploadRepository: FileUploadRepository,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>
    ){}

    async uploadImage(file: Express.Multer.File, productId: string){
        //* 1. Verificar que el producto exista:
        const foundProduct = await this.productsRepository.findOneBy({id:productId})
        
        if(!foundProduct) throw new NotFoundException("Producto no encontrado")
            
        //* 2. Si el producto existe cargamos la imagen en cloudinary
        const result = await this.fileUploadRepository.uploadImage(file)

        if(!result.secure_url) throw new NotFoundException("Error al cargar imagen")

        //* 3. Actualizar la imagen en base de datos
        await this.productsRepository.update(productId,{imgUrl:result.secure_url})
        
        //* 4. Retornar el producto modificado
        const updatedProduct = await this.productsRepository.findOneBy({id:productId})
        return updatedProduct
    }
}
