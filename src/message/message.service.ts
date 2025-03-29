import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { UpdateReadDto } from './update-read.dto';
import { UserMessageStatus } from '../guards/authentication/users/user-message-status.entity';
import { deleteMessageOutputDto } from './delete-message-output.dto';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly msgRepository: Repository<Message>,
        @InjectRepository(UserMessageStatus)
        private readonly umsRepository: Repository<UserMessageStatus>,
    ) { }

    // 创建消息
    async create(msg: Partial<Message>): Promise<Message> {
        return this.msgRepository.save(msg);
    }

    // 获取消息
    async getMessage(): Promise<Message[]> {
        return this.msgRepository.find();
    }

    async getMessageWithStatus(userId: number): Promise<Message[]> {
        let rawMessage = await this.msgRepository
            .createQueryBuilder('message')
            .leftJoinAndSelect(
                'user_message_status',
                'ums',
                'ums.messageId = message.id AND ums.userId = :userId',
                { userId }
            )
            .select([
                'message.id AS id',
                'message.title AS title',
                'message.content AS content',
                'message.createdAt AS created_at',
                // with COALESCE to handle raw data 使用COALESCE处理未记录情况
                'COALESCE(ums.isRead, false) as isRead' /** typeorm gives 0 if false
                                                            typeorm会把false转0 */
            ])
            .getRawMany();
        return rawMessage.map(msg => {
            return {
                ...msg,
                isRead: Boolean(Number(msg.isRead)) // 0,1 TO false,true
            }
        });
    }

    // 获取某条消息
    async findOne(id: number): Promise<Message | null> {
        return this.msgRepository.findOneBy({ id });
    }

    // 更新已读状态
    async updateReadStatus(userId: number, messageId: number): Promise<UpdateReadDto> {
        return this.umsRepository
            .upsert(
                { userId, messageId, isRead: true },
                ['userId', 'messageId']
            )
            .then(() => { return { code: 1101, msg: 'update read status success' } })
            .catch(() => { return { code: 1102, msg: 'update read status fail' } });
    }

    // 删除消息
    async deleteMessage(id: number): Promise<deleteMessageOutputDto> {
        // 先加载关联实体（触发级联删除）
        const message = await this.msgRepository.findOne({
            where: { id },
            relations: ['statuses']
        });
        if (message) {
            return this.msgRepository.remove(message)
            .then(() => { return { code: 1201, msg: 'delete message success' }})
            .catch(() => { return { code: 1202, msg: 'delete message fail' } });
        }
        return { code: 1203, msg: 'delete message fail.message id not found' }
    }
}
