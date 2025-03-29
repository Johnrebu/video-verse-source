
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Video } from '@/services/mockData';
import { fetchRecommendedVideos } from '@/services/youtubeApi';
import VideoCard from './VideoCard';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface RecommendationSectionProps {
  currentVideo: Video;
  className?: string;
}

const RecommendationSection = ({ currentVideo, className }: RecommendationSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const { data: recommendedVideos, isLoading } = useQuery({
    queryKey: ['recommended', currentVideo.category],
    queryFn: () => fetchRecommendedVideos(currentVideo.category),
    enabled: !!currentVideo.category,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div 
      className={cn(
        "space-y-4 transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      <h2 className="text-xl font-semibold">Recommended for you</h2>
      
      {isLoading ? (
        <div className="space-y-4">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="w-40 h-24 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {(recommendedVideos || [])
            .filter(video => video.id !== currentVideo.id)
            .slice(0, 5)
            .map((video) => (
              <VideoCard 
                key={video.id} 
                video={video} 
                horizontal 
                showPlayButton
              />
            ))
          }
        </div>
      )}
    </div>
  );
};

export default RecommendationSection;
