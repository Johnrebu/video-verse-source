
import React from 'react';

const VideoCardSkeleton = () => {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="rounded-lg bg-muted aspect-video w-full"></div>
      <div className="flex gap-2 mt-2">
        <div className="w-9 h-9 rounded-full bg-muted shrink-0"></div>
        <div className="flex-1">
          <div className="h-4 bg-muted rounded mb-2 w-full"></div>
          <div className="h-3 bg-muted rounded mb-2 w-2/3"></div>
          <div className="h-2 bg-muted rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardSkeleton;
