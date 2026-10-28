import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CategoriesService } from './modules/categories/categories.service';
import { ProductsService } from './modules/products/products.service';
import { JwtModule } from '@nestjs/jwt';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => typeOrmConfig(configService)
    }),
    ProductsModule, UsersModule, AuthModule, CategoriesModule, OrdersModule, FileUploadModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: "1h"}
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap{
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService
  ){}

  async onApplicationBootstrap() {
    await this.categoriesService.seedCategories()
    console.log("Categorias cargadas...")

    await this.productsService.seedProducts()
    console.log("Productos cargados...")
  }
}
