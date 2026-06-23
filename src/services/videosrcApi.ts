import axios from 'axios';
import { Movie, Series, Episode, VideoSource } from '@/types';

const API_BASE = import.meta.env.VITE_VIDEOSRC_API || 'https://api.videosrc.net';

const client = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const videosrcApi = {
  // Get movie details
  async getMovie(imdbId: string): Promise<Movie> {
    try {
      const response = await client.get(`/movie/${imdbId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie ${imdbId}:`, error);
      throw error;
    }
  },

  // Get movie sources
  async getMovieSources(imdbId: string): Promise<VideoSource[]> {
    try {
      const response = await client.get(`/movie/sources/${imdbId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie sources for ${imdbId}:`, error);
      throw error;
    }
  },

  // Get series details
  async getSeries(imdbId: string): Promise<Series> {
    try {
      const response = await client.get(`/tv/${imdbId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching series ${imdbId}:`, error);
      throw error;
    }
  },

  // Get series seasons
  async getSeasons(imdbId: string): Promise<any[]> {
    try {
      const response = await client.get(`/tv/seasons/${imdbId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching seasons for ${imdbId}:`, error);
      throw error;
    }
  },

  // Get episode sources
  async getEpisodeSources(
    imdbId: string,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<VideoSource[]> {
    try {
      const response = await client.get(
        `/tv/sources/${imdbId}/${seasonNumber}/${episodeNumber}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching sources for S${seasonNumber}E${episodeNumber}:`,
        error
      );
      throw error;
    }
  },

  // Search movies
  async searchMovies(query: string): Promise<Movie[]> {
    try {
      const response = await client.get('/search', {
        params: { q: query, type: 'movie' },
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching movies for "${query}":`, error);
      throw error;
    }
  },

  // Search series
  async searchSeries(query: string): Promise<Series[]> {
    try {
      const response = await client.get('/search', {
        params: { q: query, type: 'tv' },
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching series for "${query}":`, error);
      throw error;
    }
  },

  // Get trending content
  async getTrending(): Promise<any[]> {
    try {
      const response = await client.get('/trending');
      return response.data;
    } catch (error) {
      console.error('Error fetching trending content:', error);
      throw error;
    }
  },
};