import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { BannerRepositoryImp } from 'src/infra/repositories/banner.repository.imp';
import { IBannerRepository } from 'src/domain/repositories/banner.repository';
import { GetBannerByIdUseCase } from 'src/domain/usecases/banner/get_banner_by_id.usecase';
import { CreateBannerUseCase } from 'src/domain/usecases/banner/create_banner.usecase';
import { GetBannersUseCase } from 'src/domain/usecases/banner/get_all_banner.usecase';
import { GetManyBannersUseCase } from 'src/domain/usecases/banner/get_many_banner.usecase';
import { GetOneBannerUseCase } from 'src/domain/usecases/banner/get_one_banner.usecase';
import { UpdateBannerUseCase } from 'src/domain/usecases/banner/update_banner.usecase';
import { DeleteBannerUseCase } from 'src/domain/usecases/banner/delete_banner.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerModel, BannerSchema } from 'src/infra/schema/banner.schema';
import { CloudinaryModule } from 'src/application/common/cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BannerModel.name, schema: BannerSchema },
    ]),
    MulterModule.register({
      storage: diskStorage({
        filename(req, file, callback) {
          callback(null, `${Date.now()} + ${file.originalname}`);
        },
      }),
    }),
    CloudinaryModule,
  ],
  controllers: [BannerController],
  exports: [BannerService],
  providers: [
    BannerService,
    {
      provide: BannerRepositoryImp,
      useClass: BannerRepositoryImp,
    },
    {
      provide: CreateBannerUseCase,
      useFactory(repo: IBannerRepository) {
        return new CreateBannerUseCase(repo);
      },
      inject: [BannerRepositoryImp],
    },
    {
      provide: GetBannersUseCase,
      useFactory(repo: IBannerRepository) {
        return new GetBannersUseCase(repo);
      },
      inject: [BannerRepositoryImp],
    },
    {
      provide: GetManyBannersUseCase,
      useFactory(repo: IBannerRepository) {
        return new GetManyBannersUseCase(repo);
      },
      inject: [BannerRepositoryImp],
    },
    {
      provide: GetBannerByIdUseCase,
      useFactory(repo: IBannerRepository) {
        return new GetBannerByIdUseCase(repo);
      },
      inject: [BannerRepositoryImp],
    },
    {
      provide: GetOneBannerUseCase,
      useFactory(repo: IBannerRepository) {
        return new GetOneBannerUseCase(repo);
      },
      inject: [BannerRepositoryImp],
    },
    {
      provide: UpdateBannerUseCase,
      useFactory(repo: IBannerRepository) {
        return new UpdateBannerUseCase(repo);
      },
      inject: [BannerRepositoryImp],
    },
    {
      provide: DeleteBannerUseCase,
      useFactory(repo: IBannerRepository) {
        return new DeleteBannerUseCase(repo);
      },
      inject: [BannerRepositoryImp],
    },
  ],
})
export class BannerModule {}
