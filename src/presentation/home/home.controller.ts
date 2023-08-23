import { Controller, Get, Post } from '@nestjs/common';
import { HomeService } from './home.service';
import { BannerService } from '../banner/banner.service';

@Controller()
export class HomeController {
  constructor(
    private homeService: HomeService,
    private bannerService: BannerService,
  ) {}

  @Get()
  async home() {
    const result = await Promise.all([
      this.bannerService.getBannersService({ limit: 10, page: 1 }),
      this.homeService.getTopTenMoviesService(),
      this.homeService.getNewReleaseMoviesService(),
    ]);

    return {
      status: true,
      result: {
        banners: result[0],
        topTenMovies: result[1],
        newReleaseMovies: result[2],
      },
    };
  }

  @Post()
  async getNewRealeseMoviesController() {
    const result = await this.homeService.getNewReleaseMoviesService();
    console.log(`result: ${result}`);

    return {
      status: true,
      result,
    };
  }
}
