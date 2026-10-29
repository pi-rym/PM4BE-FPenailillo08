import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "../modules/users/entities/user.entity";
import { Product } from "../modules/products/entities/product.entity";
import { Category } from "../modules/categories/entities/category.entity";
import { Order } from "../modules/orders/entities/order.entity";
import { OrderDetails } from "../modules/orders/entities/orders-details.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    entities:[User,Product,Category,Order,OrderDetails],
    migrations:["src/migrations/*{.ts,.js}"],
    synchronize: true,
})