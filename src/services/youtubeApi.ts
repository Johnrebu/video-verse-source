
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
  nextPageToken?: string;
  prevPageToken?: string;
}

// Add pagination support
export const fetchChannelVideos = async (pageToken?: string): Promise<{videos: Video[], nextPageToken?: string}> => {
  try {
    const pageParam = pageToken ? `&pageToken=${pageToken}` : '';
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=8${pageParam}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch YouTube videos');
    }
    
    const data: YouTubeResponse = await response.json();
    
    // Convert YouTube format to our app's Video format
    const videos = data.items
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
          avatar: '/lovable-uploads/5f7f56b8-57c1-402d-849c-81453523baf8.png', // Updated avatar path
          subscribers: 5000 // Adding a default subscribers count
        }
      }));

    return {
      videos,
      nextPageToken: data.nextPageToken
    };
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return { videos: [] };
  }
};

// New function to fetch recommended videos based on category
export const fetchRecommendedVideos = async (category: string): Promise<Video[]> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&part=snippet,id&order=relevance&maxResults=10&q=${encodeURIComponent(category)}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch recommended videos');
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
        dislikes: Math.floor(Math.random() * 1000) + 10,  // Random dislikes
        uploadDate: item.snippet.publishedAt,
        duration: formatDuration(Math.floor(Math.random() * 900) + 60), // Random duration
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        category: determineCategory(item.snippet.title, item.snippet.description),
        user: {
          id: item.snippet.channelTitle,
          name: item.snippet.channelTitle,
          username: item.snippet.channelTitle.replace(/\s+/g, '').toLowerCase(),
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.snippet.channelTitle)}&background=random`,
          subscribers: Math.floor(Math.random() * 100000) + 1000 // Random subscribers
        }
      }));
  } catch (error) {
    console.error('Error fetching recommended videos:', error);
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
