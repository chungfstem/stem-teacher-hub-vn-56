
import React from 'react';
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HeroSection = () => {
  const stats = [
    { icon: BookOpen, label: 'Tài liệu', value: '2,500+' },
    { icon: Users, label: 'Giáo viên', value: '15,000+' },
    { icon: Award, label: 'Bài giảng', value: '1,200+' },
    { icon: TrendingUp, label: 'Lượt tải', value: '50,000+' },
  ];

  const featuredCards = [
    {
      title: 'Tài liệu mới',
      description: 'Khám phá những tài liệu STEM mới nhất được chia sẻ bởi cộng đồng giáo viên',
      color: 'from-blue-500 to-blue-600',
      icon: '📚'
    },
    {
      title: 'Hội thảo sắp diễn ra',
      description: 'Tham gia các hội thảo chuyên môn và cập nhật xu hướng giáo dục STEM',
      color: 'from-purple-500 to-purple-600',
      icon: '🎯'
    },
    {
      title: 'Video hướng dẫn',
      description: 'Xem các video hướng dẫn thực hành từ các chuyên gia giáo dục',
      color: 'from-green-500 to-green-600',
      icon: '🎥'
    }
  ];

  return (
    <div className="relative">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-stem-primary via-stem-secondary to-stem-accent overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Tài nguyên STEM
              <span className="block text-yellow-300">cho Giáo viên Việt Nam</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Nền tảng chia sẻ tài liệu, bài giảng và kinh nghiệm giảng dạy STEM 
              dành riêng cho cộng đồng giáo viên Việt Nam
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-stem-primary hover:bg-gray-50 font-semibold px-8 py-3"
              variant="outline" >
                
                Khám phá ngay
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="  bg-white text-stem-primary hover:bg-gray-50 font-semibold px-8 py-3   "
              >
                Chia sẻ tài liệu
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <stat.icon className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/80 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          {featuredCards.map((card, index) => (
            <Card key={index} className="animate-fade-in hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: `${index * 0.2}s` }}>
              <CardContent className="p-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center mb-4`}>
                  <span className="text-2xl">{card.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 mb-4">{card.description}</p>
                <Button variant="ghost" className="text-stem-primary hover:bg-stem-primary/10 p-0">
                  Xem thêm →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
