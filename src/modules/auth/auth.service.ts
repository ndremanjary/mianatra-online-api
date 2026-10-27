import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/interfaces/users.interface';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async register(data: CreateUserDto): Promise<User> {
        const user = await this.usersService.findUserByEmail(data.email);
        if (user) throw new ConflictException('User already exists');

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await this.usersService.create({
            ...data,
            password: hashedPassword,
        });

        return newUser;
    }

    async login(email: string, password: string): Promise<LoginResponse> {
        const user = await this.usersService.findUserByEmail(email);
        if (!user) throw new NotFoundException('User not found');

        if (!await bcrypt.compare(password, user.password))
            throw new UnauthorizedException();

        const payload = { sub: user.id, email: user.email };

        return {
            ...user,
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}
