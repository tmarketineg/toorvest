import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateBidDto {
  @ApiProperty({ example: 'Looking for office furniture supplier' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Need modern office furniture for 50 employees' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  countryId?: string;

  @ApiPropertyOptional({ example: 5000 })
  @IsOptional()
  @IsNumber()
  budgetMin?: number;

  @ApiPropertyOptional({ example: 15000 })
  @IsOptional()
  @IsNumber()
  budgetMax?: number;

  @ApiPropertyOptional({ example: '2024-12-31' })
  @IsOptional()
  @IsDateString()
  deadline?: string;
}
