import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthorizedPublic } from '../../common/decorators/authorized-public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginResponse } from './interfaces/login-response.iterface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @AuthorizedPublic()
    @ApiOperation({ summary: 'Create an account' })
    async register(@Body() data: CreateUserDto): Promise<{ message: string }> {
        return await this.authService.register(data);
    }

    @Post('login')
    @AuthorizedPublic()
    @ApiOperation({ summary: 'Login' })
    async login(@Body() data: LoginDto): Promise<LoginResponse> {
        return await this.authService.login(data.email, data.password);
    }
}
