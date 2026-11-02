import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {IsNotEmpty, IsDefined, IsNumber, IsOptional, IsString, IsUrl, Max, MaxLength, Min, IsInt, IsUUID} from "class-validator";

export class CreateProductDto {

    @ApiProperty({
        description: "Debe ser un string de no más de 50 caracteres",
        example: "ProductoPrueba01"
    })
    @IsNotEmpty({ message: "Nombre es requerido" })
    @IsString({ message: "Nombre debe ser un string" })
    @MaxLength(50, { message: "Nombre de no más de cincuenta caracteres" })
    name!: string;

    @ApiProperty({
        description: "Descripción del producto",
        example: "Producto de excelente calidad"
    })
    @IsNotEmpty({ message: "Descripción es requerida" })
    @IsString({ message: "Descripción debe ser un string" })
    description!: string;

    @ApiProperty({
        description: "Precio decimal con precisión 10 y escala 2",
        example: 29.99
    })
    @IsDefined({ message: "Precio es requerido" })
    @IsNumber({
        allowNaN: false,
        allowInfinity: false,
        maxDecimalPlaces: 2
    }, { message: "Precio debe ser un número con máximo 2 decimales" })
    @Min(0, { message: "El precio no puede ser negativo" })
    @Max(99999999.99, {
        message: "El precio no puede superar 99999999.99"
    })
    price!: number;

    @ApiProperty({
        description: "Stock del producto, entero no negativo",
        example: 15
    })
    @IsDefined({ message: "Stock es requerido" })
    @IsInt({ message: "Stock debe ser un número entero" })
    @Min(0, { message: "Stock no puede ser negativo" })
    stock!: number;

    @ApiPropertyOptional({
        description: "URL de la imagen del producto. Si se omite, se utiliza la imagen por defecto",
        example: "https://ejemplo.com/imagen.jpg"
    })
    @IsOptional()
    @IsString({ message: "ImgURL debe ser un string" })
    @IsUrl({}, { message: "ImgURL debe ser una URL válida" })
    imgUrl?: string;

    @IsNotEmpty({ message: "La categoría es obligatoria" })
    @IsUUID("4", { message: "Debe ser un UUID válido" })
    categoryId!: string;
}

export class UpdateProductDto {
    
    @IsOptional()
    @IsNotEmpty({ message: "Nombre es requerido" })
    @IsString({ message: "Nombre debe ser un string" })
    @MaxLength(50, { message: "Nombre de no más de cincuenta caracteres" })
    name!: string;

    @IsOptional()
    @IsNotEmpty({ message: "Descripción es requerida" })
    @IsString({ message: "Descripción debe ser un string" })
    description!: string;

    @IsOptional()
    @IsDefined({ message: "Precio es requerido" })
    @IsNumber({
        allowNaN: false,
        allowInfinity: false,
        maxDecimalPlaces: 2
    }, { message: "Precio debe ser un número con máximo 2 decimales" })
    @Min(0, { message: "El precio no puede ser negativo" })
    @Max(99999999.99, {
        message: "El precio no puede superar 99999999.99"
    })
    price!: number;

    @IsOptional()
    @IsDefined({ message: "Stock es requerido" })
    @IsInt({ message: "Stock debe ser un número entero" })
    @Min(0, { message: "Stock no puede ser negativo" })
    stock!: number;

    @IsOptional()
    @IsString({ message: "ImgURL debe ser un string" })
    @IsUrl({}, { message: "ImgURL debe ser una URL válida" })
    imgUrl?: string;

    @IsOptional()
    @IsUUID("4", { message: "Debe ser un UUID válido" })
    categoryId?: string;
}

