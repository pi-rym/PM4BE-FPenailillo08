import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/orders.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){}

    @Get(":id")
    async getOrder(@Param("id", ParseUUIDPipe) id: string): Promise<Order | null>{
        return await this.ordersService.getOrder(id)
    }

    @Post()
    async addOrder(@Body() body: CreateOrderDto): Promise<Order>{
        return await this.ordersService.addOrder(body.userId, body.products)
    }
}
