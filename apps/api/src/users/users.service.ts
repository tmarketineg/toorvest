import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { keysToCamelCase } from '../common/transform.util';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        full_name: true,
        phone: true,
        role: true,
        avatar_url: true,
        is_verified: true,
        created_at: true,
        country: {
          select: { id: true, name: true, code: true, flag_url: true },
        },
      },
    });

    if (!user) throw new NotFoundException('User not found');
    return keysToCamelCase(user);
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return keysToCamelCase(
      this.prisma.users.update({
        where: { id },
        data: {
          full_name: dto.fullName,
          phone: dto.phone,
          avatar_url: dto.avatarUrl,
          country_id: dto.countryId,
        },
        select: {
          id: true,
          email: true,
          full_name: true,
          phone: true,
          role: true,
          avatar_url: true,
          country_id: true,
        },
      }),
    );
  }
}
