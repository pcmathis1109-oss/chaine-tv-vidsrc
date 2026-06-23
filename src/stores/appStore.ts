import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, Favorite } from '@/types';

export const useAppStore = create<AppState>(
  persist(
    (set, get) => ({
      favorites: [],
      theme: 'dark' as 'light' | 'dark',

      addFavorite: (favorite: Favorite) => {
        set((state) => ({
          favorites: [...state.favorites, favorite],
        }));
      },

      removeFavorite: (id: string) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== id),
        }));
      },

      isFavorited: (id: string) => {
        return get().favorites.some((fav) => fav.id === id);
      },

      setTheme: (theme: 'light' | 'dark') => {
        set({ theme });
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
    }),
    {
      name: 'app-store',
      partialize: (state) => ({
        favorites: state.favorites,
        theme: state.theme,
      }),
    }
  )
);