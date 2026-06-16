import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import { CreateCountryDto, UpdateCountryDto, CreateProjectDto, UpdateProjectDto } from './dto/admin-content.dto';
import { keysToCamelCase } from '../common/transform.util';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async verifyCompany(companyId: string, isVerified: boolean, reason?: string) {
    const company = await this.prisma.companies.findUnique({
      where: { id: companyId },
    });
    if (!company) throw new NotFoundException('Company not found');

    return keysToCamelCase(
      this.prisma.companies.update({
        where: { id: companyId },
        data: {
          is_verified: isVerified,
        },
        select: {
          id: true,
          company_name: true,
          is_verified: true,
        },
      }),
    );
  }

  async getUsers(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      this.prisma.users.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
          email: true,
          full_name: true,
          role: true,
          is_verified: true,
          created_at: true,
          country: { select: { id: true, name: true, code: true } },
        },
      }),
      this.prisma.users.count(),
    ]);

    return {
      users: keysToCamelCase(users),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async updateUserRole(userId: string, role: Role) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('User not found');

    return keysToCamelCase(
      this.prisma.users.update({
        where: { id: userId },
        data: { role },
        select: {
          id: true,
          email: true,
          full_name: true,
          role: true,
        },
      }),
    );
  }

  async getDashboardStats() {
    const [
      totalUsers,
      totalCompanies,
      totalArticles,
      totalBids,
      totalProjects,
      verifiedCompanies,
      pendingBids,
    ] = await Promise.all([
      this.prisma.users.count(),
      this.prisma.companies.count(),
      this.prisma.articles.count(),
      this.prisma.smart_bids.count(),
      this.prisma.projects.count(),
      this.prisma.companies.count({ where: { is_verified: true } }),
      this.prisma.smart_bids.count({ where: { status: 'PENDING' } }),
    ]);

    return {
      totalUsers,
      totalCompanies,
      totalArticles,
      totalBids,
      totalProjects,
      verifiedCompanies,
      pendingBids,
    };
  }

  // ==================== Country CRUD ====================

  async createCountry(dto: CreateCountryDto) {
    const slug = dto.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    return keysToCamelCase(
      this.prisma.countries.create({
        data: {
          name: dto.name,
          name_ar: dto.nameAr,
          code: dto.code,
          description: dto.description,
          description_ar: dto.descriptionAr,
          sort_order: dto.sortOrder || 0,
        },
        select: { id: true, name: true, code: true, sort_order: true },
      }),
    );
  }

  async updateCountry(id: string, dto: UpdateCountryDto) {
    const country = await this.prisma.countries.findUnique({ where: { id } });
    if (!country) throw new NotFoundException('Country not found');

    const data: any = {};
    if (dto.name) data.name = dto.name;
    if (dto.nameAr) data.name_ar = dto.nameAr;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.descriptionAr !== undefined) data.description_ar = dto.descriptionAr;
    if (dto.flagUrl !== undefined) data.flag_url = dto.flagUrl;
    if (dto.sortOrder !== undefined) data.sort_order = dto.sortOrder;
    if (dto.isActive !== undefined) data.is_active = dto.isActive;

    return keysToCamelCase(
      this.prisma.countries.update({
        where: { id },
        data,
        select: { id: true, name: true, code: true, is_active: true },
      }),
    );
  }

  async removeCountry(id: string) {
    const country = await this.prisma.countries.findUnique({ where: { id } });
    if (!country) throw new NotFoundException('Country not found');
    return keysToCamelCase(
      this.prisma.countries.delete({
        where: { id },
        select: { id: true, name: true },
      }),
    );
  }

  // ==================== Project CRUD ====================

  async createProject(dto: CreateProjectDto) {
    return keysToCamelCase(
      this.prisma.projects.create({
        data: {
          title: dto.title,
          title_ar: dto.titleAr,
          description: dto.description,
          description_ar: dto.descriptionAr,
          project_type: dto.projectType as any,
          sector: dto.sector as any,
          country_id: dto.countryId,
          budget: dto.budget,
          roi_percentage: dto.roiPercentage,
          location: dto.location,
        },
        select: { id: true, title: true, project_type: true, sector: true, status: true },
      }),
    );
  }

  async updateProject(id: string, dto: UpdateProjectDto) {
    const project = await this.prisma.projects.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');

    const data: any = {};
    if (dto.title) data.title = dto.title;
    if (dto.titleAr) data.title_ar = dto.titleAr;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.descriptionAr !== undefined) data.description_ar = dto.descriptionAr;
    if (dto.status) data.status = dto.status;
    if (dto.budget !== undefined) data.budget = dto.budget;
    if (dto.roiPercentage !== undefined) data.roi_percentage = dto.roiPercentage;
    if (dto.location !== undefined) data.location = dto.location;

    return keysToCamelCase(
      this.prisma.projects.update({
        where: { id },
        data,
        select: { id: true, title: true, status: true },
      }),
    );
  }

  async removeProject(id: string) {
    const project = await this.prisma.projects.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    return keysToCamelCase(
      this.prisma.projects.delete({
        where: { id },
        select: { id: true, title: true },
      }),
    );
  }
}
