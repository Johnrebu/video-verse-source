
# VideoVerse - A YouTube-like Platform

VideoVerse is a modern, responsive video sharing platform built with React, TypeScript, and Tailwind CSS. This project showcases a YouTube-like user interface with key features including video browsing, searching, playback, and more.

## Features

- **Responsive Design**: Optimized for all screen sizes from mobile to desktop
- **Dark Mode UI**: Sleek YouTube-inspired dark theme
- **Video Browsing**: Browse trending and recommended videos
- **Video Playback**: Watch videos with a YouTube-like player interface
- **Video Recommendations**: Related videos appear alongside the currently playing video
- **Comments System**: View and interact with comments on videos
- **Search Functionality**: Search for videos by title, description, or category
- **User Authentication**: Login/Signup interface ready for backend integration
- **Video Upload**: Interface for uploading new videos

## Tech Stack

- **React**: Frontend library for building user interfaces
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: For page navigation and routing
- **Shadcn UI**: High-quality React components with Tailwind CSS
- **Lucide Icons**: Beautiful icon set
- **TanStack Query**: For data fetching and state management

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to `http://localhost:8080`

## Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── layout/      # Layout components (Header, Sidebar, etc.)
│   ├── ui/          # UI components from shadcn
│   ├── video/       # Video-related components
├── pages/           # Page components
├── services/        # Mock data services (to be replaced with API calls)
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── App.tsx          # Main app component
├── main.tsx         # Entry point
```

## Future Enhancements

- Backend API integration
- User authentication with JWT
- Real-time notifications
- Video uploading with progress indicators
- Comment replies and threading
- User profile pages
- Subscription management
- Video analytics
- Content recommendations algorithm

## Credits

This project was built with [Vite](https://vitejs.dev/), [React](https://reactjs.org/), and [Tailwind CSS](https://tailwindcss.com/).
