
import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { title: 'Trang chủ', href: '/', active: true },
    { title: 'Văn bản', href: '/documents' },
    { title: 'Bài giảng', href: '/lessons' },
    { title: 'Tin tức', href: '/news' },
    { title: 'Thư viện', href: '/library' },
    { title: 'Cộng đồng', href: '/community' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-stem-primary to-stem-secondary rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">STEM4Teachers.vn</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 rounded-md ${
                  item.active 
                    ? 'text-stem-primary border-b-2 border-stem-primary' 
                    : 'text-gray-700 hover:text-stem-primary'
                }`}
              >
                {item.title}
              </a>
            ))}
          </nav>

          {/* Search và Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Tìm kiếm tài nguyên..."
                className="pl-10 w-80 bg-gray-50 border-gray-200 hover:bg-white focus:bg-white transition-colors"
              />
            </div>
            <Button variant="outline" className="text-stem-primary border-stem-primary hover:bg-stem-primary hover:text-white">
              Đăng nhập
            </Button>
            <Button className="bg-stem-primary hover:bg-stem-primary/90">
              Đăng ký
            </Button>
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
              {/* Mobile Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm..."
                  className="pl-10 w-full bg-gray-50"
                />
              </div>
              
              {/* Mobile Menu Items */}
              {menuItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    item.active 
                      ? 'text-stem-primary bg-stem-primary/10' 
                      : 'text-gray-700 hover:text-stem-primary hover:bg-gray-50'
                  }`}
                >
                  {item.title}
                </a>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full text-stem-primary border-stem-primary">
                  Đăng nhập
                </Button>
                <Button className="w-full bg-stem-primary hover:bg-stem-primary/90">
                  Đăng ký
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
