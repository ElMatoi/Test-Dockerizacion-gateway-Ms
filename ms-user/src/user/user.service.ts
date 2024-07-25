import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { generateToken } from 'src/utils/generate.token';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({ ...createUserDto, password: hashedPassword });
    await createdUser.save();
    const token = generateToken(createdUser);
    const userObject = createdUser.toObject();
    return {
      ...userObject,
      _id: undefined, 
      id: userObject._id.toString(),
      token
    } as User;
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: loginUserDto.email }).lean();
    if (user && await bcrypt.compare(loginUserDto.password, user.password)) {
      const token = generateToken(user);
      return {
        ...user,
        _id: undefined, 
        id: user._id.toString(),
        token
      } as User;
    }
    throw new Error('Invalid credentials');
  }
}
