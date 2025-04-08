import React from 'react';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ModeToggle } from './ModeToggle';

export const NavBar: React.FC = () => {
  return (
    <header className="w-full bg-zinc-900 border-b border-zinc-800 text-white sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-opacity-90">
      <div className="w-full max-w-[2000px] mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-white">UrSpot</span>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ModeToggle/>
        </div>
      </div>
    </header>
  );
};