import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { keysToCamelCase } from '../common/transform.util';

interface FindAllParams {
  countryId?: string;
  serviceType?: string;
  tier?: string;
  verified?: boolean;
}

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: FindAllParams) {
    const where: any = {
      is_active: true,
      ...(params.countryId && { country_id: params.countryId }),
      ...(params.serviceType && { service_type: params.serviceType }),
      ...(params.tier && { subscription_tier: params.tier }),
      ...(params.verified !== undefined && { is_verified: params.verified }),
    };

    return keysToCamelCase(
      this.prisma.companies.findMany({
        where,
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
          company_name: true,
          company_name_ar: true,
          logo_url: true,
          description: true,
          description_ar: true,
          service_categories: true,
          service_type: true,
          is_verified: true,
          subscription_tier: true,
          country: { select: { id: true, name: true, code: true, flag_url: true } },
          _count: { select: { smart_bid_responses: true } },
        },
      }),
    );
  }

  async findById(id: string) {
    return keysToCamelCase(
      this.prisma.companies.findUnique({
        where: { id },
        select: {
          id: true,
          user_id: true,
          company_name: true,
          company_name_ar: true,
          logo_url: true,
          description: true,
          description_ar: true,
          service_categories: true,
          service_type: true,
          budget_range_min: true,
          budget_range_max: true,
          is_verified: true,
          subscription_tier: true,
          created_at: true,
          country: { select: { id: true, name: true, code: true, flag_url: true } },
        },
      }),
    );
  }

  async create(userId: string, dto: CreateCompanyDto) {
    const existing = await this.prisma.companies.findUnique({
      where: { user_id: userId },
    });

    if (existing) {
      throw new ConflictException('You already have a registered company');
    }

    return this.prisma.companies.create({
      data: {
        user_id: userId,
        company_name: dto.companyName,
        company_name_ar: dto.companyNameAr,
        logo_url: dto.logoUrl,
        description: dto.description,
        description_ar: dto.descriptionAr,
        country_id: dto.countryId,
        service_categories: dto.serviceCategories || [],
        service_type: dto.serviceType,
        budget_range_min: dto.budgetRangeMin,
        budget_range_max: dto.budgetRangeMax,
      },
      select: {
        id: true,
        company_name: true,
        company_name_ar: true,
        logo_url: true,
        description: true,
        service_categories: true,
        service_type: true,
        is_verified: true,
        subscription_tier: true,
      },
    });
  }

  async update(id: string, dto: UpdateCompanyDto) {
    const data: any = {};
    if (dto.companyName) data.company_name = dto.companyName;
    if (dto.companyNameAr) data.company_name_ar = dto.companyNameAr;
    if (dto.logoUrl !== undefined) data.logo_url = dto.logoUrl;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.descriptionAr !== undefined) data.description_ar = dto.descriptionAr;
    if (dto.countryId !== undefined) data.country_id = dto.countryId;
    if (dto.serviceCategories) data.service_categories = dto.serviceCategories;
    if (dto.serviceType) data.service_type = dto.serviceType;
    if (dto.budgetRangeMin !== undefined) data.budget_range_min = dto.budgetRangeMin;
    if (dto.budgetRangeMax !== undefined) data.budget_range_max = dto.budgetRangeMax;

    return this.prisma.companies.update({
      where: { id },
      data,
      select: {
        id: true,
        company_name: true,
        company_name_ar: true,
        logo_url: true,
        description: true,
        service_categories: true,
        service_type: true,
        is_verified: true,
        subscription_tier: true,
      },
    });
  }

  getSubscriptionLimits(tier: string) {
    const limits = {
      BASIC: { maxListings: 5, maxBidsPerMonth: 10, maxPhotos: 3, verified: false },
      PREMIUM: { maxListings: 50, maxBidsPerMonth: 100, maxPhotos: 20, verified: true },
      ENTERPRISE: { maxListings: -1, maxBidsPerMonth: -1, maxPhotos: -1, verified: true },
    };
    return limits[tier] || limits.BASIC;
  }

  async checkBidLimit(userId: string) {
    const company = await this.prisma.companies.findUnique({
      where: { user_id: userId },
    });
    if (!company) throw new NotFoundException('Company not found');

    const limits = this.getSubscriptionLimits(company.subscription_tier);
    if (limits.maxBidsPerMonth === -1) return company;

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const bidCount = await this.prisma.smart_bid_responses.count({
      where: {
        company_id: company.id,
        created_at: { gte: startOfMonth },
      },
    });

    if (bidCount >= limits.maxBidsPerMonth) {
      throw new ForbiddenException(
        `Monthly bid limit reached (${limits.maxBidsPerMonth}). Upgrade your subscription.`,
      );
    }

    return company;
  }

  async updateSubscription(id: string, dto: UpdateSubscriptionDto) {
    const company = await this.prisma.companies.findUnique({
      where: { id },
    });
    if (!company) throw new NotFoundException('Company not found');

    const limits = this.getSubscriptionLimits(dto.tier);

    return this.prisma.companies.update({
      where: { id },
      data: {
        subscription_tier: dto.tier,
        is_verified: limits.verified,
      },
      select: {
        id: true,
        company_name: true,
        subscription_tier: true,
        is_verified: true,
      },
    });
  }

  async getBids(companyId: string) {
    return this.prisma.smart_bid_responses.findMany({
      where: { company_id: companyId },
      orderBy: { created_at: 'desc' },
      include: {
        bid: {
          select: {
            id: true,
            title: true,
            description: true,
            budget_min: true,
            budget_max: true,
            deadline: true,
            status: true,
            client: {
              select: { id: true, full_name: true, email: true },
            },
            category: {
              select: { id: true, name: true, name_ar: true },
            },
            country: {
              select: { id: true, name: true, code: true },
            },
          },
        },
      },
    });
  }
}
