
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Tài liệu', href: '/documents' },
    { title: 'Bài giảng', href: '/lessons' },
    { title: 'Tin tức', href: '/news' },
    { title: 'Thư viện', href: '/library' },
    { title: 'Cộng đồng', href: '/community' },
  ];

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  const handleAuthClick = () => {
    navigate('/auth');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 border-b border/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Clickable */}
          <div className="flex items-center">
            <Button 
              variant="ghost"
              className="flex-shrink-0 flex items-center p-0 hover:bg-white/10 rounded-lg transition-colors"
              onClick={handleLogoClick}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                <span className="text-white font-bold text-lg">🎓</span>
              </div>
              <span className="text-xl font-bold text-white drop-shadow-sm">Fstem.asia</span>
            </Button>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Button
                key={item.title}
                variant="ghost"
                onClick={() => handleNavClick(item.href)}
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-white/10 rounded-md relative ${
                  isActiveRoute(item.href)
                    ? 'text-yellow-300 shadow-sm' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item.title}
                {isActiveRoute(item.href) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-300 transition-all duration-300 shadow-sm"></div>
                )}
              </Button>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <ProfileDropdown />
            ) : (
              <Button 
                variant="outline"
                className="bg-green-400 hover:bg-green-500 text-white font-semibold border-white/30"
                onClick={handleAuthClick}
              >
                Đăng nhập
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-slide-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/20 border-t border-white/20 backdrop-blur-sm">
              {/* Mobile Menu Items */}
              {menuItems.map((item) => (
                <Button
                  key={item.title}
                  variant="ghost"
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full justify-start px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    isActiveRoute(item.href)
                      ? 'text-yellow-300 bg-white/10' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.title}
                </Button>
              ))}
              
              {/* Mobile Auth Button */}
              <div className="pt-4">
                {user ? (
                  <div className="px-3 py-2">
                    <ProfileDropdown />
                  </div>
                ) : (
                  <Button 
                    className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold"
                    onClick={handleAuthClick}
                  >
                    Đăng nhập
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
