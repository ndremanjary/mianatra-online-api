import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiEmailProperty } from '../../../common/decorators/api-email.decorator';

export class LoginDto {
  @ApiEmailProperty()
  email!: string;

  @ApiProperty({ example: 'Passw0rd!' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
