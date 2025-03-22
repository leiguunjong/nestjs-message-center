import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import { Roles } from '../guards/authorization/roles.decorator';
import { Role } from '../guards/authorization/role.enum';
import { RolesGuard } from 'src/guards/authorization/roles.guard';
import { AuthGuard } from 'src/guards/authentication/auth/auth.guard';
import { MessageDto } from './message.dto';

@Controller('message')
// @UseGuards(AuthGuard)
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Post()
    // @Roles(Role.Admin)
    create(@Body() msg: MessageDto): Promise<Message> {
        return this.messageService.create(msg);
    }

    @Get()
    @Roles(Role.User)
    getMessage(): Promise<Message[]> {
        return this.messageService.getMessage();
    }

    @Put(':id')
    @Roles(Role.Admin)
    readMessage(@Param('id') id: string){
        return this.messageService.updateReadState(+id);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    deleteMessage(@Param('id') id: string): Promise<void> {
        return this.messageService.deleteMessage(+id);
    }

    // @Delete()
    // deleteMessage(@Body() obj ): Promise<void> {
    //     return this.messageService.deleteMessage(+obj.id);
    // }
}
