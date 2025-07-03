
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">🎓</span>
              </div>
              <span className="text-2xl font-bold">Fstem.asia</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Nền tảng chia sẻ tài liệu, bài giảng và kinh nghiệm giảng dạy STEM 
              dành riêng cho cộng đồng giáo viên Việt Nam.
            </p>
          </div>

          {/* Location with Map */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Vị trí</h3>
            <div className="flex items-center mb-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="p-0 h-auto text-gray-300 hover:text-white">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>VNUHCM Student Cultural House</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Vị trí của chúng tôi</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.163889733434!2d106.79814837451849!3d10.875136457366308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a6b19d6763%3A0x143c54525028b2e!2sVNUHCM%20Student%20Cultural%20House!5e0!3m2!1sen!2s!4v1750827958811!5m2!1sen!2s" 
                      width="100%" 
                      height="450" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-gray-400">
            © 2024 Fstem.asia. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
