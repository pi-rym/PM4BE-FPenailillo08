import { Controller, Get, Param, Post, Put, UseGuards, Body, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { Roles } from '../../decorators/roles.decorators';
import { RolesGuard } from '../auth/roles.guard';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Role } from '../../common/roles.enum';

//Crear todos los endpoints CRUD para Products y Users 
//(GET, GET{id}, POST, PUT{id}, DELETE{id}).


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @ApiBearerAuth()
    @ApiQuery({
        name: "page",
        required: false,
        type: String,
        description: "Número de página"
    })
    @ApiQuery({
        name: "limit",
        required: false,
        type: String,
        description: "Usuarios por página"
    })
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async getUsers(@Query("page") page?:string,@Query("limit") limit?:string): Promise<User[]>  {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)

        const validPage = !isNaN(pageNumber) && pageNumber > 0 ? pageNumber: 1
        const validLimit = !isNaN(limitNumber) && limitNumber > 0 ? limitNumber: 5
        //NO DEVOLVER PASSWORD
        
        return await this.usersService.getUsers(validPage,validLimit);
    }

    @ApiBearerAuth()
    @ApiParam({name: "id", description: "ID del producto", type: String})
    @Get(":id")
    @UseGuards(AuthGuard)
    async getUserById(@Param("id", ParseUUIDPipe)id: string): Promise<Omit<User, "password" | "isAdmin">> {
        return await this.usersService.getUserById(id);
        //NO DEVOLVER PASSWORD
    }

    // @Post()
    // async createUser(@Body()user:CreateUserDto): Promise<{id:string}> {
    //     const createdUser = await this.usersService.createUser(user)
    //     return {id: createdUser.id}
    // }

    @ApiBearerAuth()
    @ApiParam({name: "id", description: "ID del producto", type: String})
    @Put(":id")
    @UseGuards(AuthGuard)
    async updateUser(@Param("id", ParseUUIDPipe)id:string,@Body()user:UpdateUserDto): Promise<{id:string}> {
        const updatedUser = await this.usersService.updateUser(id,user)
        return {id:updatedUser.id} 
    }

    @ApiBearerAuth()
    @ApiParam({name: "id", description: "ID del producto", type: String})
    @Delete(":id")
    @UseGuards(AuthGuard)
    async deleteUser(@Param("id",ParseUUIDPipe)id:string): Promise<{id:string}>{
        const deletedUser = await this.usersService.deleteUser(id)
        return {id:deletedUser.id}
    }

}
