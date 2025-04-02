import {
  ClassSerializerInterceptor,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UseInterceptors
} from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterOutputDto } from './register-output.dto';
import { InjectPinoLogger, Logger } from "nestjs-pino";

@Injectable()
@UseInterceptors(ClassSerializerInterceptor)
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectPinoLogger(UsersService.name)
    private readonly logger: Logger
  ) { }

  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  async register(user: Partial<User>): Promise<RegisterOutputDto> {
    try {
      // use await to ensure go to catch when something go wrong
      // await住，在duplicate username时报错走到catch
      await this.userRepository.save(user);
      return { code:1001, msg: 'register success' }
    } catch (err) {
      this.logger.error(err);
      if(err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException({ code: 1002, msg: 'username exists' });
      }
      throw new InternalServerErrorException({ code: 1003, msg: 'server error' });
    }
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}