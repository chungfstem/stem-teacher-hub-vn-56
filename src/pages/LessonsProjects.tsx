
import React, { useState } from 'react';
import { BookOpen, Play, Download, Eye, Heart, Star, Clock, Users, Tag, Filter, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LessonsProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const lessons = [
    {
      id: 1,
      title: 'Robot dọn rác tự động - Dự án Arduino',
      author: 'GV. Nguyễn Văn Minh',
      school: 'THPT Lê Quý Đôn',
      level: 'THPT',
      subject: 'Công nghệ',
      type: 'Dự án thực hành',
      duration: '6 tiết',
      difficulty: 'Trung bình',
      students: 15,
      rating: 4.8,
      views: 1250,
      downloads: 456,
      likes: 89,
      date: '2 ngày trước',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&w=400',
      description: 'Dự án xây dựng robot dọn rác tự động sử dụng Arduino, cảm biến siêu âm và động cơ servo.',
      objectives: ['Hiểu nguyên lý hoạt động của cảm biến', 'Lập trình Arduino cơ bản', 'Thiết kế mô hình cơ khí'],
      materials: ['Arduino Uno', 'Cảm biến HC-SR04', 'Động cơ servo', 'Khung xe robot'],
      tags: ['Arduino', 'Robot', 'Cảm biến', 'Lập trình'],
      files: [
        { name: 'Hướng dẫn thực hiện.pdf', size: '2.3 MB' },
        { name: 'Code Arduino.ino', size: '12 KB' },
        { name: 'Sơ đồ mạch.png', size: '850 KB' }
      ]
    },
    {
      id: 2,
      title: 'Thí nghiệm phản ứng axit-bazơ với chỉ thị màu',
      author: 'GV. Trần Thị Lan',
      school: 'THCS Nguyễn Du',
      level: 'THCS',
      subject: 'Hóa học',
      type: 'Thí nghiệm',
      duration: '2 tiết',
      difficulty: 'Dễ',
      students: 25,
      rating: 4.6,
      views: 890,
      downloads: 234,
      likes: 67,
      date: '1 tuần trước',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&w=400',
      description: 'Thí nghiệm minh họa phản ứng trung hòa giữa axit và bazơ bằng chỉ thị màu tự nhiên.',
      objectives: ['Quan sát hiện tượng đổi màu', 'Hiểu bản chất phản ứng trung hòa', 'Kỹ năng thí nghiệm an toàn'],
      materials: ['Axit HCl', 'Dung dịch NaOH', 'Chỉ thị màu', 'Ống nghiệm', 'Pipet'],
      tags: ['Hóa học', 'Thí nghiệm', 'Axit-bazơ', 'Chỉ thị'],
      files: [
        { name: 'Hướng dẫn thí nghiệm.pdf', size: '1.8 MB' },
        { name: 'Video minh họa.mp4', size: '45 MB' },
        { name: 'Phiếu quan sát.docx', size: '120 KB' }
      ]
    },
    {
      id: 3,
      title: 'Mô hình hệ mặt trời 3D tương tác',
      author: 'GV. Lê Văn Hùng',
      school: 'THPT Chu Văn An',
      level: 'THPT',
      subject: 'Vật lý',
      type: 'Mô hình 3D',
      duration: '4 tiết',
      difficulty: 'Khó',
      students: 20,
      rating: 4.9,
      views: 2150,
      downloads: 678,
      likes: 145,
      date: '3 ngày trước',
      image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&w=400',
      description: 'Xây dựng mô hình 3D hệ mặt trời với chuyển động thực tế và tính toán quỹ đạo.',
      objectives: ['Hiểu cấu trúc hệ mặt trời', 'Tính toán quỹ đạo hành tinh', 'Ứng dụng công nghệ 3D'],
      materials: ['Phần mềm Blender', 'Arduino', 'Động cơ bước', 'LED RGB'],
      tags: ['Vật lý', 'Mô hình 3D', 'Hệ mặt trời', 'Arduino'],
      files: [
        { name: 'File mô hình 3D.blend', size: '15 MB' },
        { name: 'Code điều khiển.ino', size: '8 KB' },
        { name: 'Hướng dẫn lắp ráp.pdf', size: '3.2 MB' }
      ]
    },
    {
      id: 4,
      title: 'Toán học trong thiết kế kiến trúc',
      author: 'GV. Phạm Thị Hoa',
      school: 'THPT Marie Curie',
      level: 'THPT',
      subject: 'Toán học',
      type: 'Bài giảng tích hợp',
      duration: '3 tiết',
      difficulty: 'Trung bình',
      students: 30,
      rating: 4.7,
      views: 1680,
      downloads: 423,
      likes: 78,
      date: '5 ngày trước',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&w=400',
      description: 'Ứng dụng các khái niệm toán học như hình học, tỉ lệ vàng trong thiết kế kiến trúc.',
      objectives: ['Liên hệ toán học với thực tế', 'Hiểu tỉ lệ vàng', 'Kỹ năng thiết kế cơ bản'],
      materials: ['Phần mềm CAD', 'Thước kẻ', 'Compa', 'Máy tính'],
      tags: ['Toán học', 'Kiến trúc', 'Tỉ lệ vàng', 'Thiết kế'],
      files: [
        { name: 'Bài giảng PowerPoint.pptx', size: '8.5 MB' },
        { name: 'Bài tập thực hành.pdf', size: '1.2 MB' },
        { name: 'Video hướng dẫn.mp4', size: '120 MB' }
      ]
    }
  ];

  const levels = ['all', 'Tiểu học', 'THCS', 'THPT'];
  const subjects = ['all', 'Toán học', 'Vật lý', 'Hóa học', 'Sinh học', 'Công nghệ'];

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || lesson.level === selectedLevel;
    const matchesSubject = selectedSubject === 'all' || lesson.subject === selectedSubject;
    return matchesSearch && matchesLevel && matchesSubject;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Dễ': return 'bg-green-100 text-green-800';
      case 'Trung bình': return 'bg-yellow-100 text-yellow-800';
      case 'Khó': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bài giảng & Dự án STEAM
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Khám phá bộ sưu tập bài giảng và dự án STEAM đa dạng, được thiết kế và chia sẻ bởi các giáo viên xuất sắc
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
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
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="all">Tất cả cấp học</option>
              {levels.slice(1).map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <select
              className="px-4 py-3 border border-gray-300 rounded-md bg-white"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="all">Tất cả môn học</option>
              {subjects.slice(1).map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="lessons">Bài giảng</TabsTrigger>
            <TabsTrigger value="projects">Dự án</TabsTrigger>
            <TabsTrigger value="experiments">Thí nghiệm</TabsTrigger>
            <TabsTrigger value="models">Mô hình</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Hiển thị <span className="font-semibold text-stem-primary">{filteredLessons.length}</span> kết quả
          </p>
        </div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-white/90 text-gray-800">
                    {lesson.level}
                  </Badge>
                  <Badge className={getDifficultyColor(lesson.difficulty)}>
                    {lesson.difficulty}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="outline">{lesson.type}</Badge>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{lesson.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-stem-primary transition-colors">
                  {lesson.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {lesson.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <span className="font-medium">{lesson.author}</span>
                  <span>•</span>
                  <span>{lesson.school}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{lesson.students} HS</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{lesson.views}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {lesson.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-stem-primary hover:bg-stem-primary/90">
                    <Download className="w-4 h-4 mr-2" />
                    Tải xuống
                  </Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Tải thêm bài giảng
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LessonsProjects;
