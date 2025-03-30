
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import VideoGrid from '@/components/video/VideoGrid';
import { fetchChannelVideos } from '@/services/youtubeApi';
import { Button } from '@/components/ui/button';
import { ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const YourChannel = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ['channelVideos'],
    queryFn: async () => {
      return await fetchChannelVideos();
    },
  });

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    
    if (!isSubscribed) {
      toast({
        title: "Subscribed successfully!",
        description: "You've subscribed to John Elon Son's channel",
        duration: 3000,
      });
    } else {
      toast({
        title: "Unsubscribed",
        description: "You've unsubscribed from John Elon Son's channel",
        duration: 3000,
      });
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <Card className="mb-6 bg-secondary/20">
          <CardHeader className="pb-0">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <img 
                src="/lovable-uploads/5f7f56b8-57c1-402d-849c-81453523baf8.png" 
                alt="John Elon Son" 
                className="w-32 h-32 rounded-full object-cover border-2 border-primary/20"
              />
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">John Elon Son</h1>
                <p className="text-muted-foreground">@johnElonSon</p>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.youtube.com/@johnElonSon" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ExternalLink size={16} />
                      Visit Channel
                    </a>
                  </Button>
                  <Button 
                    variant={isSubscribed ? "default" : "outline"} 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={handleSubscribe}
                  >
                    {isSubscribed ? (
                      <>
                        <BookmarkCheck size={16} />
                        Subscribed
                      </>
                    ) : (
                      <>
                        <Bookmark size={16} />
                        Subscribe
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="videos">
          <TabsList className="mb-6">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="videos">
            {error ? (
              <div className="text-center py-10">
                <p className="text-red-500">Error loading videos from the channel.</p>
                <p className="text-muted-foreground">Please try again later.</p>
              </div>
            ) : (
              <VideoGrid videos={data?.videos || []} loading={isLoading} title="John Elon Son's Videos" />
            )}
          </TabsContent>
          
          <TabsContent value="about">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">About John Elon Son</h2>
                <p className="mb-4">
                  This channel features videos from John Elon Son. The content includes various topics 
                  that might interest you.
                </p>
                <p className="text-muted-foreground">
                  Join the channel to stay updated with the latest videos!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default YourChannel;
