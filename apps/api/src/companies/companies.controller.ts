import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiOperation({ summary: 'List companies with filters' })
  @ApiQuery({ name: 'countryId', required: false })
  @ApiQuery({ name: 'serviceType', required: false, enum: ['LOCAL', 'INTERNATIONAL'] })
  @ApiQuery({ name: 'tier', required: false })
  @ApiQuery({ name: 'verified', required: false, type: Boolean })
  async findAll(
    @Query('countryId') countryId?: string,
    @Query('serviceType') serviceType?: string,
    @Query('tier') tier?: string,
    @Query('verified') verified?: string,
  ) {
    return this.companiesService.findAll({
      countryId,
      serviceType: serviceType as any,
      tier: tier as any,
      verified: verified === 'true' ? true : verified === 'false' ? false : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get company detail' })
  async findOne(@Param('id') id: string) {
    const company = await this.companiesService.findById(id);
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register a new company' })
  async create(@Request() req, @Body() dto: CreateCompanyDto) {
    return this.companiesService.create(req.user.id, dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update company (owner only)' })
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() dto: UpdateCompanyDto,
  ) {
    const company = await this.companiesService.findById(id) as any;
    if (!company) throw new NotFoundException('Company not found');
    if (company.userId !== req.user.id) {
      throw new ForbiddenException('You can only update your own company');
    }
    return this.companiesService.update(id, dto);
  }

  @Put(':id/subscription')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update company subscription tier (owner only)' })
  async updateSubscription(
    @Param('id') id: string,
    @Request() req,
    @Body() dto: UpdateSubscriptionDto,
  ) {
    const company = await this.companiesService.findById(id) as any;
    if (!company) throw new NotFoundException('Company not found');
    if (company.userId !== req.user.id) {
      throw new ForbiddenException('You can only update your own subscription');
    }
    return this.companiesService.updateSubscription(id, dto);
  }

  @Get(':id/bids')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get incoming bids for a company' })
  async getBids(@Param('id') id: string, @Request() req) {
    const company = await this.companiesService.findById(id) as any;
    if (!company) throw new NotFoundException('Company not found');
    if (company.userId !== req.user.id) {
      throw new ForbiddenException('You can only view bids for your own company');
    }
    return this.companiesService.getBids(id);
  }
}
