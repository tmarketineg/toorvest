import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CountriesModule } from './countries/countries.module';
import { ArticlesModule } from './articles/articles.module';
import { CompaniesModule } from './companies/companies.module';
import { SmartBidsModule } from './smart-bids/smart-bids.module';
import { ProjectsModule } from './projects/projects.module';
import { SofiaModule } from './sofia/sofia.module';
import { SearchModule } from './search/search.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AdminModule } from './admin/admin.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      { ttl: 60, limit: 10 },
      { ttl: 60 * 5, limit: 20 },
    ]),
    PrismaModule,
    AuthModule,
    UsersModule,
    CountriesModule,
    ArticlesModule,
    CompaniesModule,
    SmartBidsModule,
    ProjectsModule,
    SofiaModule,
    SearchModule,
    NotificationsModule,
    AdminModule,
    UploadModule,
  ],
})
export class AppModule {}
