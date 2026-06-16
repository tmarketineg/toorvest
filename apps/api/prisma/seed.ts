import { PrismaClient, Module, ServiceType, SubscriptionTier, ProjectType, ProjectSector, ProjectStatus, ActivityType, DisplayMode, ArticleStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Get existing countries
  const countries = await prisma.countries.findMany();
  const uae = countries.find(c => c.code === 'AE');
  const saudi = countries.find(c => c.code === 'SA');
  const turkey = countries.find(c => c.code === 'TR');
  const india = countries.find(c => c.code === 'IN');
  const china = countries.find(c => c.code === 'CN');

  // Get existing categories
  const categories = await prisma.categories.findMany();

  // Get existing users
  const users = await prisma.users.findMany();
  const adminUser = users.find(u => u.role === 'ADMIN');
  const investorUser = users.find(u => u.role === 'INVESTOR');
  const companyUser = users.find(u => u.role === 'COMPANY');

  // ==================== Emirates (UAE) ====================
  if (uae) {
    const emiratesData = [
      { name: 'Dubai', name_ar: 'دبي', description: 'Global business hub and tourism destination', description_ar: 'مركز أعمال وسياحة عالمي', sort_order: 1 },
      { name: 'Abu Dhabi', name_ar: 'أبو ظبي', description: 'Capital city with major investment opportunities', description_ar: 'العاصمة مع فرص استثمارية كبيرة', sort_order: 2 },
      { name: 'Sharjah', name_ar: 'الشارقة', description: 'Cultural capital with growing tech sector', description_ar: 'العاصمة الثقافية مع قطاع تكنولوجي متنامي', sort_order: 3 },
      { name: 'Ajman', name_ar: 'عجمان', description: 'Emerging market with competitive costs', description_ar: 'سوق ناشئ مع تكاليف تنافسية', sort_order: 4 },
      { name: 'Ras Al Khaimah', name_ar: 'رأس الخيمة', description: 'Industrial and tourism hub', description_ar: 'مركز صناعي وسياحي', sort_order: 5 },
    ];

    for (const em of emiratesData) {
      const existing = await prisma.emirates.findFirst({ where: { name: em.name, country_id: uae.id } });
      if (!existing) {
        await prisma.emirates.create({
          data: { country_id: uae.id, ...em, tourism_highlights: {}, tips_for_investors: {}, images: [] },
        });
      }
    }
    console.log('✓ Emirates seeded');
  }

  // ==================== More Countries ====================
  const moreCountries = [
    { name: 'Egypt', name_ar: 'مصر', code: 'EG', description: 'Strategic location bridging Africa and Middle East', description_ar: 'موقع استراتيجي يربط أفريقيا والشرق الأوسط', sort_order: 6 },
    { name: 'Jordan', name_ar: 'الأردن', code: 'JO', description: 'Stable economy with growing tech sector', description_ar: 'اقتصاد مستقر مع قطاع تكنولوجي متنامي', sort_order: 7 },
    { name: 'Morocco', name_ar: 'المغرب', code: 'MA', description: 'Gateway to African and European markets', description_ar: 'بوابة إلى الأسواق الأفريقية والأوروبية', sort_order: 8 },
    { name: 'Kenya', name_ar: 'كينيا', code: 'KE', description: 'East Africa largest economy', description_ar: 'أكبر اقتصاد في شرق أفريقيا', sort_order: 9 },
    { name: 'Germany', name_ar: 'ألمانيا', code: 'DE', description: 'Europe economic powerhouse', description_ar: 'القوة الاقتصادية في أوروبا', sort_order: 10 },
    { name: 'United Kingdom', name_ar: 'المملكة المتحدة', code: 'GB', description: 'Global financial center', description_ar: 'مركز مالي عالمي', sort_order: 11 },
    { name: 'United States', name_ar: 'الولايات المتحدة', code: 'US', description: 'Largest economy in the world', description_ar: 'أكبر اقتصاد في العالم', sort_order: 12 },
    { name: 'Japan', name_ar: 'اليابان', code: 'JP', description: 'Leading technology and innovation hub', description_ar: 'مركز رائد للتكنولوجيا والابتكار', sort_order: 13 },
    { name: 'Brazil', name_ar: 'البرازيل', code: 'BR', description: 'Largest economy in South America', description_ar: 'أكبر اقتصاد في أمريكا الجنوبية', sort_order: 14 },
    { name: 'Australia', name_ar: 'أستراليا', code: 'AU', description: 'Stable economy with strong mining sector', description_ar: 'اقتصاد مستقر مع قطاع تعدين قوي', sort_order: 15 },
  ];

  for (const countryData of moreCountries) {
    const existing = await prisma.countries.findFirst({ where: { code: countryData.code } });
    if (!existing) {
      await prisma.countries.create({ data: { ...countryData, is_active: true } });
    }
  }
  console.log('✓ Additional countries seeded');

  // ==================== Categories ====================
  const categoryData = [
    { name: 'Technology', name_ar: 'التكنولوجيا', slug: 'technology', module: Module.BUSINESS_HUB, icon_url: null, sort_order: 1 },
    { name: 'Construction', name_ar: 'البناء', slug: 'construction', module: Module.BUSINESS_HUB, icon_url: null, sort_order: 2 },
    { name: 'Energy', name_ar: 'الطاقة', slug: 'energy', module: Module.BUSINESS_HUB, icon_url: null, sort_order: 3 },
    { name: 'Finance', name_ar: 'المالية', slug: 'finance', module: Module.BUSINESS_HUB, icon_url: null, sort_order: 4 },
    { name: 'Healthcare', name_ar: 'الصحة', slug: 'healthcare', module: Module.BUSINESS_HUB, icon_url: null, sort_order: 5 },
    { name: 'Real Estate', name_ar: 'العقارات', slug: 'real-estate', module: Module.INVESTMENT_TOURISM, icon_url: null, sort_order: 6 },
    { name: 'Agriculture', name_ar: 'الزراعة', slug: 'agriculture', module: Module.INVESTMENT_TOURISM, icon_url: null, sort_order: 7 },
    { name: 'Tourism', name_ar: 'السياحة', slug: 'tourism', module: Module.INVESTMENT_TOURISM, icon_url: null, sort_order: 8 },
    { name: 'Import Export', name_ar: 'الاستيراد والتصدير', slug: 'import-export', module: Module.BUSINESS_HUB, icon_url: null, sort_order: 9 },
    { name: 'Consulting', name_ar: 'الاستشارات', slug: 'consulting', module: Module.BUSINESS_HUB, icon_url: null, sort_order: 10 },
  ];

  for (const catData of categoryData) {
    const existing = await prisma.categories.findFirst({ where: { slug: catData.slug } });
    if (!existing) {
      await prisma.categories.create({ data: { ...catData, is_active: true } });
    }
  }
  console.log('✓ Categories seeded');

  // Refresh categories
  const allCategories = await prisma.categories.findMany();
  const techCat = allCategories.find(c => c.slug === 'technology');
  const constCat = allCategories.find(c => c.slug === 'construction');
  const energyCat = allCategories.find(c => c.slug === 'energy');
  const financeCat = allCategories.find(c => c.slug === 'finance');
  const healthCat = allCategories.find(c => c.slug === 'healthcare');
  const realEstateCat = allCategories.find(c => c.slug === 'real-estate');
  const agriCat = allCategories.find(c => c.slug === 'agriculture');
  const tourismCat = allCategories.find(c => c.slug === 'tourism');

  // ==================== Companies ====================
  if (uae) {
    // Create additional company users first
    const companyEmails = [
      'tech@toorvest.com', 'gulf@toorvest.com', 'green@toorvest.com',
      'albaraka@toorvest.com', 'medcare@toorvest.com', 'istanbul@toorvest.com',
    ];
    const bcrypt = await import('bcryptjs');
    const hashedPw = await bcrypt.hash('password123', 10);

    const companyUserIds: string[] = [];
    for (const email of companyEmails) {
      let user = await prisma.users.findUnique({ where: { email } });
      if (!user) {
        user = await prisma.users.create({
          data: { email, password_hash: hashedPw, full_name: email.split('@')[0], role: 'COMPANY' },
        });
      }
      companyUserIds.push(user.id);
    }
    const companyData = [
      {
        user_id: companyUserIds[0],
        company_name: 'Gulf Tech Solutions',
        company_name_ar: 'حلول الخليج التقنية',
        description: 'Leading technology solutions provider in the Gulf region.',
        description_ar: 'مزود حلول تقنية رائد في منطقة الخليج',
        country_id: uae.id,
        category_id: techCat?.id,
        service_categories: ['Software Development', 'Cloud Solutions', 'AI/ML'],
        service_type: 'INTERNATIONAL' as any,
        is_verified: true,
        subscription_tier: 'PREMIUM' as any,
      },
      {
        user_id: companyUserIds[1],
        company_name: 'Al Baraka Construction',
        company_name_ar: 'البركة للمقاولات',
        description: 'Premier construction company specializing in luxury developments.',
        description_ar: 'شركة مقاولات رائدة متخصصة في المشاريع الفاخرة',
        country_id: uae.id,
        category_id: allCategories.find(c => c.slug === 'construction')?.id,
        service_categories: ['Residential', 'Commercial', 'Infrastructure'],
        service_type: 'LOCAL' as any,
        is_verified: true,
        subscription_tier: 'ENTERPRISE' as any,
      },
      {
        user_id: companyUserIds[2],
        company_name: 'Green Energy Systems',
        company_name_ar: 'أنظمة الطاقة الخضراء',
        description: 'Renewable energy solutions for sustainable development.',
        description_ar: 'حلول الطاقة المتجددة للتنمية المستدامة',
        country_id: saudi?.id || uae.id,
        category_id: allCategories.find(c => c.slug === 'energy')?.id,
        service_categories: ['Solar', 'Wind', 'Energy Storage'],
        service_type: 'INTERNATIONAL' as any,
        is_verified: false,
        subscription_tier: 'BASIC' as any,
      },
      {
        user_id: companyUserIds[3],
        company_name: 'Al Noor Finance',
        company_name_ar: 'النور المالية',
        description: 'Sharia-compliant financial services and investment advisory.',
        description_ar: 'خدمات مالية متوافقة مع الشريعة والاستشارات الاستثمارية',
        country_id: saudi?.id || uae.id,
        category_id: allCategories.find(c => c.slug === 'finance')?.id,
        service_categories: ['Investment', 'Advisory', 'Wealth Management'],
        service_type: 'LOCAL' as any,
        is_verified: true,
        subscription_tier: 'PREMIUM' as any,
      },
      {
        user_id: companyUserIds[4],
        company_name: 'MedCare Healthcare',
        company_name_ar: 'ميدكير للرعاية الصحية',
        description: 'Comprehensive healthcare solutions and medical equipment distribution.',
        description_ar: 'حلول رعاية شاملة وتوزيع المعدات الطبية',
        country_id: uae.id,
        category_id: allCategories.find(c => c.slug === 'healthcare')?.id,
        service_categories: ['Medical Equipment', 'Health Tech', 'Hospital Supplies'],
        service_type: 'INTERNATIONAL' as any,
        is_verified: false,
        subscription_tier: 'BASIC' as any,
      },
      {
        user_id: companyUserIds[5],
        company_name: 'Istanbul Trading Co.',
        company_name_ar: 'شركة اسطنبول للتجارة',
        description: 'International trade company connecting Turkish manufacturers with global markets.',
        description_ar: 'شركة تجارة دولية تربط المصنعين الأتراك بالأسواق العالمية',
        country_id: turkey?.id || uae.id,
        category_id: allCategories.find(c => c.slug === 'import-export')?.id,
        service_categories: ['Import', 'Export', 'Logistics'],
        service_type: 'INTERNATIONAL' as any,
        is_verified: true,
        subscription_tier: 'PREMIUM' as any,
      },
    ];

    for (const comp of companyData) {
      const existing = await prisma.companies.findFirst({ where: { company_name: comp.company_name } });
      if (!existing) {
        await prisma.companies.create({ data: comp as any });
      }
    }
    console.log('✓ Companies seeded');
  }

  // ==================== Articles ====================
  if (adminUser && uae) {
    const authorId = adminUser.id;
    if (authorId && uae) {
      const articlesData = [
        {
          title: 'Starting a Business in Dubai: Complete Guide 2024',
          title_ar: 'بدء أعمال في دبي: دليل شامل 2024',
          slug: 'starting-business-dubai-2024',
          content: 'Dubai offers incredible opportunities for entrepreneurs and businesses. From free trade zones to tax benefits, this comprehensive guide covers everything you need to know about setting up a business in the UAE.',
          content_ar: 'توفر دبي فرصا مذهلة لرواد الأعمال والشركات. من المناطق الحرة إلى المزايا الضريبية، يغطي هذا الدليل الشامل كل ما تحتاج معرفته عن إنشاء شركة في الإمارات.',
          excerpt: 'A comprehensive guide to company formation in Dubai and the UAE.',
          excerpt_ar: 'دليل شامل لتأسيس الشركات في دبي والإمارات.',
          cover_image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
          author_id: authorId,
          country_id: uae.id,
          category_id: techCat?.id,
          module: 'BUSINESS_HUB' as any,
          tags: ['dubai', 'business', 'setup', 'uae'],
          status: 'PUBLISHED' as any,
          published_at: new Date('2024-01-20'),
        },
        {
          title: 'UAE Investment Landscape 2024',
          title_ar: 'مشهد الاستثمار في الإمارات 2024',
          slug: 'uae-investment-landscape-2024',
          content: 'The UAE continues to be a top destination for foreign investment. With new visa reforms, 100% foreign ownership in many sectors, and world-class infrastructure, the opportunities are endless.',
          content_ar: 'تستمر الإمارات في كوجهة رئيسية للأجنبية. مع إصلاحات التأشيرة الجديدة و100% ملكية أجنبية في العديد من القطاعات والبنية التحتية عالمية المستوى.',
          excerpt: 'Why the UAE remains a top destination for international investors.',
          excerpt_ar: 'لماذا تظل الإمارات وجهة رئيسية للمستثمرين الدوليين.',
          cover_image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800',
          author_id: authorId,
          country_id: uae.id,
          module: 'INVESTMENT_TOURISM' as any,
          tags: ['investment', 'uae', 'opportunities'],
          status: 'PUBLISHED' as any,
          published_at: new Date('2024-01-22'),
        },
        {
          title: 'Cross-Border Trade: Opportunities in 2024',
          title_ar: 'التجارة عبر الحدود: فرص في 2024',
          slug: 'cross-border-trade-2024',
          content: 'Emerging trends in international trade and how businesses can leverage cross-border opportunities in the Middle East, Africa, and South Asia regions.',
          content_ar: 'اتجاهات متنامية في التجارة الدولية وكيف يمكن للشركات الاستفادة من الفرص عبر الحدود.',
          excerpt: 'Emerging trends in international trade and commerce.',
          excerpt_ar: 'اتجاهات متنامية في التجارة الدولية.',
          cover_image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
          author_id: authorId,
          module: 'BUSINESS_HUB' as any,
          tags: ['trade', 'international', 'business'],
          status: 'PUBLISHED' as any,
          published_at: new Date('2024-01-18'),
        },
        {
          title: 'Digital Transformation for SMEs',
          title_ar: 'التحول الرقمي للشركات الصغيرة والمتوسطة',
          slug: 'digital-transformation-smes',
          content: 'How small and medium businesses can leverage technology to grow, reduce costs, and compete with larger enterprises in the digital age.',
          content_ar: 'كيف يمكن للشركات الصغيرة والمتوسطة الاستفادة من التكنولوجيا للنمو وتخفيض التكاليف.',
          excerpt: 'How small businesses can leverage technology to grow.',
          excerpt_ar: 'كيف يمكن للشركات الصغيرة الاستفادة من التكنولوجيا.',
          cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
          author_id: authorId,
          module: 'BUSINESS_HUB' as any,
          tags: ['digital', 'sme', 'technology'],
          status: 'PUBLISHED' as any,
          published_at: new Date('2024-01-15'),
        },
        {
          title: 'Saudi Vision 2030: Investment Opportunities',
          title_ar: 'رؤية السعودية 2030: فرص استثمارية',
          slug: 'saudi-vision-2030',
          content: 'Exploring the massive investment opportunities created by Saudi Arabia Vision 2030 initiative, from NEOM to the Red Sea Project.',
          content_ar: 'استكشاف الفرص الاستثمارية الهائلة التيcreateFormتت by رؤية السعودية 2030.',
          excerpt: 'Exploring opportunities in Saudi Arabia Vision 2030.',
          excerpt_ar: 'استكشاف الفرص في رؤية السعودية 2030.',
          cover_image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800',
          author_id: authorId,
          country_id: saudi?.id,
          module: 'INVESTMENT_TOURISM' as any,
          tags: ['saudi', 'vision2030', 'investment'],
          status: 'PUBLISHED' as any,
          published_at: new Date('2024-01-25'),
        },
      ];

      for (const art of articlesData) {
        const existing = await prisma.articles.findFirst({ where: { slug: art.slug } });
        if (!existing) {
          await prisma.articles.create({ data: art as any });
        }
      }
      console.log('✓ Articles seeded');
    }
  }

  // ==================== Projects ====================
  if (uae) {
    const projectsData = [
      {
        title: 'Dubai Smart City Initiative',
        title_ar: 'مبادرة مدينة دبي الذكية',
        description: 'Large-scale urban development project focused on sustainability and technology integration across Dubai.',
        description_ar: 'مشروع تطوير حضري واسع النطاق يركز على الاستدامة والتكنولوجيا في دبي.',
        project_type: 'GOVERNMENTAL' as any,
        sector: 'REAL_ESTATE' as any,
        status: 'UNDER_CONSTRUCTION' as any,
        country_id: uae.id,
        budget: 500000000,
        roi_percentage: 12.5,
        location: 'Dubai, UAE',
      },
      {
        title: 'Abu Dhabi Tech Park',
        title_ar: 'حديقة أبو ظبي التكنولوجية',
        description: 'New technology park designed to attract global tech companies and startups to Abu Dhabi.',
        description_ar: 'حديقة تكنولوجية جديدة صممت لجذب شركات التكنولوجيا العالمية والشركات الناشئة.',
        project_type: 'GOVERNMENTAL' as any,
        sector: 'INDUSTRY' as any,
        status: 'OFF_PLAN' as any,
        country_id: uae.id,
        budget: 200000000,
        roi_percentage: 15.0,
        location: 'Abu Dhabi, UAE',
      },
      {
        title: 'Organic Farm Expansion Egypt',
        title_ar: 'توسيع المزرعة العضوية في مصر',
        description: 'Expanding organic farming operations to meet growing regional demand for healthy food products.',
        description_ar: 'توسيع عمليات الزراعة العضوية لتلبية الطلب الإقليمي المتنامي.',
        project_type: 'INDIVIDUAL' as any,
        sector: 'AGRICULTURE' as any,
        status: 'OPERATIONAL' as any,
        country_id: countries.find(c => c.code === 'EG')?.id,
        budget: 2000000,
        roi_percentage: 8.0,
        location: 'Cairo, Egypt',
      },
      {
        title: 'Solar Energy Farm Morocco',
        title_ar: 'مزرعة الطاقة الشمسية المغرب',
        description: 'Utility-scale solar installation providing clean energy to local communities.',
        description_ar: 'instalación طاقة شمسية توفر طاقة نظيفة للمجتمعات المحلية.',
        project_type: 'GOVERNMENTAL' as any,
        sector: 'OTHER' as any,
        status: 'UNDER_CONSTRUCTION' as any,
        country_id: countries.find(c => c.code === 'MA')?.id,
        budget: 15000000,
        roi_percentage: 10.0,
        location: 'Marrakech, Morocco',
      },
      {
        title: 'Istanbul Manufacturing Hub',
        title_ar: 'مركز التصنيع في إسطنبول',
        description: 'Industrial manufacturing zone with export-oriented production facilities.',
        description_ar: 'منطقة تصنيع صناعية مر设施ات إنتاج موجهة للتصدير.',
        project_type: 'GOVERNMENTAL' as any,
        sector: 'INDUSTRY' as any,
        status: 'UNDER_CONSTRUCTION' as any,
        country_id: turkey?.id,
        budget: 150000000,
        roi_percentage: 11.0,
        location: 'Istanbul, Turkey',
      },
      {
        title: 'Boutique Hotel Chain Indonesia',
        title_ar: 'سلسلة فنادق بوتيك في إندونيسيا',
        description: 'Developing a chain of eco-friendly boutique hotels in prime tourist locations.',
        description_ar: 'تطوير سلسلة من الفنادق البوتيك الصديقة للبيئة في مواقع سياحية مميزة.',
        project_type: 'INDIVIDUAL' as any,
        sector: 'OTHER' as any,
        status: 'OFF_PLAN' as any,
        country_id: countries.find(c => c.code === 'ID')?.id,
        budget: 5000000,
        roi_percentage: 14.0,
        location: 'Bali, Indonesia',
      },
    ];

    for (const proj of projectsData) {
      if (!proj.country_id) continue;
      const existing = await prisma.projects.findFirst({ where: { title: proj.title } });
      if (!existing) {
        await prisma.projects.create({ data: proj as any });
      }
    }
    console.log('✓ Projects seeded');
  }

  // ==================== Tips ====================
  if (uae) {
    const tipsData = [
      {
        country_id: uae.id,
        title: 'Free Zone Benefits',
        title_ar: 'مزايا المناطق الحرة',
        content: 'UAE offers over 40 free zones with 100% foreign ownership, zero corporate tax, and full profit repatriation.',
        content_ar: 'تoffer الإمارات أكثر من 40 منطقة حرة مع 100% ملكية أجنبية وصفر ضريبة أرباح.',
        module: 'BUSINESS_HUB' as any,
        display_mode: 'WEB_STATIC' as any,
        sort_order: 1,
      },
      {
        country_id: uae.id,
        title: 'Golden Visa Program',
        title_ar: 'برنامج التأشيرة الذهبية',
        content: '10-year golden visa available for investors, entrepreneurs, and specialized talents.',
        content_ar: 'تأشيرة ذهبية لمدة 10 سنوات متاحة للمستثمرين ورواد الأعمال والمواهب المتخصصة.',
        module: 'BUSINESS_HUB' as any,
        display_mode: 'WEB_STATIC' as any,
        sort_order: 2,
      },
      {
        country_id: uae.id,
        title: 'Tourism Hotspots',
        title_ar: 'الوجهات السياحية',
        content: 'From Burj Khalifa to Desert Safari, UAE offers world-class tourism experiences.',
        content_ar: 'من برج خليفة إلى السفاري في الصحراء، تقدم الإمارات تجارب سياحية عالمية المستوى.',
        module: 'INVESTMENT_TOURISM' as any,
        display_mode: 'WEB_STATIC' as any,
        sort_order: 3,
      },
    ];

    for (const tip of tipsData) {
      const existing = await prisma.tips.findFirst({ where: { title: tip.title, country_id: tip.country_id } });
      if (!existing) {
        await prisma.tips.create({ data: tip });
      }
    }
    console.log('✓ Tips seeded');
  }

  // ==================== Tourism Activities ====================
  if (uae) {
    const tourismData = [
      {
        country_id: uae.id,
        name: 'Desert Safari Adventure',
        name_ar: 'مغامرة السفاري في الصحراء',
        description: 'Experience the magic of Arabian desert with dune bashing, camel rides, and traditional BBQ dinner.',
        description_ar: 'اختبر سحر الصحراء العربية مع ركوب الكثبان والجمال وعشاء شواء تقليدي.',
        activity_type: 'ADVENTURE' as any,
        sort_order: 1,
      },
      {
        country_id: uae.id,
        name: 'Dubai Creek Dhow Cruise',
        name_ar: 'رحلة داو كريك دبي',
        description: 'Traditional wooden boat cruise along historic Dubai Creek with dinner and entertainment.',
        description_ar: 'رحلة بحرية بمركب خشبي تقليدي على طول كريك دبي التاريخي مع عشاء.',
        activity_type: 'CULTURAL' as any,
        sort_order: 2,
      },
      {
        country_id: uae.id,
        name: 'Abu Dhabi Business Summit',
        name_ar: 'قمة الأعمال في أبو ظبي',
        description: 'Annual business summit connecting investors with government projects and opportunities.',
        description_ar: 'قمة أعمال سنوية تربط المستثمرين بالمشاريع الحكومية والفرص.',
        activity_type: 'BUSINESS' as any,
        sort_order: 3,
      },
      {
        country_id: uae.id,
        name: 'Spa & Wellness Retreat',
        name_ar: 'منتجع السبا والعافية',
        description: 'Luxury wellness experience at world-renowned spas and wellness centers.',
        description_ar: 'تجربة عافية فاخرة في منتجعات ومركز عافية عالمية الشهرة.',
        activity_type: 'WELLNESS' as any,
        sort_order: 4,
      },
    ];

    for (const activity of tourismData) {
      const existing = await prisma.tourism_activities.findFirst({ where: { name: activity.name, country_id: activity.country_id } });
      if (!existing) {
        await prisma.tourism_activities.create({ data: activity });
      }
    }
    console.log('✓ Tourism activities seeded');
  }

  console.log('\n✅ Seed complete!');
  console.log('Countries:', await prisma.countries.count());
  console.log('Companies:', await prisma.companies.count());
  console.log('Articles:', await prisma.articles.count());
  console.log('Projects:', await prisma.projects.count());
  console.log('Categories:', await prisma.categories.count());
  console.log('Emirates:', await prisma.emirates.count());
  console.log('Tips:', await prisma.tips.count());
  console.log('Tourism:', await prisma.tourism_activities.count());
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
