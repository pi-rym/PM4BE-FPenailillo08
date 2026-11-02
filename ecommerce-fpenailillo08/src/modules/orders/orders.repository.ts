import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { DataSource, In, Repository } from "typeorm";
import { OrderDetails } from "./entities/orders-details.entity";
import { User } from "../users/entities/user.entity";
import { Product } from "../products/entities/product.entity";


@Injectable()
export class OrderRepository{
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderDetails)
        private readonly orderDetailsRepository: Repository<OrderDetails>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        private readonly dataSource: DataSource
    ){}

    async getOrder(id: string): Promise<Order | null>{
        return await this.orderRepository.findOne({
            where: {id},
            relations: {
                orderDetails: {
                    products: true
                },
            }
        })
    }

    
    async addOrder(
    userId: string,
    products: { id: string }[]
    ) {
    return await this.dataSource.transaction(async (manager) => {

        const user = await manager.findOne(User, {
            where: { id: userId }
        });

        if (!user) {
            throw new NotFoundException("Usuario no encontrado");
        }

        const productIds = products.map(product => product.id);

        const foundProducts = await manager.find(Product, {
            where: { id: In(productIds) }
        });

        if (foundProducts.length !== productIds.length) {
            throw new NotFoundException(
                "Uno o mas productos no fueron encontrados"
            );
        }

        const unavailableProduct = foundProducts.find(
            product => product.stock <= 0
        );

        if (unavailableProduct) {
            throw new BadRequestException(
                `El producto ${unavailableProduct.name} no tiene stock disponible`
            );
        }

        let total = 0;

        for (const product of foundProducts) {
            total += Number(product.price);
            product.stock -= 1;
        }

        await manager.save(Product, foundProducts) 
        
        const newOrder = manager.create(Order, {
            date: new Date(),
            user: user
        });

        const savedOrder = await manager.save(Order, newOrder);

        const newOrderDetails = manager.create(OrderDetails, {
            price: total,
            order: savedOrder,
            products: foundProducts
        });

        const savedOrderDetails = await manager.save(
            OrderDetails,
            newOrderDetails
        );

        savedOrder.orderDetails = savedOrderDetails;

        return savedOrder;
    });
}

}