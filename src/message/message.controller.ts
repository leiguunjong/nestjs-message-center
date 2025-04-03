import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, HttpStatus, Patch } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../enum/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { MessageDto } from './dto/message.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('message')
@ApiBearerAuth()
@Controller('message')
@UseGuards(AuthGuard, RolesGuard)
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Post()
    @ApiOperation({ summary: '创建消息', description: '需要管理员权限' })
    @ApiResponse({ status: HttpStatus.CREATED, description: '创建成功' })
    @Roles(Role.Admin)
    create(@Body() msg: MessageDto): Promise<Message> {
        return this.messageService.create(msg);
    }

    @Get()
    @ApiOperation({ summary: '获取消息列表' })
    @ApiResponse({ status: HttpStatus.OK, description: '获取消息成功' })
    @Roles(Role.User)
    getMessage() {
        return this.messageService.getMessage();
    }

    @Get('with_status')
    @ApiOperation({ summary: '获取带已读状态的消息列表' })
    @ApiResponse({ status: HttpStatus.OK, description: '获取消息成功' })
    @Roles(Role.User)
    getMessageWithStatus(@Req() req) {
        return this.messageService.getMessageWithStatus(req.user.sub);
    }

    @Patch('/read/:id')
    @ApiOperation({ summary: '更新消息已读状态' })
    @ApiResponse({ status: HttpStatus.OK, description: '更新已读状态成功' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'message id不存在' })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'message id重复' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: '服务端错误' })
    @Roles(Role.User)
    readMessage(@Req() req, @Param('id') id: string) {
        return this.messageService.updateReadStatus(req.user.sub, +id);
    }

    @Delete('delete/:id')
    @ApiOperation({ summary: '删除消息', description: '需要管理员权限' })
    @ApiResponse({ status: HttpStatus.OK, description: '删除消息成功' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'message id不存在' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: '服务端错误' })
    @Roles(Role.Admin)
    deleteMessage(@Param('id') id: string) {
        return this.messageService.deleteMessage(+id);
    }
}
