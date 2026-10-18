import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { In, Repository } from "typeorm";
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
        private readonly productsRepository: Repository<Product>
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
        products:{id: string}[]
    ){
       const user = await this.usersRepository.findOne({
        where: {id: userId},
       }) 

       if(!user) throw new Error("Usuario no encontrado")

        const productIds = products.map(product => product.id)
        const foundProducts = await this.productsRepository.find({
            where: {id: In(productIds)}
        })

        if(foundProducts.length !== productIds.length) throw new Error("Uno o mas productos no fueron encontrados")

        const availableProducts = foundProducts.filter(product => product.stock > 0)
        let total = 0

        for (const product of availableProducts) {
        total = total + Number(product.price)
        product.stock = product.stock - 1
        }

        const savedProducts = await this.productsRepository.save(availableProducts)

        const newOrder = this.orderRepository.create({
            date: new Date(),
            user: user
        })

        const savedOrder = await this.orderRepository.save(newOrder)
        
        const newOrderDetails = this.orderDetailsRepository.create({
            price: total,
            order: savedOrder,
            products: availableProducts 
        })

        const savedOrderDetails = await this.orderDetailsRepository.save(newOrderDetails)
        savedOrder.orderDetails = savedOrderDetails
        return savedOrder
    }
}