import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { EndPoint } from 'src/application/config/endpoint';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ValidateMongoIdPipe } from 'src/application/pipe/mongo_id_pipe';
import { FavoriteDto } from 'src/domain/dto/favorite.dto';
import { MoviesService } from '../movies/movies.service';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import { MovieEntity } from 'src/domain/entities/movies.entity';

@Controller(EndPoint.favorite)
export class FavoriteController {
  constructor(
    private favoriteService: FavoriteService,
    private moviesService: MoviesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createFavoriteController(
    @Req() req,
    @Body(ValidationPipe) params: FavoriteDto,
  ) {
    await this.favoriteService.createFavoriteService({
      user: req.user.id,
      movie: params.movie,
    });

    const movieID: any = params.movie;

    const updateMovie = await this.moviesService.updateMovieService(movieID, {
      isFavorite: true,
      updatedAt: new Date(Date.now()),
    });

    return {
      status: true,
      message: 'Added successfully',
      result: updateMovie,
    };
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteFavoriteController(
    @Req() req,
    @Body(ValidationPipe) params: FavoriteDto,
  ) {
    await this.favoriteService.deleteOneFavoriteService({
      user: req.user.id,
      movie: params.movie,
    });

    const movieID: any = params.movie;

    const updateMovie = await this.moviesService.updateMovieService(movieID, {
      isFavorite: false,
      updatedAt: new Date(Date.now()),
    });

    return {
      status: true,
      message: 'Deleted successfully',
      result: updateMovie,
    };
  }

  @Post(EndPoint.addOrDeleteFavorite)
  @UseGuards(JwtAuthGuard)
  async addOrDeleteFavoriteController(
    @Req() req,
    @Body(ValidationPipe) params: FavoriteDto,
  ) {
    const isMovieExsit = await this.isMovieExsit(req.user.id, params.movie);

    if (isMovieExsit) {
      await this.favoriteService.deleteOneFavoriteService({
        user: req.user.id,
        movie: params.movie,
      });

      const movieID: any = params.movie;

      const movie = await this.moviesService.updateMovieService(movieID, {
        isFavorite: false,
        updatedAt: new Date(Date.now()),
      });

      return {
        status: true,
        message: 'Deleted successfully',
        result: movie,
      };
    } else {
      await this.favoriteService.createFavoriteService({
        user: req.user.id,
        movie: params.movie,
      });

      const movieID: any = params.movie;

      const movie = await this.moviesService.updateMovieService(movieID, {
        isFavorite: true,
        updatedAt: new Date(Date.now()),
      });

      return {
        status: true,
        message: 'Added successfully',
        result: movie,
      };
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getFavoritesController(
    @Req() req,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const result = await this.favoriteService.getManyFavoritesService(
      {
        user: req.user.id,
      },
      {
        page: parseInt(page),
        limit: parseInt(limit),
      },
    );

    return {
      status: true,
      result: {
        length: result.length,
        page: (Math.abs(parseInt(page)) || 1) - 1,
        data: result,
      },
    };
  }

  @Delete(EndPoint.id)
  @UseGuards(JwtAuthGuard)
  async deleteFavoriteByIdController(
    @Param('id', ValidateMongoIdPipe) id: string,
  ) {
    const result = await this.favoriteService.deleteFavoriteService(id);

    const movieID: any = result.movie;

    const updateMovie = await this.moviesService.updateMovieService(movieID, {
      isFavorite: false,
      updatedAt: new Date(Date.now()),
    });

    console.log(updateMovie);

    return {
      status: true,
      result: updateMovie,
    };
  }

  private isMovieExsit(userID: any, movieID: any) {
    return this.favoriteService.getOneFavoriteService({
      user: userID,
      movie: movieID,
    });
  }
}
