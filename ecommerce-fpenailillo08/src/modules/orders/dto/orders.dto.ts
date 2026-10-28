import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator"
import { Product } from "../../products/entities/product.entity"
import { ApiProperty } from "@nestjs/swagger"

export class CreateOrderDto {

    @ApiProperty({
            description: "El ID del usuario debe ser un UUID v4",
            example: "8f3c2a91-6d74-4b0e-9a52-c7e18d903f46"
        })
    @IsNotEmpty({message: "ID del usuario es requerido"})
    @IsUUID(4, {message: "ID del usuario debe ser un UUID v4"})
    userId!: string


    @ApiProperty({
        description: "La lista de productos debe ser un array con al menos un producto",
        
    })
    @IsArray({message: "La lista de productos debe ser un array"})
    @ArrayMinSize(1, {message: "Debe haber al menos un producto"})
    products!: (Partial<Product> & {id:string})[]
}