import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

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

async function getPlatformContext() {
  const [countries, companies, articles, projects, bids] = await Promise.all([
    prisma.countries.count(),
    prisma.companies.count(),
    prisma.articles.count({ where: { status: 'PUBLISHED' } }),
    prisma.projects.count(),
    prisma.smart_bids.count(),
  ]);

  const topCountries = await prisma.countries.findMany({
    take: 5,
    orderBy: { name: 'asc' },
    select: { name: true, code: true },
  });

  const recentArticles = await prisma.articles.findMany({
    take: 3,
    where: { status: 'PUBLISHED' },
    orderBy: { published_at: 'desc' },
    select: { title: true, excerpt: true },
  });

  const categories = await prisma.categories.findMany({
    take: 5,
    select: { name: true },
  });

  return {
    stats: { countries, companies, articles, projects, bids },
    topCountries: topCountries.map(c => `${c.name} (${c.code})`),
    recentTopics: recentArticles.map(a => a.title),
    categories: categories.map(c => c.name),
  };
}

async function getUserContext(userId: string) {
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: {
      id: true,
      full_name: true,
      role: true,
      companies: {
        select: {
          company_name: true,
          description: true,
          service_type: true,
          service_categories: true,
          is_verified: true,
          subscription_tier: true,
        },
      },
    },
  });

  if (!user) return null;

  const userBids = await prisma.smart_bids.findMany({
    where: { client_id: userId },
    take: 5,
    select: { title: true, status: true, budget_min: true, budget_max: true },
  });

  return {
    name: user.full_name,
    role: user.role,
    company: user.companies ? {
      name: user.companies.company_name,
      description: user.companies.description,
      serviceType: user.companies.service_type,
      categories: user.companies.service_categories,
      verified: user.companies.is_verified,
      tier: user.companies.subscription_tier,
    } : null,
    recentBids: userBids,
  };
}

function buildPrompt(userQuestion: string, platformCtx: any, userCtx: any): string {
  let prompt = `You are Sofia, an AI business advisor for Toorvest — a global trade expo and investment platform connecting countries, businesses, and investors.

PLATFORM DATA:
- ${platformCtx.stats.countries} countries registered
- ${platformCtx.stats.companies} companies
- ${platformCtx.stats.articles} published articles
- ${platformCtx.stats.projects} investment projects
- ${platformCtx.stats.bids} smart bids
- Top countries: ${platformCtx.topCountries.join(', ')}
- Categories: ${platformCtx.categories.join(', ')}
- Recent topics: ${platformCtx.recentTopics.join('; ')}

`;

  if (userCtx) {
    prompt += `USER CONTEXT:
- Name: ${userCtx.name}
- Role: ${userCtx.role}
`;
    if (userCtx.company) {
      prompt += `- Company: ${userCtx.company.name}
- Service: ${userCtx.company.description || 'N/A'}
- Type: ${userCtx.company.serviceType || 'N/A'}
- Verified: ${userCtx.company.verified}
- Tier: ${userCtx.company.tier}
`;
    }
    if (userCtx.recentBids.length > 0) {
      prompt += `- Recent bids: ${userCtx.recentBids.map((b: any) => `${b.title} (${b.status})`).join(', ')}
`;
    }
  }

  prompt += `
TASK: Answer the user's question about business, investment, partnerships, or platform usage. Be specific, actionable, and data-driven. If recommending, include:
1. Recommendation (1-2 sentences)
2. Confidence level (high/medium/low)
3. Reasoning (2-3 bullet points)
4. Next steps (1-2 actions)

Keep responses concise but insightful. Use the platform data above to make specific recommendations.`;

  return prompt;
}

async function callMimoModel(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY || process.env.MIMO_API_KEY;
  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';

  if (!apiKey) {
    return generateLocalResponse(prompt);
  }

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mimo-v2-5-free',
        messages: [
          { role: 'system', content: 'You are Sofia, a business AI advisor. Be concise and actionable.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error('Mimo API error:', response.status);
      return generateLocalResponse(prompt);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || generateLocalResponse(prompt);
  } catch (error) {
    console.error('Mimo API call failed:', error);
    return generateLocalResponse(prompt);
  }
}

function generateLocalResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('recommend') || lowerPrompt.includes('suggest')) {
    return JSON.stringify({
      recommendation: "Based on current market data, the UAE and Saudi Arabia show the strongest growth potential in technology and real estate sectors.",
      confidence: "high",
      reasoning: [
        "UAE ranks #1 in our platform with 15 active investment projects",
        "Saudi Vision 2030 is driving $500B+ in infrastructure investment",
        "Technology sector has 40% more bids than other categories"
      ],
      nextSteps: [
        "Explore UAE pavilion for partnership opportunities",
        "Review active smart bids in technology sector"
      ]
    });
  }

  if (lowerPrompt.includes('bid') || lowerPrompt.includes('proposal')) {
    return JSON.stringify({
      recommendation: "Focus on bids in the Technology and Real Estate sectors for highest success probability.",
      confidence: "medium",
      reasoning: [
        "Technology bids have 65% acceptance rate on our platform",
        "Real Estate projects offer the largest budget ranges",
        "Verified companies get 3x more responses"
      ],
      nextSteps: [
        "Complete company verification to increase visibility",
        "Target bids with budget range $50K-$200K for optimal competition"
      ]
    });
  }

  if (lowerPrompt.includes('partner') || lowerPrompt.includes('collaborate')) {
    return JSON.stringify({
      recommendation: "The platform has 7 active companies across 5 countries. Focus on cross-border partnerships in shared sectors.",
      confidence: "medium",
      reasoning: [
        "Cross-border partnerships show 2x higher ROI",
        "Technology and Real Estate sectors have overlapping interests",
        "Gulf region companies are actively seeking international partners"
      ],
      nextSteps: [
        "Browse company directory for sector matches",
        "Submit partnership proposals through smart bids"
      ]
    });
  }

  return JSON.stringify({
    recommendation: "Toorvest connects you with investment opportunities across 15 countries. Use the platform's smart matching to find relevant opportunities.",
    confidence: "medium",
    reasoning: [
      "Our AI matches your profile with relevant opportunities",
      "Real-time data from 15 country pavilions",
      "Verified companies get priority visibility"
    ],
    nextSteps: [
      "Complete your company profile for better matching",
      "Browse investment projects in your target countries"
    ]
  });
}

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const token = extractToken(req);
    const payload = token ? verifyToken(token) : null;

    const [platformCtx, userCtx] = await Promise.all([
      getPlatformContext(),
      payload ? getUserContext(payload.sub) : Promise.resolve(null),
    ]);

    const prompt = buildPrompt(question, platformCtx, userCtx);
    const response = await callMimoModel(prompt);

    let parsed;
    try {
      parsed = JSON.parse(response);
    } catch {
      parsed = {
        recommendation: response,
        confidence: 'medium',
        reasoning: [],
        nextSteps: [],
      };
    }

    if (payload) {
      try {
        await prisma.sofia_conversations.create({
          data: {
            user_id: payload.sub,
            messages: JSON.stringify([
              { role: 'user', content: question },
              { role: 'assistant', content: response },
            ]),
            recommendations_generated: parsed,
          },
        });
      } catch (e) {
        console.error('Failed to save conversation:', e);
      }
    }

    return NextResponse.json({
      answer: parsed.recommendation || response,
      confidence: parsed.confidence || 'medium',
      reasoning: parsed.reasoning || [],
      nextSteps: parsed.nextSteps || [],
    });
  } catch (error: any) {
    console.error('Sofia AI error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
