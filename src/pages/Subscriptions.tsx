
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import VideoGrid from '@/components/video/VideoGrid';
import { fetchChannelVideos } from '@/services/youtubeApi';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

const Subscriptions = () => {
  const [pageToken, setPageToken] = useState<string | undefined>(undefined);
  
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['subscriptions', pageToken],
    queryFn: () => fetchChannelVideos(pageToken),
    placeholderData: (previousData) => previousData,
  });

  const handleNextPage = () => {
    if (data?.nextPageToken) {
      setPageToken(data.nextPageToken);
      window.scrollTo(0, 0);
    } else {
      toast.info("You've reached the end of the subscription feed");
    }
  };

  const handlePreviousPage = () => {
    if (pageToken) {
      setPageToken(undefined);
      window.scrollTo(0, 0);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6 px-4">Your Subscriptions</h1>
        
        <VideoGrid 
          videos={data?.videos || []} 
          loading={isLoading || isFetching} 
          title="Latest Videos from Your Subscriptions" 
        />
        
        {!isLoading && data?.videos && data.videos.length > 0 && (
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={handlePreviousPage} 
                  className={!pageToken ? "opacity-50 pointer-events-none" : "hover:scale-105 transition-transform"} 
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext 
                  onClick={handleNextPage} 
                  className={!data?.nextPageToken ? "opacity-50 pointer-events-none" : "hover:scale-105 transition-transform"} 
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </MainLayout>
  );
};

export default Subscriptions;
