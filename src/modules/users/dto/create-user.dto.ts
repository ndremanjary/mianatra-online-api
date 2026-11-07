import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiEmailProperty } from '../../../common/decorators/api-email.decorator';

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

export class CreateUserDto {
    @ApiEmailProperty()
    email!: string;

    @ApiProperty({
        example: 'Passw0rd!',
        minLength: 8,
        maxLength: 32,
        description:
            '8 to 32 characters, with a lowercase letter, an uppercase letter, a digit, and a special character (@$!%*?&).',
    })
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    @Matches(PASSWORD_PATTERN)
    password!: string;
}
