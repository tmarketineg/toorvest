import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiProperty({ example: 'United Arab Emirates' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'الإمارات العربية المتحدة' })
  @IsString()
  nameAr: string;

  @ApiProperty({ example: 'ae' })
  @IsString()
  code: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  descriptionAr?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  sortOrder?: number;
}

export class UpdateCountryDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nameAr?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  descriptionAr?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  flagUrl?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  sortOrder?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class CreateProjectDto {
  @ApiProperty({ example: 'Smart City Initiative' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'مبادرة المدينة الذكية' })
  @IsString()
  titleAr: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  descriptionAr?: string;

  @ApiProperty({ enum: ['GOVERNMENTAL', 'INDIVIDUAL'] })
  @IsString()
  projectType: string;

  @ApiProperty({ enum: ['REAL_ESTATE', 'AGRICULTURE', 'INDUSTRY', 'OTHER'] })
  @IsString()
  sector: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  countryId?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  budget?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  roiPercentage?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  location?: string;
}

export class UpdateProjectDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  titleAr?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  descriptionAr?: string;

  @ApiPropertyOptional({ enum: ['OFF_PLAN', 'UNDER_CONSTRUCTION', 'SECONDARY_MARKET', 'OPERATIONAL'] })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  budget?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  roiPercentage?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  location?: string;
}
