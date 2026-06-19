import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { VerifyCompanyDto } from './dto/verify-company.dto';
import { CreateCountryDto, UpdateCountryDto, CreateProjectDto, UpdateProjectDto } from './dto/admin-content.dto';
import { UpdateSubscriptionDto } from '../companies/dto/update-subscription.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { CompaniesService } from '../companies/companies.service';
import { Role } from '@prisma/client';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles(Role.ADMIN)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly companiesService: CompaniesService,
  ) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get admin dashboard stats' })
  async getDashboard() {
    return this.adminService.getDashboardStats();
  }

  @Get('users')
  @ApiOperation({ summary: 'List all users' })
  async getUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getUsers(
      page ? parseInt(page, 10) : 1,
      limit ? Math.min(parseInt(limit, 10), 100) : 20,
    );
  }

  @Put('users/:id/role')
  @ApiOperation({ summary: 'Update user role' })
  async updateUserRole(
    @Param('id') id: string,
    @Body('role') role: Role,
  ) {
    return this.adminService.updateUserRole(id, role);
  }

  @Put('companies/:id/verify')
  @ApiOperation({ summary: 'Verify or unverify a company' })
  async verifyCompany(
    @Param('id') id: string,
    @Body() dto: VerifyCompanyDto,
  ) {
    return this.adminService.verifyCompany(id, dto.isVerified, dto.reason);
  }

  @Put('companies/:id/subscription')
  @ApiOperation({ summary: 'Manually update a company subscription tier (admin only)' })
  async updateCompanySubscription(
    @Param('id') id: string,
    @Body() dto: UpdateSubscriptionDto,
  ) {
    return this.companiesService.updateSubscription(id, dto);
  }

  // ==================== Country CRUD ====================

  @Post('countries')
  @ApiOperation({ summary: 'Create a country' })
  async createCountry(@Body() dto: CreateCountryDto) {
    return this.adminService.createCountry(dto);
  }

  @Put('countries/:id')
  @ApiOperation({ summary: 'Update a country' })
  async updateCountry(@Param('id') id: string, @Body() dto: UpdateCountryDto) {
    return this.adminService.updateCountry(id, dto);
  }

  @Delete('countries/:id')
  @ApiOperation({ summary: 'Delete a country' })
  async removeCountry(@Param('id') id: string) {
    return this.adminService.removeCountry(id);
  }

  // ==================== Project CRUD ====================

  @Post('projects')
  @ApiOperation({ summary: 'Create a project' })
  async createProject(@Body() dto: CreateProjectDto) {
    return this.adminService.createProject(dto);
  }

  @Put('projects/:id')
  @ApiOperation({ summary: 'Update a project' })
  async updateProject(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.adminService.updateProject(id, dto);
  }

  @Delete('projects/:id')
  @ApiOperation({ summary: 'Delete a project' })
  async removeProject(@Param('id') id: string) {
    return this.adminService.removeProject(id);
  }
}
