import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('CRITICAL: JWT_SECRET environment variable is not set');
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 100;
const RATE_WINDOW = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

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

function verifyToken(token: string): { sub: string; email: string; role: string } | null {
  if (!JWT_SECRET) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as { sub: string; email: string; role: string };
  } catch {
    return null;
  }
}

function extractToken(req: NextRequest): string | null {
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.slice(7);
  return null;
}

const PUBLIC_PATHS = [
  'countries',
  'categories',
  'articles',
  'articles/search',
  'companies',
  'projects',
  'emirates',
  'tourism/activities',
  'tourism/tips',
  'search',
  'smart-bids',
];

function isPublicPath(path: string): boolean {
  return PUBLIC_PATHS.some(p => path === p || path.startsWith(p + '/'));
}

const ADMIN_PATHS = ['admin'];

function isAdminPath(path: string): boolean {
  return ADMIN_PATHS.some(p => path.startsWith(p));
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

async function handlePOST(path: string, req: NextRequest) {
  const body = await req.json();

  if (path === 'auth/login') {
    const { email, password } = body;
    if (!email || !password) return json({ message: 'Email and password required' }, 400);
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) return json({ message: 'Invalid credentials' }, 401);
    const bcrypt = await import('bcryptjs');
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return json({ message: 'Invalid credentials' }, 401);
    const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET!, { expiresIn: '7d' });
    return json({
      user: { id: user.id, email: user.email, fullName: user.full_name, role: user.role },
      token,
    });
  }

  if (path === 'auth/register') {
    const { email, password, fullName, phone, role, countryId } = body;
    if (!email || !password || !fullName) return json({ message: 'Email, password, and fullName required' }, 400);
    const existing = await prisma.users.findUnique({ where: { email } });
    if (existing) return json({ message: 'Email already registered' }, 409);
    const bcrypt = await import('bcryptjs');
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.users.create({
      data: {
        email,
        password_hash: passwordHash,
        full_name: fullName,
        phone,
        role: role || 'INVESTOR',
        country_id: countryId,
      },
    });
    const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET!, { expiresIn: '7d' });
    return json({
      user: { id: user.id, email: user.email, fullName: user.full_name, role: user.role },
      token,
    });
  }

  if (path === 'auth/forgot-password') {
    const { email } = body;
    if (!email) return json({ message: 'Email required' }, 400);
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) return json({ message: 'If account exists, reset link sent' });
    const resetToken = jwt.sign({ sub: user.id, type: 'password_reset' }, JWT_SECRET!, { expiresIn: '1h' });
    return json({ message: 'If account exists, reset link sent', resetToken });
  }

  if (path === 'auth/reset-password') {
    const { token: resetToken, newPassword } = body;
    if (!resetToken || !newPassword) return json({ message: 'Token and newPassword required' }, 400);
    try {
      const payload = jwt.verify(resetToken, JWT_SECRET!) as { sub: string; type: string };
      if (payload.type !== 'password_reset') return json({ message: 'Invalid token' }, 400);
      const bcrypt = await import('bcryptjs');
      const passwordHash = await bcrypt.hash(newPassword, 12);
      await prisma.users.update({ where: { id: payload.sub }, data: { password_hash: passwordHash } });
      return json({ message: 'Password reset successfully' });
    } catch {
      return json({ message: 'Invalid or expired token' }, 400);
    }
  }

  if (path === 'contact') {
    const { name, email, subject, message } = body;
    if (!name || !email || !message) return json({ message: 'Name, email, and message required' }, 400);
    await prisma.notifications.create({
      data: {
        user_id: '00000000-0000-0000-0000-000000000000',
        title: `Contact: ${subject || 'No subject'}`,
        message: `From ${name} (${email}): ${message}`,
        type: 'CONTACT_FORM',
      },
    });
    return json({ message: 'Message received. We will get back to you within 24 hours.' });
  }

  if (path === 'bids/my') {
    const token = extractToken(req);
    const payload = token ? verifyToken(token) : null;
    if (!payload) return json({ message: 'Unauthorized' }, 401);
    const bids = await prisma.smart_bids.findMany({
      where: { client_id: payload.sub },
      orderBy: { created_at: 'desc' },
      include: {
        client: { select: { id: true, full_name: true, email: true } },
        category: { select: { id: true, name: true } },
        country: { select: { id: true, name: true, code: true } },
        responses: { include: { company: { select: { id: true, company_name: true, logo_url: true, is_verified: true } } } },
      },
    });
    return json(bids);
  }

  if (path === 'notifications') {
    const token = extractToken(req);
    const payload = token ? verifyToken(token) : null;
    if (!payload) return json({ message: 'Unauthorized' }, 401);
    const notifs = await prisma.notifications.findMany({
      where: { user_id: payload.sub },
      orderBy: { created_at: 'desc' },
      take: 50,
    });
    return json(notifs);
  }

  if (path === 'notifications/read') {
    const token = extractToken(req);
    const payload = token ? verifyToken(token) : null;
    if (!payload) return json({ message: 'Unauthorized' }, 401);
    const { ids } = body;
    if (ids && Array.isArray(ids)) {
      await prisma.notifications.updateMany({
        where: { id: { in: ids }, user_id: payload.sub },
        data: { is_read: true },
      });
    } else {
      await prisma.notifications.updateMany({
        where: { user_id: payload.sub, is_read: false },
        data: { is_read: true },
      });
    }
    return json({ message: 'Notifications marked as read' });
  }

  return json({ message: 'Not found' }, 404);
}

