import { Module } from '@nestjs/common';
import { PayMobController } from './paymob.controller';
import { PayMobService } from './paymob.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [PayMobController],
  providers: [PayMobService],
})
export class PayMobModule {}
