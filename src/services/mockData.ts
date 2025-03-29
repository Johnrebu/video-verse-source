
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  subscribers: number;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  uploadDate: string;
  views: number;
  user: User;
  description: string;
  likes: number;
  dislikes: number;
  category: string;
}

export interface Comment {
  id: string;
  content: string;
  user: User;
  date: string;
  likes: number;
  replies?: Comment[];
}

// Mock users
const users: User[] = [
  {
    id: "1",
    name: "Tech Insights",
    username: "techinsights",
    avatar: "https://i.pravatar.cc/150?img=1",
    subscribers: 1540000
  },
  {
    id: "2",
    name: "Gaming Central",
    username: "gamingcentral",
    avatar: "https://i.pravatar.cc/150?img=2",
    subscribers: 2340000
  },
  {
    id: "3",
    name: "Cooking with Maria",
    username: "mariascooking",
    avatar: "https://i.pravatar.cc/150?img=3",
    subscribers: 890000
  },
  {
    id: "4",
    name: "Travel Diaries",
    username: "traveldiaries",
    avatar: "https://i.pravatar.cc/150?img=4",
    subscribers: 1200000
  },
  {
    id: "5",
    name: "Music Vibes",
    username: "musicvibes",
    avatar: "https://i.pravatar.cc/150?img=5",
    subscribers: 3400000
  }
];

// Mock videos
export const videos: Video[] = [
  {
    id: "v1",
    title: "Building a Web App with React and TypeScript - Complete Tutorial",
    thumbnail: "https://i.ytimg.com/vi/8kxVkbl8SYo/maxresdefault.jpg",
    duration: "25:14",
    uploadDate: "2023-12-15",
    views: 1250000,
    user: users[0],
    description: "Learn how to build a modern web application using React and TypeScript in this comprehensive tutorial. We'll cover everything from setup to deployment.",
    likes: 42000,
    dislikes: 1200,
    category: "Programming"
  },
  {
    id: "v2",
    title: "Elden Ring - 10 Tips for Beginners That Will Make Your Life Easier",
    thumbnail: "https://i.ytimg.com/vi/NLdZ8Zghbt0/maxresdefault.jpg",
    duration: "18:42",
    uploadDate: "2023-11-20",
    views: 2340000,
    user: users[1],
    description: "New to Elden Ring? Here are 10 essential tips that will help you navigate this challenging game with less frustration and more fun!",
    likes: 89000,
    dislikes: 3200,
    category: "Gaming"
  },
  {
    id: "v3",
    title: "Authentic Italian Pasta Carbonara - Restaurant Quality at Home",
    thumbnail: "https://i.ytimg.com/vi/qoHnwOHLiMk/maxresdefault.jpg",
    duration: "12:55",
    uploadDate: "2023-12-02",
    views: 987000,
    user: users[2],
    description: "Make restaurant-quality pasta carbonara at home with this authentic Italian recipe. Simple ingredients, proper technique, amazing results!",
    likes: 34000,
    dislikes: 850,
    category: "Cooking"
  },
  {
    id: "v4",
    title: "Hidden Gems of Japan - Places Tourists Don't Know About",
    thumbnail: "https://i.ytimg.com/vi/jfKfPfyJRdk/maxresdefault.jpg",
    duration: "22:38",
    uploadDate: "2023-10-14",
    views: 1120000,
    user: users[3],
    description: "Discover the hidden gems of Japan that most tourists miss. From secret local spots to undiscovered natural wonders, this is Japan off the beaten path.",
    likes: 51000,
    dislikes: 1500,
    category: "Travel"
  },
  {
    id: "v5",
    title: "The Evolution of Hip Hop - From the Bronx to Global Phenomenon",
    thumbnail: "https://i.ytimg.com/vi/mYzGLzFuwxI/maxresdefault.jpg",
    duration: "35:22",
    uploadDate: "2023-09-29",
    views: 2650000,
    user: users[4],
    description: "Trace the evolution of hip hop from its humble beginnings in the Bronx to becoming a global cultural phenomenon that has changed music forever.",
    likes: 97000,
    dislikes: 4100,
    category: "Music"
  },
  {
    id: "v6",
    title: "Mastering CSS Grid Layout - Modern Web Design Techniques",
    thumbnail: "https://i.ytimg.com/vi/EiNiSFIPIQE/maxresdefault.jpg",
    duration: "28:19",
    uploadDate: "2023-11-05",
    views: 890000,
    user: users[0],
    description: "Take your web design skills to the next level by mastering CSS Grid Layout. This tutorial covers everything from basic to advanced techniques.",
    likes: 32000,
    dislikes: 950,
    category: "Programming"
  },
  {
    id: "v7",
    title: "Cyberpunk 2077 After the Updates - Is It Worth Playing Now?",
    thumbnail: "https://i.ytimg.com/vi/JtqIas3bYhg/maxresdefault.jpg",
    duration: "15:47",
    uploadDate: "2023-12-18",
    views: 1870000,
    user: users[1],
    description: "After numerous updates and patches, is Cyberpunk 2077 finally worth playing? We revisit Night City to find out if CD Projekt Red has redeemed their masterpiece.",
    likes: 76000,
    dislikes: 5200,
    category: "Gaming"
  },
  {
    id: "v8",
    title: "Korean Street Food Tour - Seoul's Best Market Dishes",
    thumbnail: "https://i.ytimg.com/vi/0HQqRNDSZA0/maxresdefault.jpg",
    duration: "19:23",
    uploadDate: "2023-10-22",
    views: 1350000,
    user: users[2],
    description: "Join me on a mouthwatering tour of Seoul's vibrant street food scene. From tteokbokki to hotteok, these are the must-try dishes at Korean markets!",
    likes: 65000,
    dislikes: 1100,
    category: "Cooking"
  }
];

// Mock comments
export const comments: Record<string, Comment[]> = {
  "v1": [
    {
      id: "c1",
      content: "This tutorial really helped me understand TypeScript with React. Thanks for making it so clear!",
      user: users[3],
      date: "2023-12-16",
      likes: 342,
      replies: [
        {
          id: "c1r1",
          content: "I agree! I was struggling with types in my project and this fixed all my issues.",
          user: users[1],
          date: "2023-12-16",
          likes: 54
        }
      ]
    },
    {
      id: "c2",
      content: "Could you make a follow-up video on testing React TypeScript applications?",
      user: users[4],
      date: "2023-12-18",
      likes: 128
    }
  ],
  "v2": [
    {
      id: "c3",
      content: "Tip #7 literally saved me hours of frustration. Wish I'd seen this when I first started playing!",
      user: users[0],
      date: "2023-11-21",
      likes: 894
    }
  ]
};

// Get videos for homepage
export const getVideos = (): Video[] => {
  return [...videos];
};

// Get trending videos
export const getTrendingVideos = (): Video[] => {
  return [...videos].sort((a, b) => b.views - a.views);
};

// Get video by ID
export const getVideoById = (id: string): Video | undefined => {
  return videos.find(video => video.id === id);
};

// Get recommended videos
export const getRecommendedVideos = (currentVideoId: string): Video[] => {
  return videos
    .filter(video => video.id !== currentVideoId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 8);
};

// Search videos
export const searchVideos = (query: string): Video[] => {
  const searchTerm = query.toLowerCase();
  return videos.filter(
    video => 
      video.title.toLowerCase().includes(searchTerm) || 
      video.description.toLowerCase().includes(searchTerm) ||
      video.category.toLowerCase().includes(searchTerm)
  );
};

// Get comments for a video
export const getComments = (videoId: string): Comment[] => {
  return comments[videoId] || [];
};
