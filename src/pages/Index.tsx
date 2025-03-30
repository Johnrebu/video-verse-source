
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import VideoGrid from '@/components/video/VideoGrid';
import { fetchChannelVideos } from '@/services/youtubeApi';

const Index = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['homeChannelVideos'],
    queryFn: async () => {
      return await fetchChannelVideos();
    },
  });

  return (
    <MainLayout>
      <div className="py-4">
        <VideoGrid 
          videos={data?.videos || []} 
          loading={isLoading} 
          title="John Elon Son's Recommended Videos"
        />
        
        {error && (
          <div className="text-center py-10">
            <p className="text-red-500">Error loading videos.</p>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
