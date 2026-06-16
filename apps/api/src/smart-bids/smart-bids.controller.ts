import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
  Request,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SmartBidsService } from './smart-bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { RespondBidDto } from './dto/respond-bid.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Smart Bids')
@Controller('bids')
export class SmartBidsController {
  constructor(private readonly smartBidsService: SmartBidsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit a new bid request' })
  async create(@Request() req, @Body() dto: CreateBidDto) {
    return this.smartBidsService.create(req.user.id, dto);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my submitted bids' })
  async getMyBids(@Request() req) {
    return this.smartBidsService.getMyBids(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get bid detail' })
  async findOne(@Param('id') id: string) {
    return this.smartBidsService.findById(id);
  }

  @Post(':id/respond')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Company responds to a bid' })
  async respond(
    @Param('id') id: string,
    @Request() req,
    @Body() dto: RespondBidDto,
  ) {
    return this.smartBidsService.respond(id, req.user.id, dto);
  }

  @Put(':id/accept/:responseId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Accept a proposal' })
  async accept(
    @Param('id') id: string,
    @Param('responseId') responseId: string,
    @Request() req,
  ) {
    return this.smartBidsService.acceptResponse(id, responseId, req.user.id);
  }

  @Put(':id/shortlist/:responseId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Shortlist a proposal' })
  async shortlist(
    @Param('id') id: string,
    @Param('responseId') responseId: string,
    @Request() req,
  ) {
    return this.smartBidsService.shortlistResponse(id, responseId, req.user.id);
  }
}
