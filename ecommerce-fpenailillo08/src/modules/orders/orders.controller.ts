import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/orders.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){}

    @ApiBearerAuth()
    @Get(":id")
    @UseGuards(AuthGuard)
    async getOrder(@Param("id", ParseUUIDPipe) id: string): Promise<Order | null>{
        return await this.ordersService.getOrder(id)
    }

    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    async addOrder(@Body() body: CreateOrderDto): Promise<Order>{
        return await this.ordersService.addOrder(body.userId, body.products)
    }
}
