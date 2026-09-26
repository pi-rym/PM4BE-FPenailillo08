import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./Order"
import { Product } from "./Product"


@Entity()
export class OrderDetails {
    @PrimaryGeneratedColumn("uuid")
    id!: string
    @Column({
        type: "decimal",
        precision: 10,
        scale: 2
    })
    price!: number
    @OneToOne(() => Order, order => order.orderDetails)
    @JoinColumn()
    order!: Order
    @ManyToMany(() => Product, product => product.orderDetails)
    @JoinTable()
    products!: Product[]
}