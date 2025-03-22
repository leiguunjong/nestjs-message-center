import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { UpdateReadDto } from './update-read.dto';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly msgRepository: Repository<Message>,
    ) { }

    // 创建消息
    async create(msg: Partial<Message>): Promise<Message> {
        return this.msgRepository.save(msg);
    }

    // 获取消息
    async getMessage(): Promise<Message[]> {
        return this.msgRepository.find();
    }

    // 获取某条消息
    async findOne(id: number): Promise<Message | null> {
        return this.msgRepository.findOneBy({ id });
    }

    // 更新已读状态
    async updateReadState(id: number): Promise<UpdateReadDto> {
        let msg = await this.findOne(id);
        if (msg) {
            msg.isRead = true;
            await this.msgRepository.save(msg);
            return {msg: 'update read state success'}
        }
        else {
            throw Error('要更新的消息不存在');
        }
    }

    // 删除消息
    async deleteMessage(id: number): Promise<void> {
        await this.msgRepository.delete(id);
    }
}
