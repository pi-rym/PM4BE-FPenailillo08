import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { User } from "../modules/users/entities/user.entity";
import { Product } from "../modules/products/entities/product.entity";
import { Order } from "../modules/orders/entities/order.entity";
import { OrderDetails } from "../modules/orders/entities/orders-details.entity";
import { Category } from "../modules/categories/entities/category.entity";

export const typeOrmConfig = (configService: ConfigService,): TypeOrmModuleOptions =>{
    return {
    type: "postgres",
    host: configService.get("DB_HOST"),
    port: configService.get<number>("DB_PORT"),
    username: configService.get("DB_USERNAME"),
    password: configService.get("DB_PASSWORD"),
    database: configService.get("DB_NAME"),
    synchronize: false,
    logging: true,
    dropSchema: true,
    entities: [User, Product,Category, Order, OrderDetails],
    subscribers: [],
    migrations: [],
    }
}
