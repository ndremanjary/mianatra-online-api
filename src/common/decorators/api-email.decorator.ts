import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export function ApiEmailProperty() {
  return applyDecorators(
    ApiProperty({ example: 'user@example.com', format: 'email' }),
    IsEmail(),
    IsNotEmpty(),
  );
}
