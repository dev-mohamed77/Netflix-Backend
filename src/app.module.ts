import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './presentation/auth/auth.module';
import { UsersModule } from './presentation/users/users.module';
import { GategoryModule } from './presentation/categories/categoties.module';
import { PlanModule } from './presentation/plan/plan.module';
import { MoviesModule } from './presentation/movies/movies.module';
import { FavoriteModule } from './presentation/favorite/favorite.module';
import { PayPalModule } from './presentation/payment/paypal/paypal.module';
import { PayMobModule } from './presentation/payment/paymob/paymob.module';
import { BannerModule } from './presentation/banner/banner.module';
import { HomeModule } from './presentation/home/home.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_PROJECT_NAME}.d9rsssm.mongodb.net/?retryWrites=true&w=majority`,
    ),

    AuthModule,
    UsersModule,
    GategoryModule,
    HomeModule,
    PlanModule,
    MoviesModule,
    FavoriteModule,
    PayMobModule,
    PayPalModule,
    BannerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
