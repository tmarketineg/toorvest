import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) return obj.map(toCamelCase);
  if (obj && typeof obj === 'object' && !(obj instanceof Date)) {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const camel = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
      result[camel] = toCamelCase(value);
    }
    return result;
  }
  return obj;
}

function json(data: any, status = 200) {
  return NextResponse.json(toCamelCase(data), { status });
}

async function handleGET(path: string, req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const page = parseInt(sp.get('page') || '1');
  const limit = Math.min(parseInt(sp.get('limit') || '20'), 100);
  const skip = (page - 1) * limit;

  switch (path) {
    case 'countries': {
      return json(await prisma.countries.findMany({ orderBy: { name: 'asc' } }));
    }
    case 'countries/[code]': {
      const code = path.split('/').pop()!;
      const c = await prisma.countries.findFirst({ where: { code: code.toUpperCase() } });
      return c ? json(c) : json({ message: 'Not found' }, 404);
    }
    case 'categories': {
      return json(await prisma.categories.findMany({ orderBy: { name: 'asc' } }));
    }
    case 'articles': {
      const where: any = {};
      if (sp.get('countryId')) where.country_id = sp.get('countryId');
      if (sp.get('categoryId')) where.category_id = sp.get('categoryId');
      if (sp.get('status')) where.status = sp.get('status');
      const [data, total] = await Promise.all([
        prisma.articles.findMany({
          where, skip, take: limit, orderBy: { published_at: 'desc' },
          include: {
            author: { select: { id: true, full_name: true, avatar_url: true } },
            country: { select: { id: true, name: true, code: true } },
            category: { select: { id: true, name: true, slug: true } },
          },
        }),
        prisma.articles.count({ where }),
      ]);
      return json({ data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } });
    }
    case 'articles/search': {
      const q = sp.get('q');
      if (!q) return json({ message: 'q is required' }, 400);
      return json(await prisma.articles.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { title_ar: { contains: q, mode: 'insensitive' } },
            { excerpt: { contains: q, mode: 'insensitive' } },
          ],
          status: 'PUBLISHED',
        },
        take: 20,
        include: {
          author: { select: { id: true, full_name: true } },
          country: { select: { id: true, name: true, code: true } },
          category: { select: { id: true, name: true, slug: true } },
        },
      }));
    }
    case 'companies': {
      const [data, total] = await Promise.all([
        prisma.companies.findMany({
          skip, take: limit, orderBy: { created_at: 'desc' },
          include: { country: { select: { id: true, name: true, code: true } } },
        }),
        prisma.companies.count(),
      ]);
      return json({ data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } });
    }
    case 'projects': {
      const [data, total] = await Promise.all([
        prisma.projects.findMany({
          skip, take: limit, orderBy: { created_at: 'desc' },
          include: { country: { select: { id: true, name: true, code: true } } },
        }),
        prisma.projects.count(),
      ]);
      return json({ data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } });
    }
    case 'smart-bids': {
      return json(await prisma.smart_bids.findMany({
        orderBy: { created_at: 'desc' },
        include: {
          client: { select: { id: true, full_name: true, email: true } },
          category: { select: { id: true, name: true } },
          country: { select: { id: true, name: true, code: true } },
          responses: { include: { company: { select: { id: true, company_name: true, logo_url: true, is_verified: true } } } },
        },
      }));
    }
    case 'emirates': {
      return json(await prisma.emirates.findMany({ orderBy: { name: 'asc' } }));
    }
    case 'tourism/activities': {
      const where: any = {};
      if (sp.get('countryId')) where.country_id = sp.get('countryId');
      return json(await prisma.tourism_activities.findMany({
        where, orderBy: { name: 'asc' },
        include: { country: { select: { id: true, name: true, code: true } } },
      }));
    }
    case 'tourism/tips': {
      return json(await prisma.tips.findMany({ orderBy: { title: 'asc' } }));
    }
    case 'search': {
      const q = sp.get('q');
      if (!q) return json({ articles: [], companies: [], projects: [] });
      const [articles, companies, projects] = await Promise.all([
        prisma.articles.findMany({
          where: { OR: [{ title: { contains: q, mode: 'insensitive' } }, { excerpt: { contains: q, mode: 'insensitive' } }], status: 'PUBLISHED' },
          take: 10,
        }),
        prisma.companies.findMany({
          where: { OR: [{ company_name: { contains: q, mode: 'insensitive' } }, { description: { contains: q, mode: 'insensitive' } }] },
          take: 10,
        }),
        prisma.projects.findMany({
          where: { OR: [{ title: { contains: q, mode: 'insensitive' } }, { description: { contains: q, mode: 'insensitive' } }] },
          take: 10,
        }),
      ]);
      return json({ articles, companies, projects });
    }
    default:
      return json({ message: 'Not found' }, 404);
  }
}

function extractPath(pathname: string): string {
  return pathname.replace(/^\/api\//, '');
}

export async function GET(req: NextRequest) {
  try {
    const path = extractPath(req.nextUrl.pathname);
    if (!path || path === '') return json({ status: 'ok', message: 'Toorvest API is running' });
    return await handleGET(path, req);
  } catch (e: any) {
    return json({ message: e.message || 'Internal server error' }, 500);
  }
}
