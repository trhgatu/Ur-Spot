import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Github, Mail, MapPin, Coffee, MessageSquare, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { SidebarContext } from '../contexts/SidebarContext';

export const MainLayout: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <SidebarContext.Provider value={{ sidebarOpen, toggleSidebar }}>
      <div className="flex flex-col min-h-screen bg-background">
        <NavBar onMenuClick={toggleSidebar} />
        <main className="max-w-full flex-1">
          <Outlet />
        </main>

        <footer className="py-12 border-t relative z-30 lg:pl-64">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  <span className="text-primary">Ur</span>
                  <span className="text-white">Spot</span>
                </h2>
                <p className=" mb-4">Khám phá những địa điểm thú vị nhất tại Việt Nam với cộng đồng UrSpot.</p>
                <div className="flex space-x-3">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full transition-colors">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="mailto:contact@urspot.com" className="p-2 rounded-full transition-colors">
                    <Mail className="h-5 w-5" />
                  </a>
                  <a href="#" className="p-2 rounded-full transition-colors">
                    <MessageSquare className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Khám phá</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className=" hover:text-primary transition-colors">Trang chủ</Link></li>
                  <li><Link to="/about" className=" hover:text-primary transition-colors">Về chúng tôi</Link></li>
                  <li><Link to="/contact" className=" hover:text-primary transition-colors">Liên hệ</Link></li>
                  <li><Link to="/places" className=" hover:text-primary transition-colors">Địa điểm mới</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Danh mục</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Coffee className="h-4 w-4 text-primary" />
                    <Link to="/?category=coffee" className=" hover:text-primary transition-colors">Quán cà phê</Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <Link to="/?category=restaurants" className=" hover:text-primary transition-colors">Quán ăn</Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <Link to="/?category=shops" className=" hover:text-primary transition-colors">Cửa hàng</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm">
              <p>© {currentYear} UrSpot. Tất cả quyền được bảo lưu.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link to="/terms" className="hover:text-primary transition-colors">Điều khoản sử dụng</Link>
                <Link to="/privacy" className="hover:text-primary transition-colors">Chính sách bảo mật</Link>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1 mt-4 md:mt-0"
              >
                <span>Made with</span>
                <Heart className="h-3 w-3 text-red-500" />
                <span>in Vietnam</span>
              </motion.div>
            </div>
          </div>
        </footer>
      </div>
    </SidebarContext.Provider>
  );
};