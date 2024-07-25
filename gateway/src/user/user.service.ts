import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  async login(email: string, password: string): Promise<User> {
    const response = await lastValueFrom(
      this.httpService.post('http://ms-user:3001/user/login', { email, password })
    );
    return response.data;
  }

  async register(email: string, password: string, name: string): Promise<User> {
    const response = await lastValueFrom(
      this.httpService.post('http://ms-user:3001/user/register', { email, password, name })
    );
    return response.data;
  }
}
