import React from 'react';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ModeToggle } from './ModeToggle';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavBarProps {
  onMenuClick?: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ onMenuClick }) => {
  return (
    <motion.header
      className="w-full bg-zinc-900/95 border-b border-zinc-800/70 text-white sticky top-0 z-50 shadow-md backdrop-blur-md h-16"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-[2000px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            className="text-2xl md:text-3xl font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-primary">Ur</span>
            <span className="text-white">Spot</span>
          </motion.div>
        </Link>

        <div className="flex items-center space-x-3">
          <LanguageSwitcher />
          <ModeToggle />
          <Button
            variant="outline"
            size="icon"
            onClick={onMenuClick}
            className="rounded-full bg-zinc-800/80 border-zinc-700 hover:bg-zinc-700 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};