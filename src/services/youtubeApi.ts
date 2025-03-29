
import { Video, User } from './mockData';

const YOUTUBE_API_KEY = 'AIzaSyD9SwiqJ8oCz-xecZGFNPwJJO8r53_n9KQ';
const CHANNEL_ID = 'UCmQFI-3Pt6NJwmVDI0LDLQQ'; // johnElonSon channel ID

interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    channelTitle: string;
  };
}

interface YouTubeResponse {
  items: YouTubeVideo[];
}

export const fetchChannelVideos = async (): Promise<Video[]> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch YouTube videos');
    }
    
    const data: YouTubeResponse = await response.json();
    
    // Convert YouTube format to our app's Video format
    return data.items
      .filter(item => item.id.videoId) // Only include videos with videoId
      .map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        views: Math.floor(Math.random() * 100000) + 1000, // Random view count
        likes: Math.floor(Math.random() * 10000) + 100,   // Random like count
        dislikes: Math.floor(Math.random() * 1000) + 10,  // Add random dislikes
        uploadDate: item.snippet.publishedAt,
        duration: formatDuration(Math.floor(Math.random() * 900) + 60), // Random duration
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        category: determineCategory(item.snippet.title, item.snippet.description),
        user: {
          id: CHANNEL_ID,
          name: item.snippet.channelTitle,
          username: 'johnElonSon', // Adding the required username property
          avatar: 'https://yt3.googleusercontent.com/ytc/AOPolaSNqyXEcMdPMvKKYnuHWmeCxzq5vHG8j-OgLlZ4=s176-c-k-c0x00ffffff-no-rj', // John Elon Son avatar
          subscribers: 5000 // Adding a default subscribers count
        }
      }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
};

// Format seconds to MM:SS
const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Helper function to determine a category based on video title and description
const determineCategory = (title: string, description: string): string => {
  const content = (title + ' ' + description).toLowerCase();
  
  if (content.includes('game') || content.includes('gaming') || content.includes('play')) {
    return 'Gaming';
  } else if (content.includes('music') || content.includes('song') || content.includes('audio')) {
    return 'Music';
  } else if (content.includes('tech') || content.includes('technology') || content.includes('code')) {
    return 'Technology';
  } else if (content.includes('cook') || content.includes('recipe') || content.includes('food')) {
    return 'Cooking';
  } else if (content.includes('travel') || content.includes('trip') || content.includes('journey')) {
    return 'Travel';
  } else {
    return 'Entertainment'; // Default category
  }
};
