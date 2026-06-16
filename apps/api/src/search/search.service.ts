import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { keysToCamelCase } from '../common/transform.util';

type SearchType = 'articles' | 'companies' | 'projects' | 'countries';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(query: string, type?: SearchType) {
    const results: any = {};

    if (!type || type === 'countries') {
      results.countries = await this.prisma.countries.findMany({
        where: {
          is_active: true,
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { name_ar: { contains: query, mode: 'insensitive' } },
            { code: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: 10,
        select: {
          id: true,
          name: true,
          name_ar: true,
          code: true,
          flag_url: true,
        },
      });
    }

    if (!type || type === 'articles') {
      results.articles = await this.prisma.articles.findMany({
        where: {
          status: 'PUBLISHED',
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { title_ar: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
            { tags: { has: query } },
          ],
        },
        take: 10,
        select: {
          id: true,
          title: true,
          title_ar: true,
          slug: true,
          excerpt: true,
          cover_image: true,
        },
      });
    }

    if (!type || type === 'companies') {
      results.companies = await this.prisma.companies.findMany({
        where: {
          is_active: true,
          OR: [
            { company_name: { contains: query, mode: 'insensitive' } },
            { company_name_ar: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { service_categories: { has: query } },
          ],
        },
        take: 10,
        select: {
          id: true,
          company_name: true,
          company_name_ar: true,
          logo_url: true,
          service_categories: true,
          is_verified: true,
        },
      });
    }

    if (!type || type === 'projects') {
      results.projects = await this.prisma.projects.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { title_ar: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: 10,
        select: {
          id: true,
          title: true,
          title_ar: true,
          project_type: true,
          status: true,
          budget: true,
          location: true,
        },
      });
    }

    return keysToCamelCase(results);
  }
}
