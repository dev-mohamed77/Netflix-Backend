import { Controller, Post, Res, Get, Req, Query } from '@nestjs/common';
import { EndPoint } from 'src/application/config/endpoint';
import { PayMobService } from './paymob.service';
import { ConfigService } from '@nestjs/config';

@Controller(EndPoint.paymob)
export class PayMobController {
  constructor(
    private payMobService: PayMobService,
    private configService: ConfigService,
  ) {}

  @Get()
  async payMobPaymentController(@Res() res, @Query('amount') amount: string) {
    const result = await this.payMobService.getTokenPaymob(amount);

    res.redirect(
      `${this.configService.get<string>('PAYMOB_IFRAME_URL')}=${result}`,
    );
  }

  @Get('callback')
  async payMobCallBackController(@Req() req, @Res() res) {
    console.log(req);
    console.log(res);
  }

  @Get()
  paypalPaymentExecute() {}
}
