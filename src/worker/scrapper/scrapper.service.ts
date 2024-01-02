import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { TmdbAdapter } from './tmdb.adapter';

@Injectable()
export class ScrapperService {
  constructor(
    private tmdbAdapter: TmdbAdapter,
    private movieRepository: MovieRepository,
  ) {}

  async getMovieDetails(id: number) {
    console.log('Getting movie', id);

    const movie = await this.tmdbAdapter.getMovieDetails(id);
    await this.movieRepository.upsert(movie);

    console.log('Success');
  }
}
