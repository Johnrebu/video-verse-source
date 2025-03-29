
import React from 'react';
import VideoCard from './VideoCard';
import { Video } from '@/services/mockData';
import VideoListSkeleton from './VideoListSkeleton';

interface VideoListProps {
  videos: Video[];
  loading?: boolean;
  title?: string;
}

const VideoList = ({ videos, loading = false, title }: VideoListProps) => {
  return (
    <div className="w-full">
      {title && (
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
      )}
      
      <div className="space-y-3">
        {loading ? (
          <VideoListSkeleton count={8} />
        ) : (
          videos.map(video => (
            <VideoCard key={video.id} video={video} horizontal />
          ))
        )}
      </div>
    </div>
  );
};

export default VideoList;
