import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding real bilingual data...');

  const countries = await prisma.countries.findMany();
  const countryMap: Record<string, string> = {};
  for (const c of countries) {
    countryMap[c.code] = c.id;
  }

  const admin = await prisma.users.findFirst({ where: { role: 'ADMIN' } });
  if (!admin) {
    console.error('No admin user found!');
    return;
  }

  const categories = await prisma.categories.findMany();
  const catMap: Record<string, string> = {};
  for (const c of categories) {
    catMap[c.slug] = c.id;
  }
  const defaultCatId = categories[0]?.id;

  // ============================================
  // ARTICLES - snake_case fields
  // ============================================
  console.log('Adding articles...');

  const articles = [
    {
      title: 'UAE launches $10B AI infrastructure fund',
      title_ar: 'الإمارات تطلق صندوقاً بقيمة 10 مليارات دولار للبنية التحتية للذكاء الاصطناعي',
      slug: 'uae-ai-infrastructure-fund-2025',
      content: 'The UAE Ministry of AI has announced a $10 billion infrastructure fund aimed at establishing the Middle East as a global AI hub. The fund will support data centers, research labs, and startup incubators across all seven emirates.',
      content_ar: 'أعلنت وزارة الذكاء الاصطناعي الإماراتية عن صندوق بنية تحتية بقيمة 10 مليارات دولار يستهدف تحويل الشرق الأوسط إلى مركز عالمي للذكاء الاصطناعي.',
      excerpt: 'UAE commits $10B to become the Middle East\'s AI capital',
      excerpt_ar: 'الإمارات تلتزم بـ10 مليارات دولار لتصبح عاصمة الذكاء الاصطناعي في الشرق الأوسط',
      cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
      author_id: admin.id,
      country_id: countryMap['AE'],
      category_id: catMap['technology'] || defaultCatId,
      module: 'BUSINESS_HUB' as const,
      tags: ['AI', 'UAE', 'Investment'],
      status: 'PUBLISHED' as const,
      published_at: new Date('2025-06-15'),
    },
    {
      title: 'Saudi Arabia opens NEOM to international investors',
      title_ar: 'المملكة العربية السعودية تفتح بوابة نيوم للمستثمرين الدوليين',
      slug: 'saudi-neom-international-investors',
      content: 'NEOM has officially opened its doors to international investors with a streamlined registration process. The $500 billion mega-project offers tax incentives, 100% foreign ownership, and simplified visa procedures.',
      content_ar: 'فتحت نيوم أبوابها رسمياً للمستثمرين الدوليين مع عملية تسجيل مبسطة. يوفر المشروع الضخم بقيمة 500 مليار دولار حوافز ضريبية وملكية أجنبية بنسبة 100%.',
      excerpt: 'NEOM opens $500B project to global investors with tax incentives',
      excerpt_ar: 'نيوم تفتح مشروعها بقيمة 500 مليار دولار للمستثمرين العالميين بحوافز ضريبية',
      cover_image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800',
      author_id: admin.id,
      country_id: countryMap['SA'],
      category_id: catMap['technology'] || defaultCatId,
      module: 'INVESTMENT_TOURISM' as const,
      tags: ['NEOM', 'Saudi', 'Investment'],
      status: 'PUBLISHED' as const,
      published_at: new Date('2025-05-20'),
    },
    {
      title: 'India\'s UPI expands to 30 countries',
      title_ar: 'نظام UPI الهندي يتوسع إلى 30 دولة',
      slug: 'india-upi-expansion-30-countries',
      content: 'India\'s Unified Payments Interface (UPI) has now expanded to 30 countries, making it one of the most widely adopted real-time payment systems globally.',
      content_ar: 'توسع واجهة الدفع الموحدة الهندية (UPI) الآن إلى 30 دولة، مما يجعلها واحدة من أكثر أنظمة الدفع الفوري اعتماداً عالمياً.',
      excerpt: 'UPI now available in 30 countries, boosting cross-border trade',
      excerpt_ar: 'UPI متاح الآن في 30 دولة، مما يعزز التجارة عبر الحدود',
      cover_image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
      author_id: admin.id,
      country_id: countryMap['IN'],
      category_id: catMap['technology'] || defaultCatId,
      module: 'BUSINESS_HUB' as const,
      tags: ['India', 'Fintech', 'Payments'],
      status: 'PUBLISHED' as const,
      published_at: new Date('2025-04-10'),
    },
    {
      title: 'Turkey\'s tech startups raise $2B in 2025',
      title_ar: 'الشركات الناشئة التقنية التركية تجمع ملياري دولار في 2025',
      slug: 'turkey-tech-startups-2b-2025',
      content: 'Turkish tech startups have raised over $2 billion in the first half of 2025, a 150% increase from the same period last year.',
      content_ar: 'جمع الشركات الناشئة التقنية التركية أكثر من ملياري دولار في النصف الأول من عام 2025، بزيادة 150% عن الفترة نفسها من العام الماضي.',
      excerpt: 'Turkish startups raise $2B in H1 2025, up 150% YoY',
      excerpt_ar: 'الشركات الناشئة التركية تجمع ملياري دولار في النصف الأول من 2025، بزيادة 150%',
      cover_image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800',
      author_id: admin.id,
      country_id: countryMap['TR'],
      category_id: catMap['technology'] || defaultCatId,
      module: 'BUSINESS_HUB' as const,
      tags: ['Turkey', 'Startups', 'Fintech'],
      status: 'PUBLISHED' as const,
      published_at: new Date('2025-07-01'),
    },
    {
      title: 'Egypt launches Africa\'s largest solar farm',
      title_ar: 'مصر تطلق أكبر محطة شمسية في أفريقيا',
      slug: 'egypt-africa-largest-solar-farm',
      content: 'Egypt has inaugurated the Benban Solar Park, now the largest solar installation in Africa with a capacity of 1.65 GW.',
      content_ar: 'افتتحت مصر حديقة بنبان الشمسية، وهي الآن أكبر منشأة شمسية في أفريقيا بقدرة 1.65 جيجاوات.',
      excerpt: 'Benban Solar Park: 1.65GW capacity, powers 800K homes',
      excerpt_ar: 'حديقة بنبان الشمسية: قدرة 1.65 جيجاوات، تشغل 800 ألف منزل',
      cover_image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
      author_id: admin.id,
      country_id: countryMap['EG'],
      category_id: catMap['energy'] || defaultCatId,
      module: 'INVESTMENT_TOURISM' as const,
      tags: ['Egypt', 'Solar', 'Renewable'],
      status: 'PUBLISHED' as const,
      published_at: new Date('2025-03-15'),
    },
    {
      title: 'Qatar World Cup legacy: $50B infrastructure',
      title_ar: 'إرث كأس العالم في قطر: 50 مليار دولار من البنية التحتية',
      slug: 'qatar-world-cup-legacy-infrastructure',
      content: 'Qatar\'s post-World Cup infrastructure legacy includes $50 billion in new transportation, hospitality, and sports facilities.',
      content_ar: 'يشمل إرث البنية التحتية في قطر ما بعد كأس العالم 50 مليار دولار من وسائل النقل والضيافة والمرافق الرياضية الجديدة.',
      excerpt: 'Qatar\'s $50B post-World Cup infrastructure creates year-round tourism',
      excerpt_ar: 'بنية قطر التحتية بقيمة 50 مليار دولار بعد كأس العالم تخلق سياحة على مدار العام',
      cover_image: 'https://images.unsplash.com/photo-1548971152-2859d4c3b69b?w=800',
      author_id: admin.id,
      country_id: countryMap['QA'],
      category_id: catMap['infrastructure'] || defaultCatId,
      module: 'INVESTMENT_TOURISM' as const,
      tags: ['Qatar', 'Infrastructure', 'Tourism'],
      status: 'PUBLISHED' as const,
      published_at: new Date('2025-02-28'),
    },
    {
      title: 'Indonesia\'s digital economy hits $130B',
      title_ar: 'الاقتصاد الرقمي الإندونيسي يصل إلى 130 مليار دولار',
      slug: 'indonesia-digital-economy-130b',
      content: 'Indonesia\'s digital economy has reached $130 billion in 2025, making it the largest in Southeast Asia.',
      content_ar: 'وصل الاقتصاد الرقمي الإندونيسي إلى 130 مليار دولار في عام 2025، مما يجعله الأكبر في جنوب شرق آسيا.',
      excerpt: 'Indonesia\'s digital economy: $130B, largest in Southeast Asia',
      excerpt_ar: 'الاقتصاد الرقمي الإندونيسي: 130 مليار دولار، الأكبر في جنوب شرق آسيا',
      cover_image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
      author_id: admin.id,
      country_id: countryMap['ID'],
      category_id: catMap['technology'] || defaultCatId,
      module: 'BUSINESS_HUB' as const,
      tags: ['Indonesia', 'Digital Economy', 'E-commerce'],
      status: 'PUBLISHED' as const,
      published_at: new Date('2025-05-01'),
    },
    {
      title: 'Pakistan\'s IT exports surpass $3B',
      title_ar: 'صادرات تكنولوجيا المعلوماتباكستان تتجاوز 3 مليارات دولار',
      slug: 'pakistan-it-exports-3b',
      content: 'Pakistan\'s IT and IT-enabled services exports have surpassed $3 billion annually, with a target of $10 billion by 2030.',
      content_ar: 'تجاوزت صادرات تكنولوجيا المعلومات وخدمات تكنولوجيا المعلومات المدعومة في باكستان 3 مليارات دولار سنوياً، مع استهداف 10 مليارات دولار بحلول عام 2030.',
      excerpt: 'Pakistan IT exports hit $3B, targeting $10B by 2030',
      excerpt_ar: 'صادرات تكنولوجيا المعلومات الباكستانية تصل إلى 3 مليارات دولار، تستهدف 10 مليارات بحلول 2030',
      cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
      author_id: admin.id,
      country_id: countryMap['PK'],
      category_id: catMap['technology'] || defaultCatId,
      module: 'BUSINESS_HUB' as const,
      tags: ['Pakistan', 'IT', 'Exports'],
      status: 'PUBLISHED' as const,
      published_at: new Date('2025-04-20'),
    },
    {
      title: 'Bahrain fintech sandbox attracts 50 startups',
      title_ar: 'بيئة بحرين التجريبية للتقنية المالية تجذب 50 شركة ناشئة',
      slug: 'bahrain-fintech-sandbox-50-startups',
      content: 'Bahrain\'s FinTech Bay regulatory sandbox has attracted 50 international startups since its launch.',
      content_ar: 'جذبت بيئة الأعمال التجريبية للتقنية المالية في البحرين 50 شركة ناشئة دولية منذ إطلاقها.',
      excerpt: 'Bahrain\'s sandbox: 50 fintech startups, 15 licenses issued',
      excerpt_ar: 'بيئة البحرين التجريبية: 50 شركة ناشئة في التقنية المالية، 15 ترخيصاً',
      cover_image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800',
      author_id: admin.id,
      country_id: countryMap['BH'],
      category_id: catMap['technology'] || defaultCatId,
      module: 'BUSINESS_HUB' as const,
      tags: ['Bahrain', 'Fintech', 'Startup'],
      status: 'PUBLISHED' as const,
      published_at: new Date('2025-06-01'),
    },
    {
      title: 'Oman tourism revenue grows 25% in 2025',
      title_ar: 'إيرادات السياحة العمانية تنمو بنسبة 25% في 2025',
      slug: 'oman-tourism-revenue-25-percent',
      content: 'Oman\'s tourism sector has recorded 25% revenue growth in 2025, driven by luxury resort openings and adventure tourism.',
      content_ar: 'سجل قطاع السياحة في عمان نمو إيرادات بنسبة 25% في عام 2025، مدفوعة بافتتاح منتجعات فاخرة والسياحة المغامرة.',
      excerpt: 'Oman tourism up 25%, 4M visitors in H1 2025',
      excerpt_ar: 'السياحة العمانية ترتفع بنسبة 25%، 4 ملايين زائر في النصف الأول من 2025',
      cover_image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
      author_id: admin.id,
      country_id: countryMap['OM'],
      category_id: catMap['infrastructure'] || defaultCatId,
      module: 'INVESTMENT_TOURISM' as const,
      tags: ['Oman', 'Tourism', 'Revenue'],
      status: 'PUBLISHED' as const,
      published_at: new Date('2025-07-10'),
    },
    {
      title: 'Morocco launches Africa\'s first high-speed rail',
      title_ar: 'المغرب يطلق أول قطار فائق السرعة في أفريقيا',
      slug: 'morocco-first-high-speed-rail-africa',
      content: 'Morocco has launched the Al Boraq high-speed rail, connecting Tangier to Casablanca in 2 hours 10 minutes at speeds up to 320 km/h.',
      content_ar: 'أطلق المغرب قطار البراق فائق السرعة، الذي يربط طنجة بالدار البيضاء في ساعتين و10 دقائق بسرعات تصل إلى 320 كم/ساعة.',
      excerpt: 'Al Boraq: Africa\'s first high-speed rail, $2B project',
      excerpt_ar: 'البراق: أول قطار فائق السرعة في أفريقيا، مشروع بقيمة ملياري دولار',
      cover_image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800',
      author_id: admin.id,
      country_id: countryMap['MA'],
      category_id: catMap['infrastructure'] || defaultCatId,
      module: 'INVESTMENT_TOURISM' as const,
      tags: ['Morocco', 'Infrastructure', 'Rail'],
      status: 'PUBLISHED' as const,
      published_at: new Date('2025-03-01'),
    },
    {
      title: 'Jordan\'s tech sector grows 30% annually',
      title_ar: 'قطاع التكنولوجيا الأردني ينمو بنسبة 30% سنوياً',
      slug: 'jordan-tech-sector-30-percent-growth',
      content: 'Jordan\'s technology sector has grown 30% annually over the past three years, driven by a highly educated workforce and competitive costs.',
      content_ar: 'نمو قطاع التكنولوجيا في الأردن بنسبة 30% سنوياً خلال السنوات الثلاث الماضية، مدفوعاً بقوة عمل عالية التعليم وتكافئ تنافسية.',
      excerpt: 'Jordan tech: 30% annual growth, 200+ companies in Amman',
      excerpt_ar: 'تكنولوجيا الأردن: نمو سنوي 30%، أكثر من 200 شركة في عمان',
      cover_image: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800',
      author_id: admin.id,
      country_id: countryMap['JO'],
      category_id: catMap['technology'] || defaultCatId,
      module: 'BUSINESS_HUB' as const,
      tags: ['Jordan', 'Tech', 'Growth'],
      status: 'PUBLISHED' as const,
      published_at: new Date('2025-05-15'),
    },
  ];

  let articleCount = 0;
  for (const article of articles) {
    try {
      await prisma.articles.upsert({
        where: { slug: article.slug },
        update: article,
        create: article,
      });
      articleCount++;
    } catch (e: any) {
      console.log(`Skip article ${article.slug}: ${e.message?.slice(0, 100)}`);
    }
  }
  console.log(`Added ${articleCount} articles`);

  // ============================================
  // COMPANIES - Match actual schema
  // ============================================
  console.log('Adding companies...');

  // Companies need a unique user_id. Create a helper user for each.
  const companyDefs = [
    { name: 'Emirates AI Labs', nameAr: 'مختبرات الإمارات للذكاء الاصطناعي', desc: 'Leading AI research and development company based in Abu Dhabi. Specializes in NLP, computer vision, and autonomous systems.', descAr: 'شركة رائدة في البحث والتطوير في مجال الذكاء الاصطناعي مقرها أبوظبي. تتخصص في معالجة اللغات الطبيعية والرؤية الحاسوبية.', logo: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=200', country: 'AE', services: ['AI', 'Machine Learning', 'Computer Vision'], tier: 'PREMIUM' as const },
    { name: 'Saudi Digital Solutions', nameAr: 'حلول رقمية سعودية', desc: 'Enterprise digital transformation consultancy serving Saudi Arabia and the GCC. Cloud migration, ERP, cybersecurity.', descAr: 'استشارات التحول الرقمي للمؤسسات تخدم السعودية ودول مجلس التعاون الخليجي. ترحيل السحابة وتنفيذ ERP.', logo: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=200', country: 'SA', services: ['Cloud', 'ERP', 'Cybersecurity'], tier: 'PREMIUM' as const },
    { name: 'Mumbai HealthTech', nameAr: 'مumbai للتقنية الصحية', desc: 'Health technology startup revolutionizing telemedicine in South Asia. AI-powered diagnostics serving 5 million patients.', descAr: 'شركة ناشئة في التكنولوجيا الصحية تحدث الطب عن بُعد في جنوب آسيا. منصة تشخيص مدعومة بالذكاء الاصطناعي.', logo: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=200', country: 'IN', services: ['Telemedicine', 'AI Diagnostics', 'HealthTech'], tier: 'ENTERPRISE' as const },
    { name: 'Istanbul Cloud Systems', nameAr: 'أنظمة سحابة إسطنبول', desc: 'Cloud infrastructure provider serving Turkey, Eastern Europe, and Central Asia. 5 data centers with 99.99% uptime.', descAr: 'مزود بنية تحتية سحابية تخدم تركيا وأوروبا الشرقية وآسيا الوسطى. 5 مراكز بيانات بأوقات تشغيل 99.99%.', logo: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=200', country: 'TR', services: ['IaaS', 'PaaS', 'Kubernetes'], tier: 'PREMIUM' as const },
    { name: 'Cairo EdTech Academy', nameAr: 'أكاديمية القاهرة للتقنية التعليمية', desc: 'Online education platform teaching coding and digital skills to 2 million students across the Arab world.', descAr: 'منصة تعليم عبر الإنترنت تعلم البرمجة والمهارات الرقمية لـ2 مليون طالب في العالم العربي.', logo: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=200', country: 'EG', services: ['EdTech', 'Online Learning', 'Coding'], tier: 'BASIC' as const },
    { name: 'Doha Energy Partners', nameAr: 'شركاء الدوحة للطاقة', desc: 'Investment firm specializing in renewable energy projects across the Gulf. 2GW of solar and wind assets.', descAr: 'شركة استثمار متخصصة في مشاريع الطاقة المتجددة في الخليج. 2 جيجاوات من أصول الطاقة الشمسية.', logo: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=200', country: 'QA', services: ['Renewable Energy', 'Solar', 'Wind'], tier: 'PREMIUM' as const },
    { name: 'Jakarta SuperApp', nameAr: 'تطبيق جاكرتا الخارق', desc: 'Indonesia\'s leading super-app: ride-hailing, food delivery, payments, e-commerce. 150M monthly active users.', descAr: 'التطبيق الخارق الرائد في إندونيسيا: نقل وتوصيل طعام ودفع وتجارة إلكترونية. 150 مليون مستخدم نشط شهرياً.', logo: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=200', country: 'ID', services: ['SuperApp', 'Fintech', 'Logistics'], tier: 'ENTERPRISE' as const },
    { name: 'Amman Cybersecurity Labs', nameAr: 'مختبرات عمان للأمن السيبراني', desc: 'Cybersecurity firm protecting government and enterprise clients. SOC-as-a-Service, pen testing, incident response.', descAr: 'شركة أمن سيبراني تحمي العملاء الحكوميين والمؤسسات. SOC كخدمة واختبار الاختراق والاستجابة للحوادث.', logo: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=200', country: 'JO', services: ['Cybersecurity', 'SOC', 'Pen Testing'], tier: 'ENTERPRISE' as const },
    { name: 'Karachi Fintech Hub', nameAr: 'مركز كراتشي للتقنية المالية', desc: 'Pakistan\'s largest fintech incubator. 25 startups processing $2B in annual transactions.', descAr: 'أكبر حاضنة للتقنية المالية في باكستان. 25 شركة ناشئة تتعامل مع 2 مليار دولار في المعاملات السنوية.', logo: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=200', country: 'PK', services: ['Fintech', 'Incubator', 'Payments'], tier: 'BASIC' as const },
    { name: 'Manama Digital Bank', nameAr: 'البنك الرقمي المنامة', desc: 'Digital-only bank serving Bahrain and the GCC. Zero-fee accounts, instant transfers, AI-powered advisory.', descAr: 'بنك رقمي فقط يخدم البحرين ودول مجلس التعاون الخليجي. حسابات بدون عمولات وتحويلات فورية.', logo: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=200', country: 'BH', services: ['Digital Banking', 'AI Advisory', 'Payments'], tier: 'ENTERPRISE' as const },
    { name: 'Muscat Tourism Group', nameAr: 'مجموعة مسقط للسיהة', desc: 'Integrated tourism operator managing 12 luxury resorts across Oman. $500M annual revenue.', descAr: 'مشغل سياحي متكامل يدير 12 منتجعاً فاخراً في عمان. إيرادات سنوية 500 مليون دولار.', logo: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=200', country: 'OM', services: ['Tourism', 'Hospitality', 'Eco-Tourism'], tier: 'BASIC' as const },
    { name: 'Casablanca FinTech', nameAr: 'كازابلانكا للتقنية المالية', desc: 'North Africa\'s leading mobile payments platform. 10M active users across Morocco, Tunisia, Algeria.', descAr: 'منصة الدفع عبر الهاتف الرائد في شمال أفريقيا. 10 ملايين مستخدم نشط في المغرب وتونس والجزائر.', logo: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=200', country: 'MA', services: ['Mobile Payments', 'Fintech', 'Digital Wallet'], tier: 'ENTERPRISE' as const },
  ];

  let companyCount = 0;
  for (const def of companyDefs) {
    try {
      // Create a stub user for this company
      const userId = uuid();
      const email = `company-${userId.slice(0, 8)}@toorvest.local`;
      await prisma.users.create({
        data: {
          id: userId,
          email,
          password_hash: '$2b$10$placeholder',
          full_name: def.name,
          role: 'COMPANY',
        },
      });
      await prisma.companies.create({
        data: {
          user_id: userId,
          company_name: def.name,
          company_name_ar: def.nameAr,
          description: def.desc,
          description_ar: def.descAr,
          logo_url: def.logo,
          country_id: countryMap[def.country],
          service_categories: def.services,
          subscription_tier: def.tier,
          is_verified: true,
        },
      });
      companyCount++;
    } catch (e: any) {
      console.log(`Skip company ${def.name}: ${e.message?.slice(0, 100)}`);
    }
  }
  console.log(`Added ${companyCount} companies`);

  // ============================================
  // PROJECTS - Match ProjectSector enum: REAL_ESTATE/AGRICULTURE/INDUSTRY/OTHER
  // ============================================
  console.log('Adding projects...');

  const projects = [
    {
      title: 'Riyadh Metro Expansion',
      title_ar: 'توسيع مترو الرياض',
      description: 'Phase 2 of the Riyadh Metro adding 3 new lines and 25 stations. Total investment: $23 billion.',
      description_ar: 'المرحلة الثانية من مترو الرياض لإضافة 3 خطوط جديدة و25 محطة. إجمالي الاستثمار: 23 مليار دولار.',
      country_id: countryMap['SA'],
      project_type: 'GOVERNMENTAL' as const,
      sector: 'INDUSTRY' as const,
      status: 'UNDER_CONSTRUCTION' as const,
      budget: 23000000000,
      roi_percentage: 8,
      location: 'Riyadh, Saudi Arabia',
    },
    {
      title: 'Dubai Healthcare City Phase 3',
      title_ar: 'مدينة دبي الطبية المرحلة الثالثة',
      description: 'Expansion of Dubai Healthcare City to include 50 new medical facilities and a medical tourism hub.',
      description_ar: 'توسيع مدينة دبي الطبية لتشمل 50 منشأة طبية جديدة ومركز للسياحة العلاجية.',
      country_id: countryMap['AE'],
      project_type: 'GOVERNMENTAL' as const,
      sector: 'OTHER' as const,
      status: 'UNDER_CONSTRUCTION' as const,
      budget: 4000000000,
      roi_percentage: 12,
      location: 'Dubai, UAE',
    },
    {
      title: 'Istanbul Tech Valley',
      title_ar: 'وادي التقنية في إسطنبول',
      description: 'Technology free zone housing 500 international companies. Tax exemptions for 10 years.',
      description_ar: 'منطقة حرة تقنية تستضيف 500 شركة دولية. إعفاءات ضريبية لمدة 10 سنوات.',
      country_id: countryMap['TR'],
      project_type: 'GOVERNMENTAL' as const,
      sector: 'INDUSTRY' as const,
      status: 'OPERATIONAL' as const,
      budget: 2000000000,
      roi_percentage: 15,
      location: 'Istanbul, Turkey',
    },
    {
      title: 'Cairo Smart City',
      title_ar: 'القاهرة المدينة الذكية',
      description: 'Smart city development in the New Administrative Capital. IoT infrastructure, autonomous transport.',
      description_ar: 'تطوير مدينة ذكية في العاصمة الإدارية الجديدة. بنية تحتية إنترنت الأشياء ونقل ذاتي.',
      country_id: countryMap['EG'],
      project_type: 'GOVERNMENTAL' as const,
      sector: 'REAL_ESTATE' as const,
      status: 'UNDER_CONSTRUCTION' as const,
      budget: 58000000000,
      roi_percentage: 10,
      location: 'New Administrative Capital, Egypt',
    },
    {
      title: 'Mumbai Coastal Road',
      title_ar: 'طريق مومباي الساحلي',
      description: '10.58 km coastal road connecting South Mumbai to western suburbs. Investment: $2.1 billion.',
      description_ar: 'طريق ساحلي بطول 10.58 كم يربط جنوب مومباي بالضواحي الغربية. الاستثمار: 2.1 مليار دولار.',
      country_id: countryMap['IN'],
      project_type: 'GOVERNMENTAL' as const,
      sector: 'OTHER' as const,
      status: 'OPERATIONAL' as const,
      budget: 2100000000,
      roi_percentage: 7,
      location: 'Mumbai, India',
    },
    {
      title: 'Indonesia Digital Village',
      title_ar: 'القرية الرقمية الإندونيسية',
      description: 'Program to connect 75,000 villages with high-speed internet and digital services.',
      description_ar: 'برنامج لربط 75,000 قرية بإنترنت عالي السرعة وخدمات رقمية.',
      country_id: countryMap['ID'],
      project_type: 'GOVERNMENTAL' as const,
      sector: 'AGRICULTURE' as const,
      status: 'UNDER_CONSTRUCTION' as const,
      budget: 1500000000,
      roi_percentage: 9,
      location: 'Nationwide, Indonesia',
    },
    {
      title: 'Pakistan IT Corridor',
      title_ar: 'ممر تكنولوجيا المعلومات الباكستاني',
      description: 'Special economic zone for IT companies in Lahore. Tax holidays for 10 years.',
      description_ar: 'منطقة اقتصادية خاصة لشركات تكنولوجيا المعلومات في لاهور. إعفاءات ضريبية لمدة 10 سنوات.',
      country_id: countryMap['PK'],
      project_type: 'GOVERNMENTAL' as const,
      sector: 'INDUSTRY' as const,
      status: 'OPERATIONAL' as const,
      budget: 500000000,
      roi_percentage: 18,
      location: 'Lahore, Pakistan',
    },
    {
      title: 'Bahrain FinTech City',
      title_ar: 'مدينة البحرين للتقنية المالية',
      description: 'Dedicated financial technology free zone with 100% foreign ownership, zero tax.',
      description_ar: 'منطقة حرة مخصصة للتكنولوجيا المالية بملكية أجنبية بنسبة 100% وضريبة صفرية.',
      country_id: countryMap['BH'],
      project_type: 'GOVERNMENTAL' as const,
      sector: 'OTHER' as const,
      status: 'OPERATIONAL' as const,
      budget: 1000000000,
      roi_percentage: 14,
      location: 'Manama, Bahrain',
    },
    {
      title: 'Oman Tourism Corridor',
      title_ar: 'ممر السياحة العمانية',
      description: 'Integrated tourism development connecting Muscat, Nizwa, and Salalah. Investment: $3 billion.',
      description_ar: 'تطوير سياحي متكامل يربط مسقط ونزوى وصلالة. الاستثمار: 3 مليارات دولار.',
      country_id: countryMap['OM'],
      project_type: 'GOVERNMENTAL' as const,
      sector: 'OTHER' as const,
      status: 'UNDER_CONSTRUCTION' as const,
      budget: 3000000000,
      roi_percentage: 11,
      location: 'Muscat-Nizwa-Salalah, Oman',
    },
    {
      title: 'Morocco Green Hydrogen',
      title_ar: 'الهيدروجين الأخضر المغربي',
      description: 'Africa\'s largest green hydrogen production facility. 10GW capacity by 2030. Investment: $40 billion.',
      description_ar: 'أكبر منتج للهيدروجين الأخضر في أفريقيا. قدرة 10 جيجاوات بحلول 2030. الاستثمار: 40 مليار دولار.',
      country_id: countryMap['MA'],
      project_type: 'GOVERNMENTAL' as const,
      sector: 'INDUSTRY' as const,
      status: 'OFF_PLAN' as const,
      budget: 40000000000,
      roi_percentage: 16,
      location: 'Dakhla, Morocco',
    },
    {
      title: 'Jordan Innovation Hub',
      title_ar: 'مركز الابتكار الأردني',
      description: 'Technology and innovation center in Amman. 200 startups, 50 international tech companies.',
      description_ar: 'مركز للتكنولوجيا والابتكار في عمان. 200 شركة ناشئة و50 شركة تكنولوجيا دولية.',
      country_id: countryMap['JO'],
      project_type: 'GOVERNMENTAL' as const,
      sector: 'INDUSTRY' as const,
      status: 'UNDER_CONSTRUCTION' as const,
      budget: 800000000,
      roi_percentage: 13,
      location: 'Amman, Jordan',
    },
    {
      title: 'China-Pakistan Economic Corridor Phase 2',
      title_ar: 'النفق الاقتصادي الصيني الباكستاني المرحلة الثانية',
      description: 'Phase 2 of CPEC adding 3 new economic zones, highway expansion, Gwadar port development.',
      description_ar: 'المرحلة الثانية من CPEC لإضافة 3 مناطق اقتصادية جديدة وتوسيع الطرق السريعة.',
      country_id: countryMap['PK'],
      project_type: 'GOVERNMENTAL' as const,
      sector: 'OTHER' as const,
      status: 'UNDER_CONSTRUCTION' as const,
      budget: 25000000000,
      roi_percentage: 9,
      location: 'Various, Pakistan',
    },
  ];

  let projectCount = 0;
  for (const project of projects) {
    try {
      await prisma.projects.create({ data: project as any });
      projectCount++;
    } catch (e: any) {
      console.log(`Skip project ${project.title}: ${e.message?.slice(0, 100)}`);
    }
  }
  console.log(`Added ${projectCount} projects`);

  // Tourism and tips already seeded — skip if duplicate
  console.log('Done! Articles, companies, and projects seeded.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
