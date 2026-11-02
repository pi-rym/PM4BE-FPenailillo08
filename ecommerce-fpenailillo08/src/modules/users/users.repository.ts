import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ){}

  async getUsers(page:number,limit:number): Promise<User[]> {
    const skip = (page - 1) * limit
    return await this.usersRepository.find({
      skip: skip,
      take: limit,
      order: {id:"ASC"}
    })
  }

  async getUserById(id: string): Promise<Omit<User, "password" | "isAdmin">>{
    const foundUser = await this.usersRepository.findOne({
      where: {id},
      relations:{
        orders: true
      },
      select:{
        orders:{
          id: true,
          date: true
        }
      }
    })
    if (!foundUser) throw new NotFoundException ("No se encontró el usuario")

    const {password, isAdmin, ...filteredUser} = foundUser

    return filteredUser
  }

  async getUserByEmail(email:string): Promise<User | null>{
    return await this.usersRepository.findOne({
      where:{email},
      select:{
        id: true,
        password: true,  //TypeORM recupera el hash de la contraseña y bcrypt.compare() puede utilizarlo
        isAdmin: true
      }
    })
  }

  async createUser(user:CreateUserDto): Promise<User>{
    const newUser = this.usersRepository.create(user)
    const savedUser= await this.usersRepository.save(newUser)

    return savedUser
  }

  async updateUser(id:string,user:UpdateUserDto): Promise<User>{
    const existingUser = await this.getUserById(id)

    if(!existingUser) throw new NotFoundException("No se encontro el usuario")

    if(user.name !== undefined){
      existingUser.name = user.name
    }
    if(user.email !== undefined){
      existingUser.email = user.email
    }
    if(user.phone !== undefined){
      existingUser.phone = user.phone
    }
    if(user.address !== undefined){
      existingUser.address = user.address
    }
    if(user.country !== undefined){
      existingUser.country = user.country
    }
    if(user.city !== undefined){
      existingUser.city = user.city
    }
    
    const updatedUser = await this.usersRepository.save(existingUser)
    return updatedUser
  }

  async deleteUser(id:string): Promise<{id:string}>{
    const result = await this.usersRepository.delete(id)

    if(result.affected === 0) throw new NotFoundException("No se encontro el usuario")

    return {id}
  }
}
    