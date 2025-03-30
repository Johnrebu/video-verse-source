
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import VideoCard from '@/components/video/VideoCard';
import { getTrendingVideos, Video } from '@/services/mockData';
import { Separator } from '@/components/ui/separator';
import VideoListSkeleton from '@/components/video/VideoListSkeleton';
import { Flame } from 'lucide-react';

const Trending = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const results = getTrendingVideos();
      setVideos(results);
      setLoading(false);
    };

    fetchTrendingVideos();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="h-6 w-6 text-youtube-red" />
          <h1 className="text-xl md:text-2xl font-semibold">Trending Videos</h1>
        </div>
        <Separator className="mb-4" />

        {loading ? (
          <VideoListSkeleton count={5} />
        ) : (
          <div className="space-y-4">
            {videos.map(video => (
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
