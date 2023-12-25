import {
  OnQueueActive,
  OnQueueError,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { MovieRepository } from './movie.repository';
import { TmdbAdapter } from './tmdb.adapter';

@Processor('tmdb')
export class TmdbProcessor {
  constructor(
    private tmdbAdapter: TmdbAdapter,
    private movieRepository: MovieRepository,
  ) {}

  @Process('getMovieDetails')
  async getMovieDetails(job: Job<{ id: number }>) {
    const { id } = job.data;

    console.log('Getting movie', id);

    const movie = await this.tmdbAdapter.getMovieDetails(id);
    await this.movieRepository.upsert(movie);

    console.log('Success');

    return {};
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueError()
  onQueueError(error) {
    console.log(error.failedReason);
    console.log(error.stacktrace);
  }

  @OnQueueFailed()
  onQueueFailed(error) {
    console.log(error.failedReason);
    console.log(error.stacktrace);
  }
}
