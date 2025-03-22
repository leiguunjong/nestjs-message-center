import {
  ClassSerializerInterceptor,
  Injectable,
  UnauthorizedException,
  UseInterceptors
} from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterOutputDto } from './register-output.dto';

@Injectable()
@UseInterceptors(ClassSerializerInterceptor)
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  async register(user: Partial<User>): Promise<RegisterOutputDto> {
    try {
      // use await to ensure go to catch when something go wrong
      // await住，在duplicate username时报错走到catch
      await this.userRepository.save(user);
      return { msg: 'register success' }
    } catch (e) {
      throw new UnauthorizedException(e?.sqlMessage);
    }
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}