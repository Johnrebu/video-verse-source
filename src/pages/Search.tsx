
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import VideoCard from '@/components/video/VideoCard';
import { searchVideos, Video } from '@/services/mockData';
import { Separator } from '@/components/ui/separator';
import VideoListSkeleton from '@/components/video/VideoListSkeleton';

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const results = searchVideos(query);
      setVideos(results);
      setLoading(false);
    };

    fetchSearchResults();
  }, [query]);

  return (
    <MainLayout>
      <div className="max-w-screen-xl mx-auto p-4">
        <h1 className="text-xl md:text-2xl font-semibold mb-4">
          Search results for: <span className="text-youtube-red">{query}</span>
        </h1>
        <Separator className="mb-4" />

        {loading ? (
          <VideoListSkeleton count={5} />
        ) : (
          <div className="space-y-4">
            {videos.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No videos found</h3>
                <p className="text-muted-foreground mt-2">
                  Try different keywords or check your spelling
                </p>
              </div>
            ) : (
              videos.map(video => (
                <div key={video.id} className="max-w-3xl">
                  <VideoCard video={video} horizontal />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
