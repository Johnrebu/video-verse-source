
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import VideoGrid from '@/components/video/VideoGrid';
import { fetchChannelVideos } from '@/services/youtubeApi';

const Index = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['channelVideos'],
    queryFn: async () => fetchChannelVideos(),
  });

  return (
    <MainLayout>
      <div className="py-4">
        <VideoGrid 
          videos={data?.videos || []} 
          loading={isLoading} 
          title="My Channel Videos"
        />
        
        {error && (
          <div className="text-center py-4">
            <p className="text-red-500">Error loading channel videos.</p>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
