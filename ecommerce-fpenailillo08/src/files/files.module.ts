import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FilesRepository } from './files.repository';
import { CloudinaryConfig } from '../config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../modules/products/entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product])],
  controllers: [FilesController],
  providers: [FilesService, FilesRepository, CloudinaryConfig]
})
export class FilesModule {}
