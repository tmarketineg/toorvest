import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class RespondBidDto {
  @ApiProperty({ example: 'We can provide high-quality office furniture...' })
  @IsString()
  proposalText: string;

  @ApiPropertyOptional({ example: 12000 })
  @IsOptional()
  @IsNumber()
  proposedBudget?: number;

  @ApiPropertyOptional({ example: '4 weeks' })
  @IsOptional()
  @IsString()
  proposedTimeline?: string;
}
