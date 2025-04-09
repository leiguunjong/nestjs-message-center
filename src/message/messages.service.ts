import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { UserMessageStatus } from './entities/user-message-status.entity';
import { OutputDto } from './dto/output.dto';
import { PinoLogger, InjectPinoLogger } from "nestjs-pino";

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private readonly msgRepository: Repository<Message>,
        @InjectRepository(UserMessageStatus)
        private readonly umsRepository: Repository<UserMessageStatus>,
        @InjectPinoLogger(MessagesService.name)
        private readonly logger: PinoLogger
    ) { }

    async create(msg: Partial<Message>): Promise<Message> {
        return this.msgRepository.save(msg);
    }

    async getMessage(): Promise<Message[]> {
        return this.msgRepository.find();
    }

    async getMessageWithStatus(userId: number): Promise<Message[]> {
        const rawMessage = await this.msgRepository
            .createQueryBuilder('message')
            .leftJoinAndSelect(
                // 存放已读状态的表
                // A table that holds read state
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

    async updateReadStatus(userId: number, messageId: number): Promise<OutputDto> {
        return this.umsRepository.save({ userId, messageId, isRead: true })
            .then(() => ({ code: 1101, msg: 'update read status success' }))
            .catch(err => {
                this.logger.error(err);
                if (err.code === 'ER_DUP_ENTRY') {
                    throw new ConflictException({ code: 1102, msg: 'duplicate message id' });
                }
                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    throw new NotFoundException({ code: 1103, msg: 'message id not found' });
                }
                throw new InternalServerErrorException({ code: 1104, msg: 'server error' });
            }
            );
    }

    async deleteMessage(id: number): Promise<OutputDto> {
        // 先加载关联实体（触发级联删除）
        // Related entities are loaded first (triggering a cascade delete)
        const message = await this.msgRepository.findOne({
            where: { id },
            relations: ['statuses']
        });
        if (!message) {
            this.logger.error('message id not found');
            throw new NotFoundException({ code: 1201, msg: 'message id not found' });
        }
        return this.msgRepository.remove(message)
            .then(() => { return { code: 1202, msg: 'delete message success' } })
            .catch(err => {
                this.logger.error(err);
                throw new InternalServerErrorException({ code: 1203, msg: 'delete message fail' });
            }
            );
    }
}
