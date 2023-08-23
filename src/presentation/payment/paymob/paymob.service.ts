import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Constant } from 'src/application/config/constant';
const axios = require('axios');

@Injectable()
export class PayMobService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getTokenPaymob(amount: string): Promise<string> {
    const getToken = await this.httpService.axiosRef
      .post('https://accept.paymob.com/api/auth/tokens', {
        api_key: this.configService.get<string>('PAYMOB_API_KEY'),
      })
      .catch((err) => {
        throw new HttpException(err, err.response.status);
      });

    const getOrderId = await this.httpService.axiosRef
      .post('https://accept.paymob.com/api/ecommerce/orders', {
        auth_token: getToken.data.token,
        delivery_needed: 'false',
        amount_cents: amount,
        currency: 'EGP',
        items: [],
      })
      .catch((err) => {
        throw new HttpException(err.message, err.response.status);
      });

    const getPaymentKey = await this.httpService.axiosRef
      .post('https://accept.paymob.com/api/acceptance/payment_keys', {
        auth_token: getToken.data.token,
        amount_cents: amount,
        expiration: 3600,
        order_id: getOrderId.data.id,
        billing_data: {
          apartment: 'NA',
          email: 'NA',
          floor: 'NA',
          first_name: 'NA',
          street: 'NA',
          building: 'NA',
          phone_number: 'NA',
          shipping_method: 'NA',
          postal_code: 'NA',
          city: 'NA',
          country: 'NA',
          last_name: 'NA',
          state: 'NA',
        },
        currency: 'EGP',
        integration_id: 4047084,
        lock_order_when_paid: 'false',
      })
      .catch((err) => {
        throw new HttpException(err, err.response.status);
      });
    return getPaymentKey.data.token;
  }
}
