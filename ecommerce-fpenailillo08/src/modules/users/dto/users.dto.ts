import { PickType } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {

    @IsNotEmpty({message: "Nombre es requerido"})
    @IsString({message: "Nombre debe ser un string"})
    @MinLength(3, {message: "Nombre de al menos tres caracteres"})
    @MaxLength(50, {message: "Nombre de no mas de cincuenta caracteres"})
    name!: string
    
    @IsNotEmpty({message: "Email es requerido"})
    @IsEmail({}, {message: "Email debe ser válido"})
    //Pasarle objeto vacio => email clasico (texto@texto.texto)
    email!: string

    @IsNotEmpty({message: "Contraseña es requerida"})
    @IsString({message: "Contraseña debe ser un string"})
    @MinLength(8, {message: "Contraseña de al menos ocho caracteres"})
    @MaxLength(15, {message: "Contraseña de no mas de quince caracteres"})
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password!: string

    @IsNotEmpty({message: "Teléfono es requerido"})
    @IsNumber({
        allowNaN: false,
        allowInfinity: false,
    }, {message: "Teléfono debe ser un number"})
    phone!: number

    @IsString({message: "Pais debe ser un string"})
    @MinLength(5, {message: "Pais de al menos cinco caracteres"})
    @MaxLength(20, {message: "Pais de no mas de veinte caracteres"})
    country!: string

    @IsString({message: "Dirección debe ser un string"})
    @MinLength(3, {message: "Dirección de al menos tres caracteres"})
    @MaxLength(80, {message: "Dirección de no mas de ochenta caracteres"})
    address!: string

    @IsString({message: "Ciudad debe ser un string"})
    @MinLength(5, {message: "Ciudad de al menos cinco caracteres"})
    @MaxLength(20, {message: "Ciudad de no mas de veinte caracteres"})
    city!: string
}

export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty({message: "Nombre es requerido"})
    @IsString({message: "Nombre debe ser un string"})
    @MinLength(3, {message: "Nombre de al menos tres caracteres"})
    @MaxLength(50, {message: "Nombre de no mas de cincuenta caracteres"})
    name!: string

    @IsOptional()
    @IsNotEmpty({message: "Email es requerido"})
    @IsEmail({}, {message: "Email debe ser válido"})
    email!: string

    @IsOptional()
    @IsNotEmpty({message: "Contraseña es requerida"})
    @IsString({message: "Contraseña debe ser un string"})
    @MinLength(8, {message: "Contraseña de al menos ocho caracteres"})
    @MaxLength(15, {message: "Contraseña de no mas de quince caracteres"})
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password!: string

    @IsOptional()
    @IsNotEmpty({message: "Teléfono es requerido"})
    @IsNumber({
        allowNaN: false,
        allowInfinity: false,
    }, {message: "Teléfono debe ser un number"})
    phone!: number

    @IsOptional()
    @IsString({message: "Pais debe ser un string"})
    @MinLength(5, {message: "Pais de al menos cinco caracteres"})
    @MaxLength(20, {message: "Pais de no mas de veinte caracteres"})
    country!: string

    @IsOptional()
    @IsString({message: "Dirección debe ser un string"})
    @MinLength(3, {message: "Dirección de al menos tres caracteres"})
    @MaxLength(80, {message: "Dirección de no mas de ochenta caracteres"})
    address!: string

    @IsOptional()
    @IsString({message: "Ciudad debe ser un string"})
    @MinLength(5, {message: "Ciudad de al menos cinco caracteres"})
    @MaxLength(20, {message: "Ciudad de no mas de veinte caracteres"})
    city!: string
}

export class LoginUserDto extends PickType(CreateUserDto, [
    "email",
    "password"
]) {}