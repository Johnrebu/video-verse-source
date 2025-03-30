
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import VideoCard from '@/components/video/VideoCard';
import { Separator } from '@/components/ui/separator';
import VideoListSkeleton from '@/components/video/VideoListSkeleton';
import { Flame } from 'lucide-react';
import { fetchChannelVideos } from '@/services/youtubeApi';

const Trending = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['trendingChannelVideos'],
    queryFn: async () => {
      return await fetchChannelVideos();
    },
  });

  return (
    <MainLayout>
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="h-6 w-6 text-youtube-red" />
          <h1 className="text-xl md:text-2xl font-semibold">Trending Videos</h1>
        </div>
        <Separator className="mb-4" />

        {error ? (
          <div className="text-center py-10">
            <p className="text-red-500">Error loading trending videos.</p>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        ) : isLoading ? (
          <VideoListSkeleton count={5} />
        ) : (
          <div className="space-y-4">
            {data?.videos.map(video => (
              <div key={video.id} className="max-w-3xl">
                <VideoCard video={video} horizontal />
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Trending;
