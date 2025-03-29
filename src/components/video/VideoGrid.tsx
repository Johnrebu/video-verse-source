
import React from 'react';
import VideoCard from './VideoCard';
import { Video } from '@/services/mockData';
import VideoCardSkeleton from './VideoCardSkeleton';

interface VideoGridProps {
  videos: Video[];
  loading?: boolean;
  title?: string;
}

const VideoGrid = ({ videos, loading = false, title }: VideoGridProps) => {
  return (
    <div className="w-full">
      {title && (
        <h2 className="text-xl font-semibold mb-4 px-4">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {loading ? (
          Array(8).fill(0).map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))
        ) : (
          videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))
        )}
      </div>
    </div>
  );
};

export default VideoGrid;
