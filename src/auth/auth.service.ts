import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(createUserDto: CreateUserDto) {
    // check if the user exist
    try {
      const foundUser = await this.usersService.findOneByUsername(
        createUserDto.username,
      );

      if (foundUser) {
        // if user exist, throw an exception
        throw new BadRequestException('Username already exist');
      }

      // salting and hashing password process will be implemented here

      // create a new user
      const newUser = await this.usersService.createUser(createUserDto);
      return newUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
