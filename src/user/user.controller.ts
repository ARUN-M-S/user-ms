import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';


@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UsersService', 'CreateUser')
  async createUser(data: User) {
    const { name, email, password } = data;
    const user = await this.userService.createUser(name, email, password);
    return { id: user.id, name: user.name, email: user.email, createdDate: user.createdDate, updatedDate: user.updatedDate };
  }

  @GrpcMethod('UsersService', 'GetUser')
  async getUser(data: User) {
    
    const { email } = data;
    const user = await this.userService.findByEmail(email);
    
    if (!user) {
      return { name: '', email: '', password: '', createdDate: '', updatedDate: '' };
    }
    return { id: user.id, name: user.name, email: user.email, createdDate: user.createdDate, updatedDate: user.updatedDate,password:user.password };
  }
}
