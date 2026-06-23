import React, { useState } from 'react';
import { Menu, X, Search, Moon, Sun, Heart } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme, favorites } = useAppStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-blue-500 font-bold text-2xl">📺</div>
            <h1 className="text-white font-bold text-xl hidden sm:block">
              Chaîne TV + VidSrc
            </h1>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Right menu */}
          <div className="flex items-center gap-4">
            {/* Favorites */}
            <button className="relative text-gray-300 hover:text-white transition">
              <Heart size={20} />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-gray-300 hover:text-white transition"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-800">
            <div className="pt-4 space-y-2">
              <a href="/" className="block px-4 py-2 text-gray-300 hover:text-white">
                Accueil
              </a>
              <a href="/channels" className="block px-4 py-2 text-gray-300 hover:text-white">
                Chaînes TV
              </a>
              <a href="/movies" className="block px-4 py-2 text-gray-300 hover:text-white">
                Films
              </a>
              <a href="/series" className="block px-4 py-2 text-gray-300 hover:text-white">
                Séries
              </a>
              <a href="/favorites" className="block px-4 py-2 text-gray-300 hover:text-white">
                Favoris
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};