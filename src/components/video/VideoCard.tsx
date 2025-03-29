
import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '@/services/mockData';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  video: Video;
  horizontal?: boolean;
}

// Function to format view counts
const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`;
  } else {
    return `${views} views`;
  }
};

const VideoCard = ({ video, horizontal = false }: VideoCardProps) => {
  const uploadedDate = new Date(video.uploadDate);
  const timeAgo = formatDistanceToNow(uploadedDate, { addSuffix: true });

  return (
    <div className={cn(
      "group",
      horizontal ? "flex gap-3" : "flex flex-col"
    )}>
      <Link 
        to={`/video/${video.id}`} 
        className={cn(
          "relative rounded-lg overflow-hidden bg-muted",
          horizontal ? "w-40 h-24 shrink-0" : "aspect-video w-full"
        )}
      >
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105" 
          loading="lazy"
        />
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
          {video.duration}
        </div>
      </Link>

      <div className={cn(
        "flex gap-2 mt-2",
        horizontal ? "flex-1" : ""
      )}>
        {!horizontal && (
          <Link to={`/channel/${video.user.id}`} className="shrink-0">
            <img 
              src={video.user.avatar} 
              alt={video.user.name} 
              className="w-9 h-9 rounded-full object-cover" 
            />
          </Link>
        )}
        
        <div className="flex-1 min-w-0">
          <Link to={`/video/${video.id}`} className="block">
            <h3 className={cn(
              "font-medium line-clamp-2 text-foreground",
              horizontal ? "text-sm" : "text-base"
            )}>
              {video.title}
            </h3>
          </Link>
          
          <Link to={`/channel/${video.user.id}`} className="mt-1 block">
            <p className="text-muted-foreground text-sm truncate">
              {video.user.name}
            </p>
          </Link>
          
          <p className="text-muted-foreground text-xs">
            {formatViews(video.views)} • {timeAgo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
