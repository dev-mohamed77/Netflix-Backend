import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Roles } from '../auth/role.decorator';
import { Role } from 'src/application/config/roles';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import {
  CategoriesIdsDto,
  MovieDto,
  UpdateMovieDto,
} from 'src/domain/dto/movie.dto';
import { EndPoint } from 'src/application/config/endpoint';
import { ValidateMongoIdPipe } from 'src/application/pipe/mongo_id_pipe';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/application/common/cloudinary/cloudinary.service';
import { MovieEntity } from 'src/domain/entities/movies.entity';

@Controller(EndPoint.movies)
export class MoviesController {
  constructor(
    private moviesService: MoviesService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @Roles(Role.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imageUrl', maxCount: 1 },
      { name: 'streamUrl', maxCount: 1 },
    ]),
  )
  async createMovieController(
    @UploadedFiles()
    files: {
      imageUrl: Express.Multer.File;
      streamUrl: Express.Multer.File;
    },
    @Body(ValidationPipe) params: MovieDto,
  ) {
    let imageUrlResult: string;
    let streamUrlResult: string;

    try {
      if (files.imageUrl) {
        const uploadImage = await this.cloudinaryService.uploadImage(
          files.imageUrl[0],
          'movies_image',
        );
        imageUrlResult = uploadImage.url;
      }

      if (files.streamUrl) {
        const uploadVideo = await this.cloudinaryService.uploadVideo(
          files.streamUrl[0],
          'movies_video',
        );
        streamUrlResult = uploadVideo.url;
      }

      const movie = new MovieEntity({
        title: params.title,
        description: params.description,
        imageUrl: imageUrlResult,
        streamUrl: streamUrlResult,
        language: params.language,
        cast: params.cast,
        directors: params.directors,
        releaseDate: params.releaseDate,
        runtime: params.runtime,
        categories: params.categories,
      });

      const result = await this.moviesService.createMovieService(movie);

      return {
        status: true,
        result,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: false,
          result: err.message,
        },
        err.http_code || err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(EndPoint.id)
  @Roles(Role.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imageUrl', maxCount: 1 },
      { name: 'streamUrl', maxCount: 1 },
    ]),
  )
  async updateMovieController(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body(ValidationPipe)
    params: UpdateMovieDto,
    @UploadedFiles()
    files?: {
      imageUrl: Express.Multer.File;
      streamUrl: Express.Multer.File;
    },
  ) {
    let imageUrlResult: any;
    let streamUrlResult: any;

    try {
      if (files.imageUrl) {
        const uploadImage = await this.cloudinaryService.uploadImage(
          files.imageUrl[0],
          'movies_image',
        );
        imageUrlResult = uploadImage.url;
      }

      if (files.streamUrl) {
        const uploadVideo = await this.cloudinaryService.uploadVideo(
          files.streamUrl[0],
          'movies_video',
        );
        streamUrlResult = uploadVideo.url;
      }

      const movie = new MovieEntity({
        title: params.title,
        description: params.description,
        imageUrl: imageUrlResult,
        streamUrl: streamUrlResult,
        language: params.language,
        cast: params.cast,
        directors: params.directors,
        releaseDate: params.releaseDate,
        runtime: params.runtime,
        categories: params.categories,
      });

      const result = await this.moviesService.updateMovieService(id, movie);

      return {
        status: true,
        result,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: false,
          result: err.message,
        },
        err.http_code || err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //     --------------------------------- Get Movies By Category id -------------------------------------

  @Get(EndPoint.categories)
  async getMoviesByCategory(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Body(ValidationPipe) categoriesDto: CategoriesIdsDto,
  ) {
    const result = await this.moviesService.getManyMoviesService(
      {
        categories: { $in: categoriesDto.categories },
      },
      { page: parseInt(page), limit: parseInt(limit) },
    );

    return {
      status: true,
      result: {
        length: result.length,
        page: Math.abs(parseInt(page)) || 1,
        data: result,
      },
    };
  }

  //     --------------------------------- End Get Movies By Category id -------------------------------------

  @Get(EndPoint.id)
  async getMovieByIDController(@Param('id', ValidateMongoIdPipe) id: string) {
    const movie = await this.moviesService.getMovieByIdService(id);

    const result = await this.moviesService.updateMovieService(movie._id, {
      viewCount: ++movie.viewCount,
    });

    return {
      status: true,
      result,
    };
  }

  @Get()
  async getMoviesController(
    @Query('search') search: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    let result: MovieEntity[];
    if (search) {
      result = await this.moviesService.getManyMoviesService(
        {
          title: { $regex: search, $options: 'i' },
        },
        { page: parseInt(page), limit: parseInt(limit) },
      );
    } else {
      result = await this.moviesService.getMoviesService({
        page: parseInt(page),
        limit: parseInt(limit),
      });
    }

    return {
      status: true,
      result: {
        length: result.length,
        page: (Math.abs(parseInt(page)) || 1) - 1,
        data: result,
      },
    };
  }

  @Roles(Role.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(EndPoint.id)
  async deleteMovieController(@Param('id', ValidateMongoIdPipe) id: string) {
    const result = await this.moviesService.deleteMovieService(id);

    return {
      status: true,
      result,
    };
  }
}
