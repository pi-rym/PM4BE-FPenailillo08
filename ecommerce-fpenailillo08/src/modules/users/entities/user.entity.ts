import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "../../orders/entities/order.entity";

@Entity()

export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string
    @Column({
        type: "varchar",
        length: 50
    })
    name!: string
    @Column({
        type: "varchar",
        length: 50,
        unique: true
    })
    email!: string
    @Column({
        type: "varchar",
        length: 20,
        select: false
    })
    password!: string
    @Column({
        type: "int"
    })
    phone!: number
    @Column({
        type: "varchar",
        length: 50
    })
    country!: string
    @Column({
        type: "text"
    })
    address!: string
    @Column({
        type: "varchar",
        length: 50
    })
    city!: string
    // @Column()
    // isAdmin!: boolean
     @OneToMany(() => Order, (order) => order.user)
     orders!: Order[]
}
