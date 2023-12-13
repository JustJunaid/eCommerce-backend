import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtStrategy } from '../guards/jwt-strategy';
import { SendEmailModule } from 'src/sendEmail/sendEmail.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [SendEmailModule],
    controllers: [UsersController],
    providers: [UsersService, JwtStrategy, PrismaService],
    exports: [UsersService],
})
export class UsersModule {}
