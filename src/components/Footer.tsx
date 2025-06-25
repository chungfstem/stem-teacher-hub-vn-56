
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Youtube, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Footer = () => {
  const [showMap, setShowMap] = useState(false);

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <>
      <footer className="bg-gray-900 text-white">
        {/* Newsletter Section */}
        <div className="bg-stem-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Đăng ký nhận thông tin mới nhất
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Nhận thông báo về các tài liệu mới, hội thảo và cập nhật từ cộng đồng Fstem
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="flex-1 bg-white text-gray-900"
                />
                <Button variant="secondary" className="bg-white text-stem-primary hover:bg-gray-100">
                  Đăng ký
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer - Simplified */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            {/* Brand - Clickable */}
            <div 
              className="flex items-center justify-center mb-6 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-stem-primary to-stem-secondary rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">🎓</span>
              </div>
              <span className="text-2xl font-bold">Fstem.asia</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Nền tảng chia sẻ tài nguyên STEM hàng đầu dành cho giáo viên Việt Nam
            </p>
            
            {/* Social Media */}
            <div className="flex justify-center space-x-6 mb-8">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white hover:bg-gray-800"
                onClick={() => window.open('https://facebook.com', '_blank')}
              >
                <Facebook className="w-6 h-6" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white hover:bg-gray-800"
                onClick={() => window.open('https://youtube.com', '_blank')}
              >
                <Youtube className="w-6 h-6" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white hover:bg-gray-800"
                onClick={() => window.open('https://zalo.me', '_blank')}
              >
                <MessageCircle className="w-6 h-6" />
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-stem-primary" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-gray-400">FstemVN@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-stem-primary" />
                <div>
                  <div className="font-medium">Hotline</div>
                  <div className="text-gray-400">1900 123 456</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMap(true)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white p-0"
                >
                  <MapPin className="w-5 h-5 text-stem-primary" />
                  <div className="text-left">
                    <div className="font-medium text-white">Địa chỉ</div>
                    <div className="text-gray-400">Hồ Chí Minh, Việt Nam</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Bottom */}
            <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm">
                © 2024 Fstem.asia. Tất cả quyền được bảo lưu.
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Chính sách bảo mật
                </a>
                <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Điều khoản sử dụng
                </a>
                <a href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Chính sách Cookie
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Map Modal */}
      <Dialog open={showMap} onOpenChange={setShowMap}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Vị trí của chúng tôi</DialogTitle>
          </DialogHeader>
          <div className="w-full h-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.163889733434!2d106.79814837451849!3d10.875136457366308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a6b19d6763%3A0x143c54525028b2e!2sVNUHCM%20Student%20Cultural%20House!5e0!3m2!1sen!2s!4v1750827958811!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;
