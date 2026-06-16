import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SofiaService } from './sofia.service';
import { ChatDto } from './dto/chat.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Sofia AI')
@Controller('sofia')
export class SofiaController {
  constructor(private readonly sofiaService: SofiaService) {}

  @Post('chat')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send message to Sofia AI assistant' })
  async chat(@Request() req, @Body() dto: ChatDto) {
    return this.sofiaService.chat(req.user.id, dto);
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get conversation history' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getHistory(@Request() req, @Query('limit') limit?: string) {
    return this.sofiaService.getHistory(req.user.id, limit ? parseInt(limit, 10) : 20);
  }
}
