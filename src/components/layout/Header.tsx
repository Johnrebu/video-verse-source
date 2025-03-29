
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, Search, Upload, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center gap-1">
            <span className="text-youtube-red font-bold text-2xl">Video</span>
            <span className="font-bold text-2xl">Verse</span>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative flex-1 flex items-center">
            <Input
              type="text"
              placeholder="Search"
              className="pr-10 rounded-r-none border-r-0 bg-secondary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="secondary" 
              className="rounded-l-none h-10 px-4"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          
          <Link to="/upload">
            <Button variant="ghost" size="icon">
              <Upload className="h-5 w-5" />
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Link to="/login">
            <Button variant="outline" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
