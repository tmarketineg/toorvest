import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class VerifyCompanyDto {
  @ApiProperty()
  @IsBoolean()
  isVerified: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;
}
