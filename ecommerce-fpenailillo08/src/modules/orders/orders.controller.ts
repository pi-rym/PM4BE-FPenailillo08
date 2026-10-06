import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){}

    @Get(":id")
    async getOrder(@Param("id") id: string): Promise<Order | null>{
        return await this.ordersService.getOrder(id)
    }

    @Post()
    async addOrder(@Body() body: {userId: string, products: {id: string}[]}){
        return await this.ordersService.addOrder(body.userId,body.products)
    }
}
