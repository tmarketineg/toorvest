import { Module } from '@nestjs/common';
import { SmartBidsController } from './smart-bids.controller';
import { SmartBidsService } from './smart-bids.service';
import { CompaniesModule } from '../companies/companies.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [CompaniesModule, NotificationsModule],
  controllers: [SmartBidsController],
  providers: [SmartBidsService],
})
export class SmartBidsModule {}
