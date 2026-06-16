import { IsString, IsOptional, IsEnum, IsArray, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ example: 'Starting a Business in Dubai' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'بدء أعمال في دبي' })
  @IsString()
  titleAr: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  excerpt?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  excerptAr?: string;

  @ApiProperty({ example: 'Full article content...' })
  @IsString()
  content: string;

  @ApiProperty({ example: 'محتوى المقال الكامل...' })
  @IsString()
  contentAr: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  coverImage?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  countryId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ enum: ['BUSINESS_HUB', 'INVESTMENT_TOURISM'] })
  @IsEnum(['BUSINESS_HUB', 'INVESTMENT_TOURISM'])
  module: string;

  @ApiPropertyOptional({ example: ['business', 'dubai'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}

export class UpdateArticleDto {
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
  excerpt?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  excerptAr?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contentAr?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  coverImage?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  countryId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({ enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'] })
  @IsEnum(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
  @IsOptional()
  status?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
