
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Flame, Compass, Youtube, PlaySquare, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

type MobileNavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

const MobileNavItem = ({ to, icon, label, active }: MobileNavItemProps) => (
  <Link 
    to={to} 
    className={cn(
      "flex flex-col items-center justify-center gap-1 py-2",
      active && "text-primary"
    )}
  >
    {icon}
    <span className="text-xs">{label}</span>
  </Link>
);

const MobileSidebar = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="grid grid-cols-5">
        <MobileNavItem to="/" icon={<Home size={20} />} label="Home" />
        <MobileNavItem to="/trending" icon={<Flame size={20} />} label="Trending" />
        <MobileNavItem to="/subscriptions" icon={<Youtube size={20} />} label="Subs" />
        <MobileNavItem to="/library" icon={<PlaySquare size={20} />} label="Library" />
        <MobileNavItem to="/explore" icon={<Compass size={20} />} label="Explore" />
      </div>
    </div>
  );
};

export default MobileSidebar;
