import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { Roles } from '../auth/role.decorator';
import { Role } from 'src/application/config/roles';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import { BannerDto, UpdateBannerDto } from 'src/domain/dto/banner.dto';
import { EndPoint } from 'src/application/config/endpoint';
import { ValidateMongoIdPipe } from 'src/application/pipe/mongo_id_pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/application/common/cloudinary/cloudinary.service';

@Controller(EndPoint.banner)
export class BannerController {
  constructor(
    private bannerService: BannerService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @Roles(Role.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createBannerController(
    @UploadedFile() image: Express.Multer.File,
    @Body(ValidationPipe) params: BannerDto,
  ) {
    const uploadImage = await this.cloudinaryService.uploadImage(
      image,
      'Banners',
    );

    const result = await this.bannerService.createBannerService({
      image: uploadImage.url,
      movie: params.movie,
    });

    return {
      status: true,
      result,
    };
  }

  @Get()
  async getBannersController(
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    const result = await this.bannerService.getBannersService({
      limit: parseInt(limit),
      page: parseInt(page),
    });

    return {
      status: true,
      result,
    };
  }

  @Get(EndPoint.id)
  async getBannerByIDController(@Param('id', ValidateMongoIdPipe) id: string) {
    const result = await this.bannerService.getBannerByIDService(id);

    return {
      status: true,
      result,
    };
  }

  @Put(EndPoint.id)
  @Roles(Role.admin, Role.manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('image'))
  async updateBannerController(
    @Param('id', ValidateMongoIdPipe) id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body(ValidationPipe) params: UpdateBannerDto,
  ) {
    let imageUrl: string;

    if (image) {
      const uploadImage = await this.cloudinaryService.uploadImage(
        image,
        'Banners',
      );
      imageUrl = uploadImage.url;
    }

    const result = await this.bannerService.updateBannerService(id, {
      image: imageUrl,
      movie: params.movie,
    });

    return {
      status: true,
      result,
    };
  }

  @Delete(EndPoint.id)
  @Roles(Role.admin, Role.manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async deleteBannerController(@Param('id', ValidateMongoIdPipe) id: string) {
    const result = await this.bannerService.deleteBannerByIDService(id);

    return {
      status: true,
      result,
    };
  }
}
