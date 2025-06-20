
import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, Calendar, Download, Eye, Star, BookOpen, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AdvancedSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [ratingRange, setRatingRange] = useState([0]);
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  const searchResults = [
    {
      id: 1,
      title: 'Thí nghiệm Vật lý: Định luật Ohm với mạch điện đơn giản',
      type: 'Thí nghiệm',
      level: 'THPT',
      subject: 'Vật lý',
      author: 'GV. Nguyễn Văn Minh',
      school: 'THPT Lê Quý Đôn',
      rating: 4.8,
      views: 2340,
      downloads: 567,
      date: '2024-01-10',
      duration: '45 phút',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&w=400',
      description: 'Hướng dẫn thực hiện thí nghiệm chứng minh định luật Ohm bằng thiết bị đơn giản, dễ thực hiện trong phòng lab.',
      tags: ['Định luật Ohm', 'Mạch điện', 'Thí nghiệm'],
      difficulty: 'Trung bình'
    },
    {
      id: 2,
      title: 'Dự án Robot dọn rác tự động sử dụng Arduino',
      type: 'Dự án',
      level: 'THPT',
      subject: 'Công nghệ',
      author: 'GV. Trần Thị Lan',
      school: 'THCS Nguyễn Du',
      rating: 4.6,
      views: 1890,
      downloads: 423,
      date: '2024-01-08',
      duration: '6 tiết',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&w=400',
      description: 'Hướng dẫn xây dựng robot dọn rác tự động với Arduino, cảm biến siêu âm và động cơ servo.',
      tags: ['Arduino', 'Robot', 'Tự động hóa'],
      difficulty: 'Khó'
    },
    {
      id: 3,
      title: 'Mô hình DNA 3D - Cấu trúc và chức năng',
      type: 'Mô hình',
      level: 'THCS',
      subject: 'Sinh học',
      author: 'GV. Lê Văn Hùng',
      school: 'THPT Chu Văn An',
      rating: 4.9,
      views: 1567,
      downloads: 234,
      date: '2024-01-05',
      duration: '3 tiết',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&w=400',
      description: 'Hướng dẫn tạo mô hình DNA 3D bằng vật liệu đơn giản, giúp học sinh hiểu rõ cấu trúc phân tử.',
      tags: ['DNA', 'Mô hình 3D', 'Sinh học phân tử'],
      difficulty: 'Dễ'
    },
    {
      id: 4,
      title: 'Ứng dụng Toán học trong thiết kế kiến trúc',
      type: 'Bài giảng',
      level: 'THPT',
      subject: 'Toán học',
      author: 'GV. Phạm Thị Hoa',
      school: 'THPT Marie Curie',
      rating: 4.7,
      views: 1680,
      downloads: 423,
      date: '2024-01-03',
      duration: '90 phút',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&w=400',
      description: 'Khám phá ứng dụng của hình học, tỉ lệ vàng và các khái niệm toán học trong kiến trúc.',
      tags: ['Toán ứng dụng', 'Kiến trúc', 'Hình học'],
      difficulty: 'Trung bình'
    }
  ];

  const levels = ['Tiểu học', 'THCS', 'THPT'];
  const subjects = ['Toán học', 'Vật lý', 'Hóa học', 'Sinh học', 'Công nghệ', 'Tin học'];
  const types = ['Bài giảng', 'Thí nghiệm', 'Dự án', 'Video', 'Mô hình', 'Tài liệu'];

  const handleLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      setSelectedLevels([...selectedLevels, level]);
    } else {
      setSelectedLevels(selectedLevels.filter(l => l !== level));
    }
  };

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setSelectedSubjects([...selectedSubjects, subject]);
    } else {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
    }
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Dễ': return 'bg-green-100 text-green-800';
      case 'Trung bình': return 'bg-yellow-100 text-yellow-800';
      case 'Khó': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Bài giảng': 'bg-blue-100 text-blue-800',
      'Thí nghiệm': 'bg-green-100 text-green-800',
      'Dự án': 'bg-purple-100 text-purple-800',
      'Video': 'bg-red-100 text-red-800',
      'Mô hình': 'bg-orange-100 text-orange-800',
      'Tài liệu': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tìm kiếm Nâng cao
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Tìm kiếm tài nguyên STEM chính xác với các bộ lọc chi tiết và tiên tiến
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  Bộ lọc tìm kiếm
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search Input */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Từ khóa
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="search"
                      placeholder="Nhập từ khóa..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Education Level */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Cấp học
                  </label>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={level}
                          checked={selectedLevels.includes(level)}
                          onCheckedChange={(checked) => handleLevelChange(level, checked as boolean)}
                        />
                        <label htmlFor={level} className="text-sm text-gray-600">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subjects */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Môn học
                  </label>
                  <div className="space-y-2">
                    {subjects.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          id={subject}
                          checked={selectedSubjects.includes(subject)}
                          onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                        />
                        <label htmlFor={subject} className="text-sm text-gray-600">
                          {subject}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resource Types */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Loại tài nguyên
                  </label>
                  <div className="space-y-2">
                    {types.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
                        />
                        <label htmlFor={type} className="text-sm text-gray-600">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Đánh giá tối thiểu: {ratingRange[0]} sao
                  </label>
                  <Slider
                    value={ratingRange}
                    onValueChange={setRatingRange}
                    max={5}
                    min={0}
                    step={0.5}
                    className="w-full"
                  />
                </div>

                {/* Date Range */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Thời gian đăng
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <option value="all">Tất cả</option>
                    <option value="today">Hôm nay</option>
                    <option value="week">Tuần này</option>
                    <option value="month">Tháng này</option>
                    <option value="year">Năm nay</option>
                  </select>
                </div>

                {/* Reset Button */}
                <Button variant="outline" className="w-full">
                  Xóa bộ lọc
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            {/* Search Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Kết quả tìm kiếm
                </h2>
                <p className="text-gray-600">
                  Tìm thấy <span className="font-semibold text-stem-primary">{searchResults.length}</span> kết quả
                </p>
              </div>
              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <span className="text-sm text-gray-600">Sắp xếp:</span>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevance">Liên quan</option>
                  <option value="newest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                  <option value="rating">Đánh giá cao nhất</option>
                  <option value="downloads">Lượt tải nhiều nhất</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            <div className="space-y-6">
              {searchResults.map((result) => (
                <Card key={result.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-full lg:w-48 h-32 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start gap-2 mb-3">
                          <Badge className={getTypeColor(result.type)}>
                            {result.type}
                          </Badge>
                          <Badge variant="outline">{result.level}</Badge>
                          <Badge variant="outline">{result.subject}</Badge>
                          <Badge className={getDifficultyColor(result.difficulty)}>
                            {result.difficulty}
                          </Badge>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-stem-primary cursor-pointer">
                          {result.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {result.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="font-medium">{result.author}</span>
                          <span>•</span>
                          <span>{result.school}</span>
                          <span>•</span>
                          <span>{result.date}</span>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{result.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{result.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            <span>{result.downloads}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{result.duration}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {result.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 lg:w-32">
                        <Button className="bg-stem-primary hover:bg-stem-primary/90">
                          <Download className="w-4 h-4 mr-2" />
                          Tải xu

ống
                        </Button>
                        <Button variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Xem
                        </Button>
                        <Button variant="outline">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Chi tiết
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Trước
                </Button>
                <Button variant="default" size="sm" className="bg-stem-primary">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Sau
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdvancedSearch;
