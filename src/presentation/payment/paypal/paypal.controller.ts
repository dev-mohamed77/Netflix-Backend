import * as paypal from 'paypal-rest-sdk';
import {
  Controller,
  ParseIntPipe,
  BadRequestException,
  Post,
  Query,
  Res,
  Get,
} from '@nestjs/common';
import { EndPoint } from 'src/application/config/endpoint';
import { PayPalService } from './paypal.service';

@Controller(EndPoint.paypal)
export class PayPalController {
  constructor(private paypalService: PayPalService) {}

  @Get()
  async createPaypalPaymentController(
    @Res() res,
    @Query('amount', ParseIntPipe) amount: number,
    @Query('currency') currency: string,
  ) {
    const result = this.paypalService.createPayPalPayment(amount, currency);

    paypal.payment.create(result, function (error, payment) {
      if (error) {
        throw new BadRequestException(error.message);
      } else {
        console.log('create payment response');
        console.log(payment);
        for (var index = 0; index < payment.links.length; index++) {
          if (payment.links[index].rel === 'approval_url') {
            res.redirect(payment.links[index].href);
          }
        }
      }
    });
  }

  @Get(EndPoint.execute)
  paypalPaymentExecute(
    @Res() res,
    @Query('PayerID') PayerID: string,
    @Query('paymentId') paymentId: string,
  ) {
    const result = this.paypalService.payPalPaymentExecute(PayerID);

    paypal.payment.execute(paymentId, result, function (err, payment) {
      if (err) {
        console.log(err);
        return {
          err,
        };
      } else {
        console.log(JSON.stringify(payment));
      }
    });
  }
}
