import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },
  namespace: '/notifications',
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<string, string>();

  constructor(private jwtService: JwtService) {}

  private extractJwtFromSocket(client: Socket): string | null {
    const auth = client.handshake?.auth?.token
      || client.handshake?.headers?.authorization?.replace('Bearer ', '');
    return auth || null;
  }

  async handleConnection(client: Socket) {
    const token = this.extractJwtFromSocket(client);
    if (!token) {
      client.disconnect();
      return;
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      client.data = { userId: payload.sub, role: payload.role };
      console.log(`Client connected: ${client.id} user=${payload.sub}`);
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    for (const [userId, socketId] of this.userSockets.entries()) {
      if (socketId === client.id) {
        this.userSockets.delete(userId);
        break;
      }
    }
  }

  @SubscribeMessage('join')
  handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userId: string },
  ) {
    if (client.data?.userId !== data.userId) {
      return { event: 'error', data: 'Cannot join another user room' };
    }
    this.userSockets.set(data.userId, client.id);
    client.join(`user:${data.userId}`);
    return { event: 'joined', data: { userId: data.userId } };
  }

  @SubscribeMessage('leave')
  handleLeave(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userId: string },
  ) {
    this.userSockets.delete(data.userId);
    client.leave(`user:${data.userId}`);
    return { event: 'left', data: { userId: data.userId } };
  }

  sendNotification(userId: string, notification: any) {
    this.server.to(`user:${userId}`).emit('notification', notification);
  }

  broadcastNotification(notification: any) {
    this.server.emit('notification', notification);
  }
}
