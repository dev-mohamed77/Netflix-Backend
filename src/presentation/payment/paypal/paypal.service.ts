import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as paypal from 'paypal-rest-sdk';
import { PlanEntity } from 'src/domain/entities/plan.entity';

@Injectable()
export class PayPalService {
  constructor(private configService: ConfigService) {}
  _amnt: number;
  _currency: string;
  createPayPalPayment(amount: number, currency: string) {
    this._amnt = amount;
    paypal.configure({
      mode: 'sandbox',
      client_id: this.configService.get<string>('PAYPAL_CLIENT_ID'),
      client_secret: this.configService.get<string>('PAYPAL_SECRET'),
    });

    const currentCurrency = currency.toUpperCase();

    this._currency = currentCurrency;

    var create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'https://880d-156-219-92-88.ngrok-free.app/paypal/execute',
        cancel_url: 'http://localhost:3000/cancel',
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: 'item',
                sku: 'item',
                price: amount,
                currency: 'USD',
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: currentCurrency,
            total: amount,
          },
          description: 'This is the payment description.',
        },
      ],
    };

    return create_payment_json;
  }

  payPalPaymentExecute(PayerID: string) {
    var execute_payment_json = {
      payer_id: PayerID,
      transactions: [
        {
          amount: {
            currency: this._currency,
            total: this._amnt,
          },
        },
      ],
    };

    return execute_payment_json;
  }
}
