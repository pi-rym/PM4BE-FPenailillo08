import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersRepository {
    private users: IUser[] = [
  {
    id: 1,
    email: 'juan@gmail.com',
    name: 'Juan Pérez',
    password: 'juan123',
    address: 'Av. San Martín 1234',
    phone: '2615551234',
    country: 'Argentina',
    city: 'Mendoza',
  },
  {
    id: 2,
    email: 'maria@gmail.com',
    name: 'María González',
    password: 'maria456',
    address: 'Las Heras 850',
    phone: '2615555678',
    country: 'Argentina',
    city: 'Mendoza',
  },
  {
    id: 3,
    email: 'pedro@gmail.com',
    name: 'Pedro Rodríguez',
    password: 'pedro789',
    address: 'Belgrano 450',
    phone: '2615559876',
  },
];
getUsers(): IUser[] {
    return this.users;
  }
}
    