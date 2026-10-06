import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ){}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find()
  }

  async getUserById(id: string): Promise<User | null>{
    return await this.usersRepository.findOne({
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
  }
}
    