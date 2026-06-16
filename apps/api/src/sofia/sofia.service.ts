import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class SofiaService {
  constructor(private prisma: PrismaService) {}

  async chat(userId: string, dto: ChatDto) {
    const conversation = await this.prisma.sofia_conversations.findFirst({
      where: {
        user_id: userId,
        context_country_id: dto.countryId || null,
        context_sector: dto.sector || null,
      },
      orderBy: { updated_at: 'desc' },
    });

    const existingMessages = (conversation?.messages as any[]) || [];

    const userMessage = {
      role: 'user',
      content: dto.message,
      timestamp: new Date().toISOString(),
    };

    const aiResponse = await this.generateResponse(dto.message, dto.countryId, dto.sector);

    const assistantMessage = {
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString(),
    };

    const messages = [...existingMessages, userMessage, assistantMessage];

    if (conversation) {
      await this.prisma.sofia_conversations.update({
        where: { id: conversation.id },
        data: {
          messages,
          context_country_id: dto.countryId || conversation.context_country_id,
          context_sector: dto.sector || conversation.context_sector,
        },
      });
    } else {
      await this.prisma.sofia_conversations.create({
        data: {
          user_id: userId,
          messages,
          context_country_id: dto.countryId,
          context_sector: dto.sector,
        },
      });
    }

    return {
      message: aiResponse,
      suggestions: this.generateSuggestions(dto.message, dto.countryId),
    };
  }

  async getHistory(userId: string, limit: number) {
    return this.prisma.sofia_conversations.findMany({
      where: { user_id: userId },
      orderBy: { updated_at: 'desc' },
      take: limit,
      select: {
        id: true,
        messages: true,
        context_sector: true,
        context_country_id: true,
        created_at: true,
        updated_at: true,
        country: {
          select: { id: true, name: true, code: true },
        },
      },
    });
  }

  private async generateResponse(message: string, countryId?: string, sector?: string): Promise<string> {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('invest') || lowerMessage.includes('investment')) {
      return 'I can help you explore investment opportunities! Toorvest connects investors with vetted projects across various sectors. Could you tell me more about your investment interests? Are you looking at real estate, technology, agriculture, or another sector?';
    }

    if (lowerMessage.includes('company') || lowerMessage.includes('business')) {
      return 'The Business Hub is where you can discover companies and submit Smart Bids. You can browse companies by country, service type, or category. Would you like me to help you find a specific type of company?';
    }

    if (lowerMessage.includes('country') || lowerMessage.includes('emirate')) {
      return 'We have information about multiple countries and their emirates. Each country profile includes tourism activities, investment tips, and local companies. Which country are you interested in learning more about?';
    }

    if (lowerMessage.includes('project')) {
      return 'Our project listings feature opportunities across real estate, tourism, technology, agriculture, and energy sectors. You can filter by country, type, and status. Would you like me to show you available projects in a specific area?';
    }

    return `Thank you for your message! I'm Sofia, your AI assistant for Toorvest. I can help you with:\n\n- Finding investment opportunities\n- Discovering companies in the Business Hub\n- Exploring countries and their offerings\n- Understanding projects and Smart Bids\n\nWhat would you like to know more about?`;
  }

  private generateSuggestions(message: string, countryId?: string): string[] {
    const suggestions = ['Show me investment opportunities', 'Browse companies', 'Explore countries'];

    if (countryId) {
      suggestions.push('View projects in this country');
      suggestions.push('Find companies in this country');
    }

    return suggestions;
  }
}
