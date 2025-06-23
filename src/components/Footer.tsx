
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Youtube, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const footerSections = [
    {
      title: 'Về chúng tôi',
      links: [
        { title: 'Giới thiệu', href: '/about' },
        { title: 'Sứ mệnh', href: '/mission' },
        { title: 'Đội ngũ', href: '/team' },
        { title: 'Liên hệ', href: '/contact' }
      ]
    },
    {
      title: 'Tài nguyên',
      links: [
        { title: 'Bài giảng STEM', href: '/lessons' },
        { title: 'Thí nghiệm', href: '/experiments' },
        { title: 'Dự án', href: '/projects' },
        { title: 'Video hướng dẫn', href: '/videos' }
      ]
    },
    {
      title: 'Hỗ trợ',
      links: [
        { title: 'Câu hỏi thường gặp', href: '/faq' },
        { title: 'Hướng dẫn sử dụng', href: '/guide' },
        { title: 'Báo lỗi', href: '/report' },
        { title: 'Đóng góp ý kiến', href: '/feedback' }
      ]
    },
    {
      title: 'Cộng đồng',
      links: [
        { title: 'Diễn đàn', href: '/forum' },
        { title: 'Nhóm Facebook', href: '/facebook' },
        { title: 'Kênh YouTube', href: '/youtube' },
        { title: 'Sự kiện', href: '/events' }
      ]
    }
  ];

  return (
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

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-stem-primary to-stem-secondary rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold">Fstem.asia</span>
            </div>
            <p className="text-gray-400 mb-6">
              Nền tảng chia sẻ tài nguyên STEM hàng đầu dành cho giáo viên Việt Nam
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Youtube className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <MessageCircle className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-stem-primary" />
              <div>
                <div className="font-medium">Email</div>
                <div className="text-gray-400">contact@fstem.asia</div>
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
              <MapPin className="w-5 h-5 text-stem-primary" />
              <div>
                <div className="font-medium">Địa chỉ</div>
                <div className="text-gray-400">Hà Nội, Việt Nam</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
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
    </footer>
  );
};

export default Footer;
