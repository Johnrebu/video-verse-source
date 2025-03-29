
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import VideoList from '@/components/video/VideoList';
import { getVideoById, getRecommendedVideos, getComments, Video, Comment } from '@/services/mockData';
import { formatDistanceToNow } from 'date-fns';
import { ThumbsUp, ThumbsDown, Share, Flag, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const VideoPlayer = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [recommendedVideos, setRecommendedVideos] = useState<Video[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (id) {
        const videoData = getVideoById(id);
        if (videoData) {
          setVideo(videoData);
          setRecommendedVideos(getRecommendedVideos(id));
          setComments(getComments(id));
        }
      }
      setLoading(false);
    };

    fetchVideo();
  }, [id]);

  // Function to format subscriber counts
  const formatSubscribers = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M subscribers`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K subscribers`;
    } else {
      return `${count} subscribers`;
    }
  };

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

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-screen-xl mx-auto p-4 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="aspect-video bg-muted rounded-lg animate-pulse"></div>
            <div className="h-7 bg-muted rounded mt-4 w-3/4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded mt-4 w-1/2 animate-pulse"></div>
          </div>
          <div className="md:w-96">
            <div className="h-6 bg-muted rounded mb-4 w-1/2 animate-pulse"></div>
            <div className="space-y-3">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="w-40 h-24 rounded-lg bg-muted shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-muted rounded mb-2 w-full"></div>
                    <div className="h-3 bg-muted rounded mb-2 w-2/3"></div>
                    <div className="h-2 bg-muted rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!video) {
    return (
      <MainLayout>
        <div className="max-w-screen-xl mx-auto p-4">
          <h1 className="text-2xl font-bold">Video not found</h1>
        </div>
      </MainLayout>
    );
  }

  const uploadedDate = new Date(video.uploadDate);
  const timeAgo = formatDistanceToNow(uploadedDate, { addSuffix: true });

  return (
    <MainLayout>
      <div className="max-w-screen-xl mx-auto p-4 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          {/* Video Player */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/dQw4w9WgXcQ`} 
              title={video.title}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>

          {/* Video Info */}
          <h1 className="text-xl md:text-2xl font-bold mt-4">{video.title}</h1>
          
          <div className="flex flex-wrap justify-between items-center mt-2">
            <div className="text-muted-foreground text-sm">
              {formatViews(video.views)} • {timeAgo}
            </div>
            
            <div className="flex gap-2 flex-wrap mt-2 sm:mt-0">
              <Button variant="secondary" size="sm" className="gap-1">
                <ThumbsUp className="h-4 w-4" />
                {video.likes.toLocaleString()}
              </Button>
              <Button variant="secondary" size="sm" className="gap-1">
                <ThumbsDown className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="sm" className="gap-1">
                <Share className="h-4 w-4" />
                Share
              </Button>
              <Button variant="secondary" size="sm" className="gap-1">
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Channel Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={video.user.avatar} 
                alt={video.user.name} 
                className="w-12 h-12 rounded-full" 
              />
              <div>
                <h3 className="font-semibold">{video.user.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatSubscribers(video.user.subscribers)}
                </p>
              </div>
            </div>
            <Button className="bg-youtube-red hover:bg-red-700">Subscribe</Button>
          </div>

          {/* Video Description */}
          <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
            <p className="text-sm whitespace-pre-line">{video.description}</p>
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5" />
              <h3 className="text-lg font-semibold">
                {comments.length} Comments
              </h3>
            </div>

            {comments.length === 0 ? (
              <p className="text-muted-foreground text-sm">No comments yet.</p>
            ) : (
              <div className="space-y-4">
                {comments.map(comment => (
                  <div key={comment.id} className="flex gap-3">
                    <img 
                      src={comment.user.avatar} 
                      alt={comment.user.name} 
                      className="w-10 h-10 rounded-full shrink-0" 
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm">{comment.user.name}</h4>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.date), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          <span className="text-xs">{comment.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          Reply
                        </Button>
                      </div>

                      {/* Comment Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-4 mt-3 space-y-3">
                          {comment.replies.map(reply => (
                            <div key={reply.id} className="flex gap-3">
                              <img 
                                src={reply.user.avatar} 
                                alt={reply.user.name} 
                                className="w-8 h-8 rounded-full shrink-0" 
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-xs">{reply.user.name}</h4>
                                  <span className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(reply.date), { addSuffix: true })}
                                  </span>
                                </div>
                                <p className="text-xs mt-1">{reply.content}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Button variant="ghost" size="sm" className="h-5 px-2">
                                    <ThumbsUp className="h-2 w-2 mr-1" />
                                    <span className="text-xs">{reply.likes}</span>
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-5 px-2">
                                    <ThumbsDown className="h-2 w-2" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recommended Videos */}
        <div className="md:w-96">
          <VideoList 
            videos={recommendedVideos} 
            title="Recommended videos" 
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default VideoPlayer;
