import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { keysToCamelCase } from '../common/transform.util';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return keysToCamelCase(
      this.prisma.countries.findMany({
        where: { is_active: true },
        orderBy: { sort_order: 'asc' },
        select: {
          id: true,
          name: true,
          name_ar: true,
          code: true,
          flag_url: true,
          description: true,
          description_ar: true,
          pavilion_config: true,
        },
      }),
    );
  }

  async findById(id: string) {
    return keysToCamelCase(
      this.prisma.countries.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          name_ar: true,
          code: true,
          flag_url: true,
          description: true,
          description_ar: true,
          pavilion_config: true,
          _count: {
            select: {
              companies: true,
              projects: true,
              articles: true,
            },
          },
        },
      }),
    );
  }

  async findByCode(code: string) {
    return keysToCamelCase(
      this.prisma.countries.findUnique({
        where: { code },
        select: {
          id: true,
          name: true,
          name_ar: true,
          code: true,
          flag_url: true,
          description: true,
          description_ar: true,
          pavilion_config: true,
          _count: {
            select: {
              companies: true,
              projects: true,
              articles: true,
            },
          },
        },
      }),
    );
  }

  async getEmirates(countryId: string) {
    return keysToCamelCase(
      this.prisma.emirates.findMany({
        where: { country_id: countryId },
        orderBy: { sort_order: 'asc' },
      }),
    );
  }

  async getTips(countryId: string) {
    return keysToCamelCase(
      this.prisma.tips.findMany({
        where: { country_id: countryId },
        orderBy: { sort_order: 'asc' },
      }),
    );
  }

  async getTourismActivities(countryId: string) {
    return keysToCamelCase(
      this.prisma.tourism_activities.findMany({
        where: { country_id: countryId },
        orderBy: { sort_order: 'asc' },
        include: {
          emirate: { select: { id: true, name: true, name_ar: true } },
        },
      }),
    );
  }

  async getArticles(countryId: string) {
    return keysToCamelCase(
      this.prisma.articles.findMany({
        where: {
          country_id: countryId,
          status: 'PUBLISHED',
        },
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
          title: true,
          title_ar: true,
          slug: true,
          excerpt: true,
          excerpt_ar: true,
          cover_image: true,
          tags: true,
          published_at: true,
        },
      }),
    );
  }
}
