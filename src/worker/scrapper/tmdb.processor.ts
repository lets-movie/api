import {
  OnQueueActive,
  OnQueueError,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { ScrapperService } from './scrapper.service';

@Processor('tmdb')
export class TmdbProcessor {
  constructor(private scrapperService: ScrapperService) {}

  @Process('getMovieDetails')
  async getMovieDetails(job: Job<{ id: number }>) {
    const { id } = job.data;
    this.scrapperService.getMovieDetails(id);
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
