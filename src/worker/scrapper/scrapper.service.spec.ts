import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MovieRepository } from './movie.repository';
import { ScrapperService } from './scrapper.service';
import { TmdbAdapter } from './tmdb.adapter';

describe('ScrapperService', () => {
  let scrapperService: ScrapperService;
  let tmdbAdapter: TmdbAdapter;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot('mongodb://mongo/letsMovie'),
      ],
      providers: [ScrapperService, TmdbAdapter, MovieRepository],
    }).compile();

    scrapperService = app.get<ScrapperService>(ScrapperService);
    tmdbAdapter = app.get<TmdbAdapter>(TmdbAdapter);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      jest
        .spyOn(tmdbAdapter, 'getMovieDetails')
        .mockImplementation(async (id: number) => ({ id, title: 'Titanic' }));

      await scrapperService.getMovieDetails(3);
    });
  });
});
