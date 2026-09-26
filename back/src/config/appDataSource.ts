import dotenv from "dotenv";
import {DataSource} from "typeorm";
import { Category } from "../entities/Category";
import { Order } from "../entities/Order";
import { OrderDetails } from "../entities/OrderDetails";
import { Product } from "../entities/Product";
import { User } from "../entities/User";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    dropSchema: false,
    entities: [Category, Order, OrderDetails, Product, User],
    subscribers: [],
    migrations: [],
})