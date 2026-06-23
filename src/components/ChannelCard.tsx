import React from 'react';
import { Star, Play } from 'lucide-react';
import { Channel } from '@/types';
import { useAppStore } from '@/stores/appStore';

interface ChannelCardProps {
  channel: Channel;
  onClick?: () => void;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({ channel, onClick }) => {
  const { isFavorited, addFavorite, removeFavorite } = useAppStore();
  const isFav = isFavorited(channel.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFav) {
      removeFavorite(channel.id);
    } else {
      addFavorite({
        id: channel.id,
        type: 'channel',
        data: channel,
        addedAt: Date.now(),
      });
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg bg-gray-900 cursor-pointer hover:scale-105 transition-transform duration-300"
    >
      {/* Background image */}
      {channel.logo ? (
        <img
          src={channel.logo}
          alt={channel.name}
          className="w-full h-40 object-cover group-hover:brightness-75 transition-all"
        />
      ) : (
        <div className="w-full h-40 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
          <span className="text-white font-bold text-center px-4 text-sm">
            {channel.name}
          </span>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition">
          <Play size={20} className="fill-white" />
        </button>
        <button
          onClick={handleFavorite}
          className={`p-3 rounded-full transition ${
            isFav
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          <Star size={20} className={isFav ? 'fill-white' : 'text-white'} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3 bg-gray-800">
        <h3 className="text-white font-semibold truncate text-sm">
          {channel.name}
        </h3>
        {channel.country && (
          <p className="text-gray-400 text-xs">
            {channel.country.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
};