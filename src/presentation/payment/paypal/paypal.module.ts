import { Module } from '@nestjs/common';
import { PayPalController } from './paypal.controller';
import { PayPalService } from './paypal.service';

@Module({
  imports: [],
  controllers: [PayPalController],
  providers: [PayPalService],
})
export class PayPalModule {}
