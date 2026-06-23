// IPTV-org types
export interface Channel {
  id: string;
  name: string;
  logo: string | null;
  url: string;
  group?: {
    title: string;
  };
  language?: string[];
  country?: string[];
}

export interface Playlist {
  channels: Channel[];
}

// VideoSrc types
export interface Movie {
  id: string;
  title: string;
  image: string;
  rating?: number;
  year?: number;
  duration?: number;
  description?: string;
  genres?: string[];
  imdbId?: string;
}

export interface Series {
  id: string;
  title: string;
  image: string;
  rating?: number;
  year?: number;
  totalSeasons?: number;
  description?: string;
  genres?: string[];
  imdbId?: string;
}

export interface Episode {
  id: string;
  seriesId: string;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  description?: string;
  releaseDate?: string;
}

export interface VideoSource {
  url: string;
  type: 'hls' | 'dash' | 'mp4';
  quality?: string;
  headers?: Record<string, string>;
}

// App types
export interface Favorite {
  id: string;
  type: 'channel' | 'movie' | 'series';
  data: Channel | Movie | Series;
  addedAt: number;
}

export interface AppState {
  favorites: Favorite[];
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (id: string) => void;
  isFavorited: (id: string) => boolean;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export interface SearchFilters {
  query: string;
  type?: 'channel' | 'movie' | 'series';
  country?: string;
  language?: string;
  genre?: string;
}