async function handlePUT(path: string, req: NextRequest) {
  const token = extractToken(req);
  const payload = token ? verifyToken(token) : null;
  if (!payload) return json({ message: 'Unauthorized' }, 401);

  if (path === 'auth/me') {
    const body = await req.json();
    const user = await prisma.users.update({
      where: { id: payload.sub },
      data: {
        ...(body.fullName && { full_name: body.fullName }),
        ...(body.phone && { phone: body.phone }),
        ...(body.avatarUrl && { avatar_url: body.avatarUrl }),
      },
      select: { id: true, email: true, full_name: true, phone: true, role: true, avatar_url: true, is_verified: true, created_at: true },
    });
    return json(user);
  }

  return json({ message: 'Not found' }, 404);
}

async function handleDELETE(path: string, req: NextRequest) {
  const token = extractToken(req);
  const payload = token ? verifyToken(token) : null;
  if (!payload) return json({ message: 'Unauthorized' }, 401);

  if (payload.role !== 'ADMIN') return json({ message: 'Forbidden' }, 403);

  if (path.startsWith('admin/articles/')) {
    const id = path.split('/').pop()!;
    await prisma.articles.delete({ where: { id } });
    return json({ message: 'Article deleted' });
  }

  if (path.startsWith('admin/companies/')) {
    const id = path.split('/').pop()!;
    await prisma.companies.delete({ where: { id } });
    return json({ message: 'Company deleted' });
  }

  return json({ message: 'Not found' }, 404);
}

function extractPath(pathname: string): string {
  return pathname.replace(/^\/api\//, '');
}

async function handler(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  if (!checkRateLimit(ip)) {
    return json({ message: 'Rate limit exceeded. Try again later.' }, 429);
  }

  try {
    const path = extractPath(req.nextUrl.pathname);
    if (!path || path === '') return json({ status: 'ok', message: 'Toorvest API is running' });

    const method = req.method;

    if (isAuthPath(path)) {
      // Auth endpoints are always accessible
    } else if (method === 'GET' && !isPublicPath(path)) {
      const token = extractToken(req);
      const payload = token ? verifyToken(token) : null;
      if (!payload) return json({ message: 'Unauthorized' }, 401);
      if (isAdminPath(path) && payload.role !== 'ADMIN') {
        return json({ message: 'Forbidden' }, 403);
      }
    } else if (method !== 'GET' && !isPublicPath(path)) {
      // POST/PUT/DELETE to non-public, non-auth paths require auth
      const token = extractToken(req);
      const payload = token ? verifyToken(token) : null;
      if (!payload) return json({ message: 'Unauthorized' }, 401);
    }

    switch (method) {
      case 'GET': return await handleGET(path, req);
      case 'POST': return await handlePOST(path, req);
      case 'PUT': return await handlePUT(path, req);
      case 'DELETE': return await handleDELETE(path, req);
      default: return json({ message: 'Method not allowed' }, 405);
    }
  } catch (e: any) {
    console.error('API Error:', e.message);
    return json({ message: 'Internal server error' }, 500);
  }
}

const AUTH_PATHS = ['auth/login', 'auth/register', 'auth/forgot-password', 'auth/reset-password', 'auth/me'];

function isAuthPath(path: string): boolean {
  return AUTH_PATHS.some(p => path === p);
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
