
import React, { useState } from 'react';
import { Video, BookOpen, Users, Calendar, Star, Play, Download, Eye, Heart, Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/AuthModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LessonsProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  const lessons = [
    {
      id: 1,
      title: 'Bài giảng: Cơ bản về Robot học',
      type: 'lesson',
      category: 'Robotics',
      level: 'THPT',
      duration: '45 phút',
      students: 1234,
      rating: 4.8,
      author: 'GV. Nguyễn Văn A',
      school: 'THPT Lê Quý Đôn',
      date: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&w=400',
      description: 'Giới thiệu các khái niệm cơ bản về robot học và ứng dụng trong giáo dục STEM.',
      tags: ['Robot', 'STEM', 'Cơ bản'],
      featured: true
    },
    {
      id: 2,
      title: 'Dự án: Xây dựng cầu giấy chịu tải',
      type: 'project',
      category: 'Engineering',
      level: 'THCS',
      duration: '2 tiếng',
      students: 890,
      rating: 4.6,
      author: 'GV. Trần Thị B',
      school: 'THCS Nguyễn Du',
      date: '2024-01-08',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&w=400',
      description: 'Dự án thực hành xây dựng cầu giấy với khả năng chịu tải cao nhất.',
      tags: ['Kỹ thuật', 'Thực hành', 'Dự án'],
      featured: false
    }
  ];

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleActionClick = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      console.log('Thực hiện hành động');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bài giảng & Dự án
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Khám phá các bài giảng và dự án STEM chất lượng cao từ cộng đồng giáo viên
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="search"
              placeholder="Tìm kiếm bài giảng, dự án..."
              className="pl-10 py-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-3 border border-gray-300 rounded-md bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Tất cả danh mục</option>
            <option value="Robotics">Robotics</option>
            <option value="Engineering">Engineering</option>
            <option value="Science">Science</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              <div className="relative">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button 
                    size="sm" 
                    className="bg-white text-gray-900 hover:bg-gray-100"
                    onClick={handleActionClick}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Xem
                  </Button>
                </div>
                <Badge className={`absolute top-3 left-3 ${lesson.type === 'lesson' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                  {lesson.type === 'lesson' ? 'Bài giảng' : 'Dự án'}
                </Badge>
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 rounded px-2 py-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-white text-xs">{lesson.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {lesson.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {lesson.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{lesson.author}</span>
                  <span>{lesson.duration}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{lesson.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{lesson.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {lesson.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-stem-primary hover:bg-stem-primary/90"
                    onClick={handleActionClick}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Xem chi tiết
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleActionClick}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode="login"
      />
    </div>
  );
};

export default LessonsProjects;
