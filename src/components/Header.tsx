
import React, { useState } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { isAuthenticated, user, logout } = useAuth();
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

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <>
      <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 border-b border-white/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Clickable */}
            <div className="flex items-center">
              <div 
                className="flex-shrink-0 flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleLogoClick}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                  <span className="text-white font-bold text-lg">🎓</span>
                </div>
                <span className="text-xl font-bold text-white drop-shadow-sm">Fstem.asia</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
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
                </a>
              ))}
            </nav>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
                    <User className="w-4 h-4 text-white" />
                    <span className="text-sm text-white font-medium">{user?.name}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleLogout}
                    className="text-white border-white/30 hover:bg-white/10 hover:text-white"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="text-white border-white/30 hover:bg-white/10 hover:text-white"
                    onClick={() => handleAuthClick('login')}
                  >
                    Đăng nhập
                  </Button>
                  <Button 
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold"
                    onClick={() => handleAuthClick('register')}
                  >
                    Đăng ký
                  </Button>
                </>
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
                  <a
                    key={item.title}
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                      isActiveRoute(item.href)
                        ? 'text-yellow-300 bg-white/10' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
                
                {/* Mobile Auth Buttons */}
                <div className="pt-4 space-y-2">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <div className="px-3 py-2 text-sm text-white flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{user?.name}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full text-white border-white/30 hover:bg-white/10"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Đăng xuất
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full text-white border-white/30 hover:bg-white/10"
                        onClick={() => {
                          handleAuthClick('login');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Đăng nhập
                      </Button>
                      <Button 
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold"
                        onClick={() => {
                          handleAuthClick('register');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Đăng ký
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </>
  );
};

export default Header;
