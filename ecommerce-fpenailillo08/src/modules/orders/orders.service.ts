import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
    constructor(private readonly orderRepository: OrderRepository){}

    async getOrder(id:string){
        return await this.orderRepository.getOrder(id)
    }

    async addOrder(userId: string, products: {id: string}[]){
        return await this.orderRepository.addOrder(userId, products)
    }
}
