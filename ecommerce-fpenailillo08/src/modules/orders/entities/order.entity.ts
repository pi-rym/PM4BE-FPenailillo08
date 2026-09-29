import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm"
import { User } from "../../users/entities/user.entity"
import { OrderDetails } from "./orders-details.entity"


@Entity()
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id!: string
    @Column({
        type: "date"
    })
    date!: Date
    @ManyToOne(() => User, user => user.orders)
    user!: User
    @OneToOne(() => OrderDetails, (orderdetails) => orderdetails.order)
    orderDetails!: OrderDetails
}