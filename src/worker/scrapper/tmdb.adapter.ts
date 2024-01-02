import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class TmdbAdapter {
  private instance: AxiosInstance;

  constructor(configService: ConfigService) {
    const token = configService.get<string>('TMDB_API_TOKEN');

    this.instance = axios.create({
      baseURL: 'https://api.themoviedb.org/3',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getMovieDetails(id: number) {
    console.log('Fetching movie');
    const response = await this.instance.get('/movie/' + id.toString());
    return response.data;
  }
}
