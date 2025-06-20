
import React from 'react';
import { Download, Eye, Heart, Clock, Tag, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ResourceGrid = () => {
  const resources = [
    {
      id: 1,
      title: 'Bài giảng Vật lý: Định luật Newton',
      author: 'GV. Nguyễn Văn A',
      school: 'THPT Chu Văn An',
      date: '2 ngày trước',
      downloads: 125,
      views: 340,
      likes: 23,
      tags: ['Vật lý', 'THPT', 'PowerPoint'],
      level: 'THPT',
      type: 'Bài giảng',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&w=400',
      description: 'Bài giảng chi tiết về ba định luật Newton với các ví dụ thực tế và bài tập ứng dụng.'
    },
    {
      id: 2,
      title: 'Thí nghiệm Hóa học: Phản ứng Acid-Base',
      author: 'GV. Trần Thị B',
      school: 'THCS Lê Quý Đôn',
      date: '1 tuần trước',
      downloads: 89,
      views: 256,
      likes: 18,
      tags: ['Hóa học', 'THCS', 'Thí nghiệm'],
      level: 'THCS',
      type: 'Hướng dẫn',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&w=400',
      description: 'Hướng dẫn thực hiện các thí nghiệm cơ bản về phản ứng acid-base an toàn và hiệu quả.'
    },
    {
      id: 3,
      title: 'Dự án STEM: Robot dọn rác tự động',
      author: 'GV. Lê Văn C',
      school: 'THPT Nguyễn Du',
      date: '3 ngày trước',
      downloads: 201,
      views: 478,
      likes: 45,
      tags: ['Robotics', 'STEM', 'Dự án'],
      level: 'THPT',
      type: 'Dự án',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&w=400',
      description: 'Hướng dẫn xây dựng robot dọn rác tự động sử dụng Arduino và cảm biến siêu âm.'
    },
    {
      id: 4,
      title: 'Toán học thực tế: Ứng dụng đạo hàm',
      author: 'GV. Phạm Thị D',
      school: 'THPT Marie Curie',
      date: '5 ngày trước',
      downloads: 156,
      views: 389,
      likes: 31,
      tags: ['Toán học', 'THPT', 'Ứng dụng'],
      level: 'THPT',
      type: 'Bài giảng',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&w=400',
      description: 'Các bài toán thực tế ứng dụng đạo hàm trong kinh tế, vật lý và kỹ thuật.'
    },
    {
      id: 5,
      title: 'Sinh học: Mô hình DNA 3D',
      author: 'GV. Hoàng Văn E',
      school: 'THPT Lê Hồng Phong',
      date: '1 tuần trước',
      downloads: 98,
      views: 287,
      likes: 22,
      tags: ['Sinh học', 'THPT', 'Mô hình'],
      level: 'THPT',
      type: 'Hướng dẫn',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&w=400',
      description: 'Hướng dẫn tạo mô hình DNA 3D bằng vật liệu đơn giản cho giờ học sinh học.'
    },
    {
      id: 6,
      title: 'Công nghệ thông tin: Lập trình Scratch',
      author: 'GV. Ngô Thị F',
      school: 'THCS Trần Phú',
      date: '4 ngày trước',
      downloads: 167,
      views: 412,
      likes: 38,
      tags: ['Tin học', 'THCS', 'Scratch'],
      level: 'THCS',
      type: 'Khóa học',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&w=400',
      description: 'Khóa học lập trình Scratch từ cơ bản đến nâng cao cho học sinh THCS.'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'THCS': return 'bg-green-100 text-green-800';
      case 'THPT': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Bài giảng': return 'bg-purple-100 text-purple-800';
      case 'Hướng dẫn': return 'bg-orange-100 text-orange-800';
      case 'Dự án': return 'bg-cyan-100 text-cyan-800';
      case 'Khóa học': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Tài nguyên nổi bật
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Khám phá những tài liệu, bài giảng và dự án STEM được yêu thích nhất từ cộng đồng giáo viên
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {['Tất cả', 'Bài giảng', 'Thí nghiệm', 'Dự án', 'Video', 'Tài liệu'].map((filter) => (
          <Button
            key={filter}
            variant={filter === 'Tất cả' ? 'default' : 'outline'}
            className={filter === 'Tất cả' ? 'bg-stem-primary hover:bg-stem-primary/90' : 'hover:bg-stem-primary/10'}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in group cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="relative overflow-hidden">
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className={getLevelColor(resource.level)}>
                  {resource.level}
                </Badge>
                <Badge className={getTypeColor(resource.type)}>
                  {resource.type}
                </Badge>
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-stem-primary transition-colors">
                {resource.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {resource.description}
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <User className="w-4 h-4" />
                <span>{resource.author}</span>
                <span>•</span>
                <span>{resource.school}</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{resource.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  <span>{resource.downloads}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{resource.likes}</span>
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  <Clock className="w-4 h-4" />
                  <span>{resource.date}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {resource.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-stem-primary hover:bg-stem-primary/90">
                  <Download className="w-4 h-4 mr-2" />
                  Tải xuống
                </Button>
                <Button variant="outline" className="hover:bg-stem-primary/10">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" size="lg" className="text-stem-primary border-stem-primary hover:bg-stem-primary hover:text-white">
          Xem thêm tài nguyên
        </Button>
      </div>
    </div>
  );
};

export default ResourceGrid;
