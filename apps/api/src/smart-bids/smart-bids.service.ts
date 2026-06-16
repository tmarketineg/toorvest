import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CompaniesService } from '../companies/companies.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { RespondBidDto } from './dto/respond-bid.dto';
import { keysToCamelCase } from '../common/transform.util';

@Injectable()
export class SmartBidsService {
  constructor(
    private prisma: PrismaService,
    private companiesService: CompaniesService,
    private notificationsService: NotificationsService,
  ) {}

  async create(userId: string, dto: CreateBidDto) {
    return keysToCamelCase(
      this.prisma.smart_bids.create({
        data: {
          client_id: userId,
          title: dto.title,
          description: dto.description,
          category_id: dto.categoryId,
          country_id: dto.countryId,
          budget_min: dto.budgetMin,
          budget_max: dto.budgetMax,
          deadline: dto.deadline ? new Date(dto.deadline) : null,
        },
        select: {
          id: true,
          title: true,
          description: true,
          budget_min: true,
          budget_max: true,
          deadline: true,
          status: true,
          created_at: true,
        },
      }),
    );
  }

  async getMyBids(userId: string) {
    return keysToCamelCase(
      this.prisma.smart_bids.findMany({
        where: { client_id: userId },
        orderBy: { created_at: 'desc' },
        include: {
          responses: {
            select: {
              id: true,
              proposal_text: true,
              proposed_budget: true,
              proposed_timeline: true,
              status: true,
              created_at: true,
              company: {
                select: {
                  id: true,
                  company_name: true,
                  logo_url: true,
                  is_verified: true,
                },
              },
            },
          },
          category: { select: { id: true, name: true, name_ar: true } },
          country: { select: { id: true, name: true, code: true } },
        },
      }),
    );
  }

  async findById(id: string) {
    return keysToCamelCase(
      this.prisma.smart_bids.findUnique({
        where: { id },
        include: {
          client: {
            select: { id: true, full_name: true, email: true },
          },
          category: { select: { id: true, name: true, name_ar: true } },
          country: { select: { id: true, name: true, code: true } },
          responses: {
            orderBy: { created_at: 'desc' },
            select: {
              id: true,
              proposal_text: true,
              proposed_budget: true,
              proposed_timeline: true,
              status: true,
              created_at: true,
              company: {
                select: {
                  id: true,
                  company_name: true,
                  logo_url: true,
                  is_verified: true,
                  service_categories: true,
                },
              },
            },
          },
        },
      }),
    );
  }

  async respond(bidId: string, userId: string, dto: RespondBidDto) {
    const company = await this.prisma.companies.findUnique({
      where: { user_id: userId },
    });

    if (!company) {
      throw new ForbiddenException('You must have a registered company to respond');
    }

    await this.companiesService.checkBidLimit(userId);

    const bid = await this.prisma.smart_bids.findUnique({
      where: { id: bidId },
    });

    if (!bid) throw new NotFoundException('Bid not found');
    if (bid.status !== 'PENDING') {
      throw new BadRequestException('This bid is no longer accepting responses');
    }

    const existingResponse = await this.prisma.smart_bid_responses.findFirst({
      where: { bid_id: bidId, company_id: company.id },
    });

    if (existingResponse) {
      throw new BadRequestException('You have already responded to this bid');
    }

    const newResponse = await this.prisma.smart_bid_responses.create({
      data: {
        bid_id: bidId,
        company_id: company.id,
        proposal_text: dto.proposalText,
        proposed_budget: dto.proposedBudget,
        proposed_timeline: dto.proposedTimeline,
      },
      select: {
        id: true,
        proposal_text: true,
        proposed_budget: true,
        proposed_timeline: true,
        status: true,
        created_at: true,
      },
    });

    await this.notificationsService.notifyBidResponse(
      bid.client_id,
      company.company_name,
      bid.title,
    );

    return newResponse;
  }

  async acceptResponse(bidId: string, responseId: string, userId: string) {
    const bid = await this.prisma.smart_bids.findUnique({
      where: { id: bidId },
    });

    if (!bid) throw new NotFoundException('Bid not found');
    if (bid.client_id !== userId) {
      throw new ForbiddenException('Only the bid owner can accept responses');
    }
    if (bid.status !== 'PENDING') {
      throw new BadRequestException('This bid is no longer accepting responses');
    }

    const response = await this.prisma.smart_bid_responses.findUnique({
      where: { id: responseId },
    });

    if (!response || response.bid_id !== bidId) {
      throw new NotFoundException('Response not found for this bid');
    }

    const result = await this.prisma.$transaction([
      this.prisma.smart_bid_responses.update({
        where: { id: responseId },
        data: { status: 'ACCEPTED' },
      }),
      this.prisma.smart_bids.update({
        where: { id: bidId },
        data: { status: 'ACCEPTED' },
      }),
      this.prisma.smart_bid_responses.updateMany({
        where: {
          bid_id: bidId,
          id: { not: responseId },
          status: { in: ['PENDING', 'SHORTLISTED'] },
        },
        data: { status: 'REJECTED' },
      }),
    ]);

    const acceptedResponse = result[0] as { company_id: string };
    const companyUser = await this.prisma.companies.findUnique({
      where: { id: acceptedResponse.company_id },
      select: { user_id: true },
    });

    if (companyUser) {
      await this.notificationsService.notifyBidAccepted(
        companyUser.user_id,
        bid.title,
      );
    }

    return result;
  }

  async shortlistResponse(bidId: string, responseId: string, userId: string) {
    const bid = await this.prisma.smart_bids.findUnique({
      where: { id: bidId },
    });

    if (!bid) throw new NotFoundException('Bid not found');
    if (bid.client_id !== userId) {
      throw new ForbiddenException('Only the bid owner can shortlist responses');
    }
    if (bid.status !== 'PENDING') {
      throw new BadRequestException('This bid is no longer accepting responses');
    }

    const response = await this.prisma.smart_bid_responses.findUnique({
      where: { id: responseId },
    });

    if (!response || response.bid_id !== bidId) {
      throw new NotFoundException('Response not found for this bid');
    }

    return this.prisma.smart_bid_responses.update({
      where: { id: responseId },
      data: { status: 'SHORTLISTED' },
    });
  }
}
