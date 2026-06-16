import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ChatDto {
  @ApiProperty({ example: 'What investment opportunities are available in UAE?' })
  @IsString()
  message: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  countryId?: string;

  @ApiPropertyOptional({ example: 'real_estate' })
  @IsOptional()
  @IsString()
  sector?: string;
}
