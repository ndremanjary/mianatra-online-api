import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/users.interface';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(data: CreateUserDto): Promise<{ message: string }> {
        await this.prisma.user.create({ data });
        return { message: 'User created successfully' };
    }

    async findUserByEmail(email: string): Promise<User | null> {
        if (!email) throw new BadRequestException('Email is required');
        return await this.prisma.user.findUnique({ where: { email } });
    }
}
