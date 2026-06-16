import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { keysToCamelCase } from '../common/transform.util';

@Injectable()
export class NotificationsService {
  constructor(
    private gateway: NotificationsGateway,
    private prisma: PrismaService,
  ) {}

  async create(dto: CreateNotificationDto) {
    const notification = await this.prisma.notifications.create({
      data: {
        user_id: dto.userId,
        title: dto.title,
        message: dto.message,
        type: dto.type,
        link: dto.link,
      },
    });

    this.gateway.sendNotification(dto.userId, {
      ...notification,
      timestamp: notification.created_at.toISOString(),
    });

    return notification;
  }

  async findAllForUser(userId: string, unreadOnly = false) {
    return keysToCamelCase(
      this.prisma.notifications.findMany({
        where: {
          user_id: userId,
          ...(unreadOnly ? { is_read: false } : {}),
        },
        orderBy: { created_at: 'desc' },
      }),
    );
  }

  async markAsRead(notificationId: string, userId: string) {
    return this.prisma.notifications.updateMany({
      where: {
        id: notificationId,
        user_id: userId,
      },
      data: { is_read: true },
    });
  }

  async markAllAsRead(userId: string) {
    return this.prisma.notifications.updateMany({
      where: {
        user_id: userId,
        is_read: false,
      },
      data: { is_read: true },
    });
  }

  async getUnreadCount(userId: string) {
    return this.prisma.notifications.count({
      where: {
        user_id: userId,
        is_read: false,
      },
    });
  }

  sendToUser(userId: string, data: { title: string; message: string; type: string }) {
    this.gateway.sendNotification(userId, {
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  broadcast(data: { title: string; message: string; type: string }) {
    this.gateway.broadcastNotification({
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  async notifyBidResponse(bidOwnerId: string, companyName: string, bidTitle: string) {
    await this.create({
      userId: bidOwnerId,
      title: 'New Bid Response',
      message: `${companyName} responded to your bid: ${bidTitle}`,
      type: 'BID_RESPONSE',
    });
  }

  async notifyBidAccepted(companyUserId: string, bidTitle: string) {
    await this.create({
      userId: companyUserId,
      title: 'Bid Accepted',
      message: `Your proposal for "${bidTitle}" has been accepted!`,
      type: 'BID_ACCEPTED',
    });
  }

  async notifyNewArticle(countryId: string, userIds: string[]) {
    for (const userId of userIds) {
      await this.create({
        userId,
        title: 'New Article',
        message: 'A new article has been published',
        type: 'NEW_ARTICLE',
      });
    }
  }
}
