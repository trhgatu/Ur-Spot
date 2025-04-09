import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { useLanguage } from '@/hooks/useLanguage';

export const MainLayout: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="max-w-full mx-auto">
        <Outlet />
      </main>
      <footer className="py-8 border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-white">PokeVerse</h2>
              <p className="mt-2">{t('ui.footer.description')}</p>
            </div>
            <div className="text-sm">
              <p>{t('ui.footer.credit')} <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">PokeAPI</a></p>
              <p className="mt-1">© {new Date().getFullYear()} {t('ui.footer.rights')}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};