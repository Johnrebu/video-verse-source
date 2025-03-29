
import React from 'react';

interface VideoListSkeletonProps {
  count?: number;
}

const VideoListSkeleton = ({ count = 5 }: VideoListSkeletonProps) => {
  return (
    <>
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="flex gap-3 animate-pulse">
          <div className="w-40 h-24 rounded-lg bg-muted shrink-0"></div>
          <div className="flex-1">
            <div className="h-4 bg-muted rounded mb-2 w-full"></div>
            <div className="h-3 bg-muted rounded mb-2 w-2/3"></div>
            <div className="h-2 bg-muted rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default VideoListSkeleton;
