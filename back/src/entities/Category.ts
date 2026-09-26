import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./Product"


@Entity()
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id!: string
    @Column({
        type: "varchar",
        length: 50
    })
    name!: string
    @OneToMany(() => Product, product => product.category)
    products!: Product[]
}