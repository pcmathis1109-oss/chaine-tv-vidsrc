import { useQuery } from '@tanstack/react-query';
import { videosrcApi } from '@/services/videosrcApi';

export const useMovie = (imdbId: string) => {
  return useQuery({
    queryKey: ['movie', imdbId],
    queryFn: () => videosrcApi.getMovie(imdbId),
    enabled: !!imdbId,
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });
};

export const useMovieSources = (imdbId: string) => {
  return useQuery({
    queryKey: ['movie-sources', imdbId],
    queryFn: () => videosrcApi.getMovieSources(imdbId),
    enabled: !!imdbId,
    staleTime: 1000 * 60 * 30,
    retry: 3,
  });
};

export const useSeries = (imdbId: string) => {
  return useQuery({
    queryKey: ['series', imdbId],
    queryFn: () => videosrcApi.getSeries(imdbId),
    enabled: !!imdbId,
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });
};

export const useSeasons = (imdbId: string) => {
  return useQuery({
    queryKey: ['seasons', imdbId],
    queryFn: () => videosrcApi.getSeasons(imdbId),
    enabled: !!imdbId,
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });
};

export const useEpisodeSources = (
  imdbId: string,
  seasonNumber: number,
  episodeNumber: number
) => {
  return useQuery({
    queryKey: ['episode-sources', imdbId, seasonNumber, episodeNumber],
    queryFn: () =>
      videosrcApi.getEpisodeSources(imdbId, seasonNumber, episodeNumber),
    enabled: !!imdbId && seasonNumber !== undefined && episodeNumber !== undefined,
    staleTime: 1000 * 60 * 30,
    retry: 3,
  });
};

export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ['search-movies', query],
    queryFn: () => videosrcApi.searchMovies(query),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 30,
    retry: 3,
  });
};

export const useSearchSeries = (query: string) => {
  return useQuery({
    queryKey: ['search-series', query],
    queryFn: () => videosrcApi.searchSeries(query),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 30,
    retry: 3,
  });
};

export const useTrending = () => {
  return useQuery({
    queryKey: ['trending'],
    queryFn: () => videosrcApi.getTrending(),
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });
};