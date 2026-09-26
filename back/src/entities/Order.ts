import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { OrderDetails } from "./OrderDetails"


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