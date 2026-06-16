import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
  IsNumber,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Acme Corp' })
  @IsString()
  companyName: string;

  @ApiProperty({ example: 'شركة أكمي' })
  @IsString()
  companyNameAr: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descriptionAr?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  countryId?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  serviceCategories?: string[];

  @ApiPropertyOptional({ enum: ['LOCAL', 'INTERNATIONAL'] })
  @IsOptional()
  @IsEnum(['LOCAL', 'INTERNATIONAL'] as const)
  serviceType?: 'LOCAL' | 'INTERNATIONAL';

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  budgetRangeMin?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  budgetRangeMax?: number;
}
