
import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '@/services/mockData';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { PlayCircle } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  horizontal?: boolean;
  showPlayButton?: boolean;
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

const VideoCard = ({ video, horizontal = false, showPlayButton = false }: VideoCardProps) => {
  const uploadedDate = new Date(video.uploadDate);
  const timeAgo = formatDistanceToNow(uploadedDate, { addSuffix: true });
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className={cn(
        "group transition-transform duration-300 hover:scale-[1.02]",
        horizontal ? "flex gap-3" : "flex flex-col animate-fade-in"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
          className={cn(
            "w-full h-full object-cover transition-transform duration-300",
            isHovered ? "scale-110" : "scale-100"
          )}
          loading="lazy"
        />
        {showPlayButton && isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300">
            <PlayCircle className="w-12 h-12 text-white opacity-90" />
          </div>
        )}
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
          {video.duration}
        </div>
        <div className="absolute top-1 right-1 bg-primary/80 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
          {video.category}
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
              className="w-9 h-9 rounded-full object-cover transition-transform duration-300 hover:scale-110" 
            />
          </Link>
        )}
        
        <div className="flex-1 min-w-0">
          <Link to={`/video/${video.id}`} className="block">
            <h3 className={cn(
              "font-medium line-clamp-2 text-foreground transition-colors duration-200 hover:text-primary",
              horizontal ? "text-sm" : "text-base"
            )}>
              {video.title}
            </h3>
          </Link>
          
          <Link to={`/channel/${video.user.id}`} className="mt-1 block">
            <p className="text-muted-foreground text-sm truncate transition-colors duration-200 hover:text-foreground">
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
