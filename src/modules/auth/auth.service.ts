import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './interfaces/login-response.iterface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async register(data: CreateUserDto): Promise<{ message: string }> {
        const user = await this.usersService.findUserByEmail(data.email);
        if (user) throw new ConflictException('User already exists');

        const hashedPassword = await bcrypt.hash(data.password, 10);
        await this.usersService.createUser({
            ...data,
            password: hashedPassword,
        });

        return { message: 'User created successfully' };
    }

    async login(email: string, password: string): Promise<LoginResponse> {
        const user = await this.usersService.findUserByEmail(email);
        if (!user) throw new NotFoundException('User not found');

        if (!await bcrypt.compare(password, user.password))
            throw new UnauthorizedException();

        const payload = { sub: user.id, email: user.email, roles: user.roles };

        return {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}
