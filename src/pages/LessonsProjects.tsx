import React, { useState } from 'react';
import { Search, Play, Download, Clock, User, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';

const LessonsProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = [
    { id: 'all', name: 'Tất cả' },
    { id: 'math', name: 'Toán học' },
    { id: 'physics', name: 'Vật lý' },
    { id: 'chemistry', name: 'Hóa học' },
    { id: 'biology', name: 'Sinh học' },
    { id: 'technology', name: 'Công nghệ' },
  ];

  const lessons = [
    {
      id: 1,
      title: 'Bài giảng: Hàm số bậc hai và đồ thị',
      description: 'Tìm hiểu về tính chất và cách vẽ đồ thị hàm số bậc hai',
      subject: 'math',
      duration: '45 phút',
      author: 'GV. Nguyễn Thị Mai',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
      type: 'video'
    },
    {
      id: 2,
      title: 'Dự án: Xây dựng mô hình nhà kính thông minh',
      description: 'Hướng dẫn xây dựng mô hình nhà kính sử dụng cảm biến và điều khiển tự động',
      subject: 'technology',
      duration: '60 phút',
      author: 'GV. Trần Văn Nam',
      thumbnail: 'https://images.unsplash.com/photo-1587614382399-697ef427ca18?w=400',
      type: 'project'
    },
    {
      id: 3,
      title: 'Thí nghiệm: Phản ứng trao đổi ion',
      description: 'Thực hiện và quan sát phản ứng trao đổi ion trong dung dịch',
      subject: 'chemistry',
      duration: '50 phút',
      author: 'GV. Lê Thị Hà',
      thumbnail: 'https://images.unsplash.com/photo-1542445279-465c5599513b?w=400',
      type: 'experiment'
    },
    {
      id: 4,
      title: 'Bài giảng: Định luật bảo toàn năng lượng',
      description: 'Nghiên cứu về định luật bảo toàn năng lượng và ứng dụng',
      subject: 'physics',
      duration: '40 phút',
      author: 'GV. Phạm Văn Hùng',
      thumbnail: 'https://images.unsplash.com/photo-1576766421199-896c9a14f88b?w=400',
      type: 'video'
    },
    {
      id: 5,
      title: 'Dự án: Nghiên cứu ảnh hưởng của ánh sáng đến sự phát triển của cây',
      description: 'Thực hiện dự án nghiên cứu về ảnh hưởng của các loại ánh sáng khác nhau đến sự phát triển của cây trồng',
      subject: 'biology',
      duration: '70 phút',
      author: 'GV. Hoàng Thị Hương',
      thumbnail: 'https://images.unsplash.com/photo-1563453392977-c96dadeca9f3?w=400',
      type: 'project'
    },
  ];

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || lesson.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Bài giảng & Dự án</h1>
          <p className="text-gray-600 mb-6">
            Khám phá các bài giảng và dự án STEM chất lượng cao
          </p>
          <AdBanner size="small" className="mb-6" />
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm bài giảng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {subjects.map((subject) => (
                <Button
                  key={subject.id}
                  variant={selectedSubject === subject.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSubject(subject.id)}
                >
                  {subject.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden relative">
                <img 
                  src={lesson.thumbnail} 
                  alt={lesson.title}
                  className="w-full h-full object-cover"
                />
                {lesson.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-3">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                )}
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{lesson.title}</CardTitle>
                <CardDescription>{lesson.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {lesson.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {lesson.duration}
                    </div>
                  </div>
                  <Badge variant="outline">
                    {subjects.find(s => s.id === lesson.subject)?.name}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Xem ngay
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy bài giảng</h3>
            <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc môn học</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default LessonsProjects;
