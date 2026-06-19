import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Neon database...');

  const u = async (email: string, name: string, role: any) =>
    prisma.users.upsert({ where: { email }, update: {}, create: { email, password_hash: '$2b$10$placeholder', full_name: name, role } });
  const admin = await u('admin@toorvest.com', 'Admin', 'ADMIN');
  const cu = [await u('c1@toorvest.com','C1','COMPANY'), await u('c2@toorvest.com','C2','COMPANY'), await u('c3@toorvest.com','C3','COMPANY'), await u('c4@toorvest.com','C4','COMPANY'), await u('c5@toorvest.com','C5','COMPANY'), await u('c6@toorvest.com','C6','COMPANY'), await u('c7@toorvest.com','C7','COMPANY')];

  const cats = [];
  for (const c of [
    { name: 'Technology', name_ar: 'التكنولوجيا', slug: 'technology', module: 'BUSINESS_HUB' as const },
    { name: 'Real Estate', name_ar: 'العقارات', slug: 'real-estate', module: 'BUSINESS_HUB' as const },
    { name: 'Healthcare', name_ar: 'الرعاية الصحية', slug: 'healthcare', module: 'BUSINESS_HUB' as const },
    { name: 'Education', name_ar: 'التعليم', slug: 'education', module: 'BUSINESS_HUB' as const },
    { name: 'Energy', name_ar: 'الطاقة', slug: 'energy', module: 'INVESTMENT_TOURISM' as const },
    { name: 'Tourism', name_ar: 'السياحة', slug: 'tourism', module: 'INVESTMENT_TOURISM' as const },
    { name: 'Finance', name_ar: 'المالية', slug: 'finance', module: 'BUSINESS_HUB' as const },
    { name: 'Agriculture', name_ar: 'الزراعة', slug: 'agriculture', module: 'INVESTMENT_TOURISM' as const },
    { name: 'Manufacturing', name_ar: 'التصنيع', slug: 'manufacturing', module: 'BUSINESS_HUB' as const },
    { name: 'Infrastructure', name_ar: 'البنية التحتية', slug: 'infrastructure', module: 'INVESTMENT_TOURISM' as const },
  ]) cats.push(await prisma.categories.upsert({ where: { slug: c.slug }, update: {}, create: c }));

  const cData = [
    { name: 'United Arab Emirates', name_ar: 'الإمارات العربية المتحدة', code: 'AE', description: 'Global business hub', description_ar: 'مركز أعمال عالمي', flag_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400', sort_order: 1 },
    { name: 'Saudi Arabia', name_ar: 'المملكة العربية السعودية', code: 'SA', description: 'Vision 2030', description_ar: 'رؤية 2030', flag_url: 'https://images.unsplash.com/photo-1589774850578-2af0e05ff1da?w=400', sort_order: 2 },
    { name: 'Turkey', name_ar: 'تركيا', code: 'TR', description: 'Bridge Europe-Asia', description_ar: 'جسر أوروبا-آسيا', flag_url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400', sort_order: 3 },
    { name: 'India', name_ar: 'الهند', code: 'IN', description: 'Fastest growing economy', description_ar: 'أسرع اقتصاد نمواً', flag_url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400', sort_order: 4 },
    { name: 'China', name_ar: 'الصين', code: 'CN', description: 'Second largest economy', description_ar: 'ثاني أكبر اقتصاد', flag_url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400', sort_order: 5 },
    { name: 'Egypt', name_ar: 'مصر', code: 'EG', description: 'Gateway to Africa', description_ar: 'بوابة أفريقيا', flag_url: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400', sort_order: 6 },
    { name: 'Jordan', name_ar: 'الأردن', code: 'JO', description: 'Stable Levant destination', description_ar: 'وجهة شامية مستقرة', flag_url: 'https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=400', sort_order: 7 },
    { name: 'Morocco', name_ar: 'المغرب', code: 'MA', description: 'Africa gateway', description_ar: 'بوابة أفريقيا', flag_url: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=400', sort_order: 8 },
    { name: 'Qatar', name_ar: 'قطر', code: 'QA', description: 'Wealthy Gulf state', description_ar: 'دولة خليجية ثريرة', flag_url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400', sort_order: 9 },
    { name: 'Bahrain', name_ar: 'البحرين', code: 'BH', description: 'Financial hub', description_ar: 'مركز مالي', flag_url: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=400', sort_order: 10 },
    { name: 'Kuwait', name_ar: 'الكويت', code: 'KW', description: 'Oil-rich nation', description_ar: 'دولة غنية بالنفط', flag_url: 'https://images.unsplash.com/photo-1562979314-bee7453e911c?w=400', sort_order: 11 },
    { name: 'Oman', name_ar: 'عُمان', code: 'OM', description: 'Diversified economy', description_ar: 'اقتصاد متنوع', flag_url: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=400', sort_order: 12 },
    { name: 'Pakistan', name_ar: 'باكستان', code: 'PK', description: 'Emerging market', description_ar: 'سوق ناشئ', flag_url: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=400', sort_order: 13 },
    { name: 'Indonesia', name_ar: 'إندونيسيا', code: 'ID', description: 'Largest SEA economy', description_ar: 'أكبر اقتصاد جنوب شرق آسيا', flag_url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400', sort_order: 14 },
    { name: 'Brazil', name_ar: 'البرازيل', code: 'BR', description: 'Latin America largest', description_ar: 'أكبر اقتصاد في أمريكا اللاتينية', flag_url: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400', sort_order: 15 },
  ];
  const cs: any[] = [];
  for (const c of cData) cs.push(await prisma.countries.upsert({ where: { code: c.code }, update: {}, create: c }));

  const ae = cs.find((c: any) => c.code === 'AE')!;
  const sa = cs.find((c: any) => c.code === 'SA')!;
  const tr = cs.find((c: any) => c.code === 'TR')!;
  const in_ = cs.find((c: any) => c.code === 'IN')!;
  const cn = cs.find((c: any) => c.code === 'CN')!;
  const eg = cs.find((c: any) => c.code === 'EG')!;
  const qa = cs.find((c: any) => c.code === 'QA')!;

  for (const e of [
    { name: 'Dubai', name_ar: 'دبي', description: 'Global hub', description_ar: 'مركز عالمي', sort_order: 1, country_id: ae.id },
    { name: 'Abu Dhabi', name_ar: 'أبو ظبي', description: 'Capital', description_ar: 'العاصمة', sort_order: 2, country_id: ae.id },
    { name: 'Sharjah', name_ar: 'الشارقة', description: 'Cultural capital', description_ar: 'العاصمة الثقافية', sort_order: 3, country_id: ae.id },
  ]) await prisma.emirates.create({ data: e });

  for (const [i, c] of [
    { user_id: cu[0].id, company_name: 'GulfTech Solutions', company_name_ar: 'حلول الخليج التقنية', description: 'Leading tech solutions', country_id: ae.id, category_id: cats[0].id, service_type: 'INTERNATIONAL' as const, service_categories: ['Software', 'Cloud'] },
    { user_id: cu[1].id, company_name: 'Al Arabi Real Estate', company_name_ar: 'العربي العقارية', description: 'Premium real estate', country_id: sa.id, category_id: cats[1].id, service_type: 'LOCAL' as const, service_categories: ['Commercial', 'Residential'] },
    { user_id: cu[2].id, company_name: 'Istanbul Innovations', company_name_ar: 'ابتكارات إسطنبول', description: 'Innovation hub', country_id: tr.id, category_id: cats[0].id, service_type: 'INTERNATIONAL' as const, service_categories: ['IoT', 'Smart Cities'] },
    { user_id: cu[3].id, company_name: 'Mumbai MedTech', company_name_ar: 'ميديتك مومباي', description: 'Healthcare tech', country_id: in_.id, category_id: cats[2].id, service_type: 'LOCAL' as const, service_categories: ['Telemedicine'] },
    { user_id: cu[4].id, company_name: 'Doha Energy Partners', company_name_ar: 'شركاء الطاقة الدوحة', description: 'Energy transition', country_id: qa.id, category_id: cats[4].id, service_type: 'INTERNATIONAL' as const, service_categories: ['Solar', 'Wind'] },
    { user_id: cu[5].id, company_name: 'Shenzhen Smart Grid', company_name_ar: 'شبكة شنتشن الذكية', description: 'Smart grid', country_id: cn.id, category_id: cats[9].id, service_type: 'LOCAL' as const, service_categories: ['Smart Grid'] },
    { user_id: cu[6].id, company_name: 'Cairo EdTech', company_name_ar: 'تعليم القاهرة', description: 'Digital education', country_id: eg.id, category_id: cats[3].id, service_type: 'LOCAL' as const, service_categories: ['E-Learning'] },
  ].entries()) { await prisma.companies.upsert({ where: { user_id: (c as any).user_id }, update: {}, create: c as any }); }

  for (const a of [
    { title: 'UAE Leads Middle East in AI Investment', title_ar: 'الإمارات تتصدر الشرق الأوسط في الاستثمار بالذكاء الاصطناعي', slug: 'uae-leads-ai-investment', content: 'The UAE continues to attract billions in AI investments.', content_ar: 'تستمر الإمارات في جذب مليارات الاستثمارات.', excerpt: 'UAE AI leader', excerpt_ar: 'الإمارات قيادة الذكاء الاصطناعي', cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', status: 'PUBLISHED' as const, module: 'BUSINESS_HUB' as const, author_id: admin.id, country_id: ae.id, category_id: cats[0].id, published_at: new Date('2025-01-15'), tags: ['AI', 'UAE'] },
    { title: 'Saudi Vision 2030: Progress Update', title_ar: 'رؤية السعودية 2030', slug: 'saudi-vision-2030-progress', content: 'Saudi Arabia diversifying its economy.', content_ar: 'المملكة تنوّع اقتصادها.', excerpt: 'Vision 2030', excerpt_ar: 'رؤية 2030', cover_image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800', status: 'PUBLISHED' as const, module: 'INVESTMENT_TOURISM' as const, author_id: admin.id, country_id: sa.id, category_id: cats[4].id, published_at: new Date('2025-02-01'), tags: ['Saudi'] },
    { title: 'Turkey Emerging as Tech Hub', title_ar: 'تركيا كمركز تقني', slug: 'turkey-emerging-tech-hub', content: 'Istanbul tech ecosystem growing.', content_ar: 'نظام إسطنبول التقني ينمو.', excerpt: 'Turkey tech', excerpt_ar: 'تركيا التقنية', cover_image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800', status: 'PUBLISHED' as const, module: 'BUSINESS_HUB' as const, author_id: admin.id, country_id: tr.id, category_id: cats[0].id, published_at: new Date('2025-02-15'), tags: ['Turkey'] },
    { title: 'Renewable Energy in the Gulf', title_ar: 'الطاقة المتجددة في الخليج', slug: 'renewable-energy-gulf', content: 'Gulf investing in renewables.', content_ar: 'الخليج يستثمر في الطاقة المتجددة.', excerpt: 'Gulf energy', excerpt_ar: 'طاقة الخليج', cover_image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', status: 'PUBLISHED' as const, module: 'INVESTMENT_TOURISM' as const, author_id: admin.id, country_id: qa.id, category_id: cats[4].id, published_at: new Date('2025-03-01'), tags: ['Energy'] },
    { title: 'India Digital Transformation', title_ar: 'التحول الرقمي في الهند', slug: 'india-digital-transformation', content: 'India massive digital transformation.', content_ar: 'الهند تحول رقمي هائل.', excerpt: 'India digital', excerpt_ar: 'الهند الرقمية', cover_image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800', status: 'PUBLISHED' as const, module: 'BUSINESS_HUB' as const, author_id: admin.id, country_id: in_.id, category_id: cats[0].id, published_at: new Date('2025-03-15'), tags: ['India'] },
    { title: 'Smart Cities Infrastructure', title_ar: 'بنية المدن الذكية', slug: 'smart-cities-infrastructure', content: 'Smart city benchmarks in Dubai and NEOM.', content_ar: 'معايير المدن الذكية في دبي ونيوم.', excerpt: 'Smart cities', excerpt_ar: 'المدن الذكية', cover_image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800', status: 'PUBLISHED' as const, module: 'INVESTMENT_TOURISM' as const, author_id: admin.id, country_id: ae.id, category_id: cats[9].id, published_at: new Date('2025-04-01'), tags: ['Smart Cities'] },
  ]) { await prisma.articles.upsert({ where: { slug: a.slug }, update: {}, create: a }); }

  for (const p of [
    { title: 'Dubai Smart City Phase 2', title_ar: 'دبي الذكية المرحلة 2', description: 'Smart city expansion', description_ar: 'توسيع المدينة الذكية', project_type: 'GOVERNMENTAL' as const, sector: 'OTHER' as const, status: 'UNDER_CONSTRUCTION' as const, budget: 125000000, country_id: ae.id },
    { title: 'NEOM Tech Valley', title_ar: 'وادي التقنية نيوم', description: 'Tech innovation hub', description_ar: 'مركز ابتكار', project_type: 'GOVERNMENTAL' as const, sector: 'OTHER' as const, status: 'OFF_PLAN' as const, budget: 300000000, country_id: sa.id },
    { title: 'Istanbul Data Center', title_ar: 'مركز بيانات إسطنبول', description: 'Data center', description_ar: 'مركز بيانات', project_type: 'INDIVIDUAL' as const, sector: 'OTHER' as const, status: 'UNDER_CONSTRUCTION' as const, budget: 55000000, country_id: tr.id },
    { title: 'Qatar Solar Park', title_ar: 'حديقة الطاقة الشمسية', description: 'Solar facility', description_ar: 'منشأة شمسية', project_type: 'GOVERNMENTAL' as const, sector: 'OTHER' as const, status: 'UNDER_CONSTRUCTION' as const, budget: 40000000, country_id: qa.id },
    { title: 'Cairo Digital Academy', title_ar: 'أكاديمية القاهرة الرقمية', description: 'Digital training', description_ar: 'تدريب رقمي', project_type: 'GOVERNMENTAL' as const, sector: 'OTHER' as const, status: 'OFF_PLAN' as const, budget: 10000000, country_id: eg.id },
    { title: 'Mumbai Health Corridor', title_ar: 'ممر الصحة مومباي', description: 'Health infrastructure', description_ar: 'بنية صحية', project_type: 'GOVERNMENTAL' as const, sector: 'OTHER' as const, status: 'UNDER_CONSTRUCTION' as const, budget: 47000000, country_id: in_.id },
    { title: 'Shenzhen Smart Grid', title_ar: 'الشبكة الذكية شنتشن', description: 'Smart grid deploy', description_ar: 'نشر شبكة ذكية', project_type: 'GOVERNMENTAL' as const, sector: 'OTHER' as const, status: 'OPERATIONAL' as const, budget: 70000000, country_id: cn.id },
  ]) await prisma.projects.create({ data: p });

  for (const t of [
    { name: 'Desert Safari', name_ar: 'سفاري صحراوي', description: 'Desert adventure', description_ar: 'مغامرة صحراوية', activity_type: 'ADVENTURE' as const, country_id: ae.id },
    { name: 'Heritage Village', name_ar: 'القرية التراثية', description: 'Cultural tour', description_ar: 'جولة ثقافية', activity_type: 'CULTURAL' as const, country_id: ae.id },
    { name: 'AlUla Visit', name_ar: 'زيارة العلا', description: 'Historical site', description_ar: 'موقع تاريخي', activity_type: 'CULTURAL' as const, country_id: sa.id },
    { name: 'Cappadocia Balloon', name_ar: 'بالون كابادوكيا', description: 'Hot air balloon', description_ar: 'بالون هوائي', activity_type: 'ADVENTURE' as const, country_id: tr.id },
    { name: 'Kerala Cruise', name_ar: 'رحلة كيرلا', description: 'Backwaters cruise', description_ar: 'رحلة مياه', activity_type: 'WELLNESS' as const, country_id: in_.id },
    { name: 'Great Wall Trek', name_ar: 'سور الصين', description: 'Great Wall hike', description_ar: 'مسيرة السور', activity_type: 'ADVENTURE' as const, country_id: cn.id },
  ]) await prisma.tourism_activities.create({ data: t });

  for (const t of [
    { title: 'Dress Code Gulf', title_ar: 'dress code في الخليج', content: 'Dress modestly at official sites.', content_ar: 'ارتدِ محتشماً.', icon_url: '🏷️', module: 'INVESTMENT_TOURISM' as const },
    { title: 'Business Cards', title_ar: 'آداب البطاقات', content: 'Present with both hands.', content_ar: 'قدّم بيدك.', icon_url: '💼', module: 'BUSINESS_HUB' as const },
    { title: 'Ramadan Hours', title_ar: 'ساعات رمضان', content: 'Reduced business hours.', content_ar: 'ساعات مختصرة.', icon_url: '🌙', module: 'BUSINESS_HUB' as const },
  ]) await prisma.tips.create({ data: t });

  console.log('Done! 15 countries, 10 categories, 7 companies, 6 articles, 7 projects');
}

main().catch(console.error).finally(() => prisma.$disconnect());
