import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { keysToCamelCase } from '../common/transform.util';

interface FindAllParams {
  countryId?: string;
  projectType?: string;
  status?: string;
  sector?: string;
  page: number;
  limit: number;
}

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: FindAllParams) {
    const { countryId, projectType, status, sector, page, limit } = params;
    const skip = (page - 1) * limit;

    const where: any = {
      ...(countryId && { country_id: countryId }),
      ...(projectType && { project_type: projectType as any }),
      ...(status && { status: status as any }),
      ...(sector && { sector }),
    };

    const [projects, total] = await Promise.all([
      this.prisma.projects.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
          title: true,
          title_ar: true,
          description: true,
          description_ar: true,
          project_type: true,
          sector: true,
          status: true,
          images: true,
          budget: true,
          roi_percentage: true,
          location: true,
          created_at: true,
          country: { select: { id: true, name: true, name_ar: true, code: true, flag_url: true } },
        },
      }),
      this.prisma.projects.count({ where }),
    ]);

    return {
      projects: keysToCamelCase(projects),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    return keysToCamelCase(
      this.prisma.projects.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        title_ar: true,
        description: true,
        description_ar: true,
        project_type: true,
        sector: true,
        status: true,
        images: true,
        budget: true,
        roi_percentage: true,
        location: true,
        contact_info: true,
        created_at: true,
        country: {
          select: { id: true, name: true, name_ar: true, code: true, flag_url: true },
        },
      },
      }),
    );
  }
}
