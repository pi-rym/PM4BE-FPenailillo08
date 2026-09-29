import { Entity,PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm"
import { Category } from "../../categories/entities/category.entity"
import { OrderDetails } from "../../orders/entities/orders-details.entity"

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id!: string
    @Column({
        type: "varchar",
        length: 50
    })
    name!: string
    @Column({
        type: "text"
    })
    description!: string
    @Column({
        type: "decimal",
        precision: 10,
        scale: 2
    })
    price!: number
    @Column({
        type: "numeric"
    })
    stock!: number
    @Column({
        type: "varchar",
        default: "URL_DE_LA_IMAGEN_POR_DEFECTO"
    })
    imgUrl!: string
     @ManyToOne(() => Category, category => category.products)
     category!: Category
     @ManyToMany(() => OrderDetails, orderDetails => orderDetails.products)
     orderDetails!: OrderDetails[]
}