
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import VideoGrid from '@/components/video/VideoGrid';
import { getVideos, Video } from '@/services/mockData';

const Index = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const fetchVideos = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = getVideos();
      setVideos(data);
      setLoading(false);
    };

    fetchVideos();
  }, []);

  return (
    <MainLayout>
      <div className="py-4">
        <VideoGrid 
          videos={videos} 
          loading={loading} 
          title="Recommended"
        />
      </div>
    </MainLayout>
  );
};

export default Index;
