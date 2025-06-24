
import React, { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

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

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-stem-primary to-stem-secondary rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Fstem.asia</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 rounded-md relative ${
                    isActiveRoute(item.href)
                      ? 'text-stem-primary' 
                      : 'text-gray-700 hover:text-stem-primary'
                  }`}
                >
                  {item.title}
                  {isActiveRoute(item.href) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-stem-primary transition-all duration-300"></div>
                  )}
                </a>
              ))}
            </nav>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">Xin chào, {user?.name}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="text-stem-primary border-stem-primary hover:bg-stem-primary hover:text-white"
                    onClick={() => handleAuthClick('login')}
                  >
                    Đăng nhập
                  </Button>
                  <Button 
                    className="bg-stem-primary hover:bg-stem-primary/90"
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
                className="text-gray-700"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden animate-slide-in">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                {/* Mobile Menu Items */}
                {menuItems.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                      isActiveRoute(item.href)
                        ? 'text-stem-primary bg-stem-primary/10' 
                        : 'text-gray-700 hover:text-stem-primary hover:bg-gray-50'
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
                
                {/* Mobile Auth Buttons */}
                <div className="pt-4 space-y-2">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <div className="px-3 py-2 text-sm text-gray-700">
                        Xin chào, {user?.name}
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full text-gray-600 hover:text-red-600"
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
                        className="w-full text-stem-primary border-stem-primary"
                        onClick={() => {
                          handleAuthClick('login');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Đăng nhập
                      </Button>
                      <Button 
                        className="w-full bg-stem-primary hover:bg-stem-primary/90"
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
