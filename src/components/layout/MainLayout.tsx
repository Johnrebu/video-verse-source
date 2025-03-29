
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 pb-16 md:pb-0">
          {children}
        </main>
      </div>
      <MobileSidebar />
    </div>
  );
};

export default MainLayout;
