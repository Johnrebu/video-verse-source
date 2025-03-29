
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Flame, Clock, ThumbsUp, History, PlaySquare, Compass, Clapperboard, Gamepad2, Music, Newspaper, Trophy, Lightbulb, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

const NavItem = ({ to, icon, label, active }: NavItemProps) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-secondary transition-colors",
      active && "font-medium bg-secondary"
    )}
  >
    <span className="text-muted-foreground">{icon}</span>
    <span>{label}</span>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 hidden md:block overflow-y-auto h-[calc(100vh-61px)] sticky top-[61px] p-3 border-r border-border">
      <div className="space-y-1">
        <NavItem to="/" icon={<Home size={20} />} label="Home" active={isActive('/')} />
        <NavItem to="/trending" icon={<Flame size={20} />} label="Trending" active={isActive('/trending')} />
        <NavItem to="/subscriptions" icon={<Youtube size={20} />} label="Subscriptions" active={isActive('/subscriptions')} />
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="px-3 py-2 text-sm font-medium">Library</h3>
        <div className="space-y-1">
          <NavItem to="/history" icon={<History size={20} />} label="History" active={isActive('/history')} />
          <NavItem to="/your-videos" icon={<PlaySquare size={20} />} label="John Elon Son" active={isActive('/your-videos')} />
          <NavItem to="/watch-later" icon={<Clock size={20} />} label="Watch later" active={isActive('/watch-later')} />
          <NavItem to="/liked-videos" icon={<ThumbsUp size={20} />} label="Liked videos" active={isActive('/liked-videos')} />
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="px-3 py-2 text-sm font-medium">Explore</h3>
        <div className="space-y-1">
          <NavItem to="/explore/gaming" icon={<Gamepad2 size={20} />} label="Gaming" active={isActive('/explore/gaming')} />
          <NavItem to="/explore/music" icon={<Music size={20} />} label="Music" active={isActive('/explore/music')} />
          <NavItem to="/explore/movies" icon={<Clapperboard size={20} />} label="Movies" active={isActive('/explore/movies')} />
          <NavItem to="/explore/news" icon={<Newspaper size={20} />} label="News" active={isActive('/explore/news')} />
          <NavItem to="/explore/sports" icon={<Trophy size={20} />} label="Sports" active={isActive('/explore/sports')} />
          <NavItem to="/explore/learning" icon={<Lightbulb size={20} />} label="Learning" active={isActive('/explore/learning')} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
