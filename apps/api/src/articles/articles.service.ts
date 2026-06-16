import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { keysToCamelCase } from '../common/transform.util';

interface FindAllParams {
  page: number;
  limit: number;
  countryId?: string;
  categoryId?: string;
  module?: string;
  status?: string;
}

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: FindAllParams) {
    const { page, limit, countryId, categoryId, module, status } = params;
    const skip = (page - 1) * limit;

    const where: any = {
      ...(status ? { status: status as any } : { status: 'PUBLISHED' }),
      ...(countryId && { country_id: countryId }),
      ...(categoryId && { category_id: categoryId }),
      ...(module && { module: module as any }),
    };

    const [articles, total] = await Promise.all([
      this.prisma.articles.findMany({
        where,
        skip,
        take: limit,
        orderBy: { published_at: 'desc' },
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
          author: { select: { id: true, full_name: true, avatar_url: true } },
          country: { select: { id: true, name: true, code: true, flag_url: true } },
          category: { select: { id: true, name: true, name_ar: true, slug: true } },
        },
      }),
      this.prisma.articles.count({ where }),
    ]);

    return {
      articles: keysToCamelCase(articles),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async search(query: string) {
    const results = await this.prisma.articles.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { title_ar: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
          { tags: { has: query } },
        ],
      },
      take: 20,
      orderBy: { published_at: 'desc' },
      select: {
        id: true,
        title: true,
        title_ar: true,
        slug: true,
        excerpt: true,
        cover_image: true,
        tags: true,
        published_at: true,
      },
    });
    return keysToCamelCase(results);
  }

  async findBySlug(slug: string) {
    const article = await this.prisma.articles.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        title_ar: true,
        slug: true,
        content: true,
        content_ar: true,
        excerpt: true,
        excerpt_ar: true,
        cover_image: true,
        tags: true,
        status: true,
        published_at: true,
        created_at: true,
        author: {
          select: { id: true, full_name: true, avatar_url: true },
        },
        country: {
          select: { id: true, name: true, name_ar: true, code: true, flag_url: true },
        },
        category: {
          select: { id: true, name: true, name_ar: true, slug: true },
        },
      },
    });
    return keysToCamelCase(article);
  }

  async findById(id: string) {
    const article = await this.prisma.articles.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        title_ar: true,
        slug: true,
        content: true,
        content_ar: true,
        excerpt: true,
        excerpt_ar: true,
        cover_image: true,
        tags: true,
        status: true,
        published_at: true,
        created_at: true,
        author: { select: { id: true, full_name: true, avatar_url: true } },
        country: { select: { id: true, name: true, code: true } },
        category: { select: { id: true, name: true, slug: true } },
      },
    });
    if (!article) throw new NotFoundException('Article not found');
    return keysToCamelCase(article);
  }

  async create(authorId: string, dto: CreateArticleDto) {
    const slug = dto.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const existing = await this.prisma.articles.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    return this.prisma.articles.create({
      data: {
        title: dto.title,
        title_ar: dto.titleAr,
        slug: finalSlug,
        content: dto.content,
        content_ar: dto.contentAr,
        excerpt: dto.excerpt,
        excerpt_ar: dto.excerptAr,
        cover_image: dto.coverImage,
        author_id: authorId,
        country_id: dto.countryId,
        category_id: dto.categoryId,
        module: dto.module as any,
        tags: dto.tags || [],
        status: 'DRAFT',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        created_at: true,
      },
    });
  }

  async update(id: string, dto: UpdateArticleDto) {
    await this.findById(id);

    const data: any = {};
    if (dto.title) data.title = dto.title;
    if (dto.titleAr) data.title_ar = dto.titleAr;
    if (dto.content) data.content = dto.content;
    if (dto.contentAr) data.content_ar = dto.contentAr;
    if (dto.excerpt !== undefined) data.excerpt = dto.excerpt;
    if (dto.excerptAr !== undefined) data.excerpt_ar = dto.excerptAr;
    if (dto.coverImage !== undefined) data.cover_image = dto.coverImage;
    if (dto.countryId !== undefined) data.country_id = dto.countryId;
    if (dto.categoryId !== undefined) data.category_id = dto.categoryId;
    if (dto.status) data.status = dto.status;
    if (dto.tags) data.tags = dto.tags;

    if (dto.status === 'PUBLISHED') {
      data.published_at = new Date();
    }

    return this.prisma.articles.update({
      where: { id },
      data,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        published_at: true,
      },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.articles.delete({
      where: { id },
      select: { id: true, title: true },
    });
  }
}
