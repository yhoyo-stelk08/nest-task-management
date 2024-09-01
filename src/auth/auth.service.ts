import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    // check if the user exist
    try {
      const foundUser = await this.usersService.findOneByUsername(username);

      if (foundUser) {
        // if user exist, throw an exception
        throw new BadRequestException('Username already exist');
      }

      // salting and hashing password
      const salt = await bcrypt.genSalt(); // generate a salt
      const hashedPassword = await bcrypt.hash(password, salt); // hash the password

      // create a new user
      const newUser = await this.usersService.createUser({
        username,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async signIn(createUserDto: CreateUserDto) {
    try {
      const { username, password } = createUserDto;

      // check if the user exist
      const foundUser = await this.usersService.findOneByUsername(username);

      if (!foundUser) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // compare the password
      const isMatch = await bcrypt.compare(password, foundUser.password);

      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // generate jwt token
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
