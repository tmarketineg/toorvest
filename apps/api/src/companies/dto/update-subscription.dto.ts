import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateSubscriptionDto {
  @ApiProperty({ enum: ['BASIC', 'PREMIUM', 'ENTERPRISE'] })
  @IsEnum(['BASIC', 'PREMIUM', 'ENTERPRISE'] as const)
  tier: 'BASIC' | 'PREMIUM' | 'ENTERPRISE';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  paymentId?: string;
}
