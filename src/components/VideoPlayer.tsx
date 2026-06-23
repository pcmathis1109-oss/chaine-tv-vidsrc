import React, { useRef, useEffect, useState } from 'react';
import HLS from 'hls.js';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  title?: string;
  poster?: string;
  type?: 'hls' | 'dash' | 'mp4';
  autoPlay?: boolean;
  onTimeUpdate?: (time: number) => void;
  onEnded?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  poster,
  type = 'hls',
  autoPlay = false,
  onTimeUpdate,
  onEnded,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Initialize HLS.js for HLS streams
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    if (type === 'hls' && HLS.isSupported()) {
      const hls = new HLS({
        debug: false,
        enableWorker: true,
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(HLS.Events.MANIFEST_PARSED, () => {
        if (autoPlay) {
          video.play().catch((e) => console.log('Autoplay prevented:', e));
        }
      });

      return () => {
        hls.destroy();
      };
    } else if (type === 'mp4') {
      video.src = src;
      if (autoPlay) {
        video.play().catch((e) => console.log('Autoplay prevented:', e));
      }
    }
  }, [src, type, autoPlay]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((e) => console.log('Play prevented:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!isFullscreen) {
        containerRef.current.requestFullscreen?.();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen?.();
        setIsFullscreen(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      onTimeUpdate?.(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black rounded-lg overflow-hidden group"
      style={{ aspectRatio: '16 / 9' }}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress bar */}
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressChange}
          className="w-full h-1 mb-2 cursor-pointer accent-blue-600"
        />

        {/* Controls row */}
        <div className="flex items-center justify-between text-white">
          {/* Left controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlayPause}
              className="p-2 hover:bg-white/20 rounded transition"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            {/* Volume control */}
            <div className="flex items-center gap-1">
              <button
                onClick={toggleMute}
                className="p-2 hover:bg-white/20 rounded transition"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 cursor-pointer accent-blue-600"
              />
            </div>

            {/* Time display */}
            <span className="text-sm ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/20 rounded transition">
              <Settings size={20} />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/20 rounded transition"
            >
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Title overlay */}
      {title && (
        <div className="absolute top-4 left-4 text-white text-lg font-semibold truncate max-w-xs">
          {title}
        </div>
      )}

      {/* Play button overlay */}
      {!isPlaying && (
        <button
          onClick={togglePlayPause}
          className="absolute inset-0 flex items-center justify-center hover:bg-black/20 transition"
        >
          <div className="bg-blue-600 rounded-full p-4 hover:bg-blue-700">
            <Play size={40} className="text-white fill-white" />
          </div>
        </button>
      )}
    </div>
  );
};