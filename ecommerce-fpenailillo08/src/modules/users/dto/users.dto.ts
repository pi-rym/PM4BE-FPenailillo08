import { ApiHideProperty, ApiProperty, PickType } from "@nestjs/swagger"
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, Min, MinLength, Validate } from "class-validator"
import { MatchPassword } from "../../../decorators/matchPassword.decorator"

export class CreateUserDto {

    @ApiProperty({
        description: "Debe ser un string de entre 3 y 50 caracteres",
        example: "TestUser01"
    })
    @IsNotEmpty({message: "Nombre es requerido"})
    @IsString({message: "Nombre debe ser un string"})
    @MinLength(3, {message: "Nombre de al menos tres caracteres"})
    @MaxLength(50, {message: "Nombre de no mas de cincuenta caracteres"})
    name!: string


    @ApiProperty({
        description: "Debe ser email válido",
        example: "TestUser01@mail.com"
    })
    @IsNotEmpty({message: "Email es requerido"})
    @IsEmail({}, {message: "Email debe ser válido"})
    //Pasarle objeto vacio => email clasico (texto@texto.texto)
    email!: string


    @ApiProperty({
        description: "Contraseña debe ser un string de entre 8 y 15 caracteres, con al menos una mayúscula, 1 minúscula, 1 número y 1 caracter especial",
        example: "AAbb11##"
    })
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


    @ApiProperty({
        description: "Debe ser igual a la contraseña",
        example: "AAbb11##"
    })
    @IsNotEmpty({message: "Confirmación de contraseña es requerida"})
    @Validate(MatchPassword, ["password"])
    confirmPassword!: string


    @ApiProperty({
        description: "Teléfono debe ser un número",
        example: "12345678"
    })
    @IsNotEmpty({message: "Teléfono es requerido"})
    @IsNumber({
        allowNaN: false,
        allowInfinity: false,
    }, {message: "Teléfono debe ser un number"})
    @Min(0, {message:"Télefono no puede ser negativo"})
    phone!: number

    
    @ApiProperty({
        description: "País debe ser un string de entre 5 y 20 caracteres",
        example: "CountryExample"
    })
    @IsString({message: "Pais debe ser un string"})
    @MinLength(5, {message: "Pais de al menos cinco caracteres"})
    @MaxLength(20, {message: "Pais de no mas de veinte caracteres"})
    country!: string

    
    @ApiProperty({
        description: "Dirección debe ser un string de entre 3 y 80 caracteres",
        example: "AdressExample"
    })
    @IsString({message: "Dirección debe ser un string"})
    @MinLength(3, {message: "Dirección de al menos tres caracteres"})
    @MaxLength(80, {message: "Dirección de no mas de ochenta caracteres"})
    address!: string

    
    @ApiProperty({
        description: "Ciudad debe ser un string de entre 5 y 20 caracteres",
        example: "CityExample"
    })
    @IsString({message: "Ciudad debe ser un string"})
    @MinLength(5, {message: "Ciudad de al menos cinco caracteres"})
    @MaxLength(20, {message: "Ciudad de no mas de veinte caracteres"})
    city!: string

    @ApiHideProperty()
    @IsEmpty()
    isAdmin!: boolean
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