import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  fullName: string;

  @ApiPropertyOptional({ example: '+1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ enum: ['INVESTOR', 'COMPANY'], default: 'INVESTOR' })
  @IsOptional()
  @IsEnum(['INVESTOR', 'COMPANY'] as const)
  role?: 'INVESTOR' | 'COMPANY';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  countryId?: string;
}
