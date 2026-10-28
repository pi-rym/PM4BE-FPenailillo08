import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [UsersRepository],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
