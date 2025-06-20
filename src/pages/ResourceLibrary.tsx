
import React, { useState } from 'react';
import { Image, Video, FileText, Download, Play, Eye, Heart, Search, Filter, Grid, List, Folder, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ResourceLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'Video hướng dẫn thí nghiệm Vật lý: Dao động điều hòa',
      type: 'video',
      category: 'Vật lý',
      level: 'THPT',
      duration: '15:30',
      size: '245 MB',
      format: 'MP4',
      quality: '1080p',
      views: 2340,
      downloads: 567,
      likes: 89,
      rating: 4.8,
      author: 'GV. Nguyễn Văn Minh',
      school: 'THPT Lê Quý Đôn',
      date: '2024-01-10',
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&w=400',
      description: 'Video minh họa chi tiết các thí nghiệm về dao động điều hòa với thiết bị đơn giản.',
      tags: ['Vật lý', 'Dao động', 'Thí nghiệm', 'THPT'],
      featured: true
    },
    {
      id: 2,
      title: 'Bộ hình ảnh: Cấu trúc tế bào thực vật',
      type: 'image',
      category: 'Sinh học',
      level: 'THCS',
      quantity: 25,
      size: '156 MB',
      format: 'JPG, PNG',
      resolution: '4K',
      views: 1890,
      downloads: 423,
      likes: 67,
      rating: 4.6,
      author: 'GV. Trần Thị Lan',
      school: 'THCS Nguyễn Du',
      date: '2024-01-08',
      thumbnail: 'https://images.unsplash.com/photo-1576158114131-f211996e9137?ixlib=rb-4.0.3&w=400',
      description: 'Bộ sưu tập hình ảnh chất lượng cao về cấu trúc và chức năng của tế bào thực vật.',
      tags: ['Sinh học', 'Tế bào', 'Thực vật', 'THCS'],
      featured: false
    },
    {
      id: 3,
      title: 'Mô hình 3D: Hệ mặt trời tương tác',
      type: 'model',
      category: 'Thiên văn học',
      level: 'THPT',
      fileCount: 8,
      size: '89 MB',
      format: 'STL, OBJ',
      software: 'Blender',
      views: 1567,
      downloads: 234,
      likes: 45,
      rating: 4.9,
      author: 'GV. Lê Văn Hùng',
      school: 'THPT Chu Văn An',
      date: '2024-01-05',
      thumbnail: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&w=400',
      description: 'Mô hình 3D chi tiết về hệ mặt trời có thể in 3D và lắp ráp thành mô hình vật lý.',
      tags: ['Thiên văn', 'Mô hình 3D', 'Hệ mặt trời', 'THPT'],
      featured: true
    },
    {
      id: 4,
      title: 'Tài liệu: Hướng dẫn lập trình Arduino cho người mới bắt đầu',
      type: 'document',
      category: 'Công nghệ',
      level: 'THCS',
      pages: 156,
      size: '12 MB',
      format: 'PDF',
      language: 'Tiếng Việt',
      views: 3456,
      downloads: 789,
      likes: 123,
      rating: 4.7,
      author: 'GV. Phạm Thị Hoa',
      school: 'THCS Trần Phú',
      date: '2024-01-03',
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&w=400',
      description: 'Tài liệu hướng dẫn từng bước học lập trình Arduino từ cơ bản đến nâng cao.',
      tags: ['Arduino', 'Lập trình', 'Công nghệ', 'THCS'],
      featured: false
    },
    {
      id: 5,
      title: 'Video thực hành: Thí nghiệm Hóa học an toàn',
      type: 'video',
      category: 'Hóa học',
      level: 'THCS',
      duration: '22:45',
      size: '187 MB',
      format: 'MP4',
      quality: '720p',
      views: 1234,
      downloads: 345,
      likes: 56,
      rating: 4.5,
      author: 'GV. Hoàng Văn Đức',
      school: 'THCS Lê Lợi',
      date: '2024-01-01',
      thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&w=400',
      description: 'Video hướng dẫn thực hiện các thí nghiệm hóa học cơ bản một cách an toàn.',
      tags: ['Hóa học', 'Thí nghiệm', 'An toàn', 'THCS'],
      featured: false
    },
    {
      id: 6,
      title: 'Phần mềm mô phỏng: Circuit Simulator',
      type: 'software',
      category: 'Điện tử',
      level: 'THPT',
      version: '2.1.0',
      size: '45 MB',
      format: 'EXE',
      platform: 'Windows',
      views: 2890,
      downloads: 456,
      likes: 78,
      rating: 4.8,
      author: 'Nhóm phát triển STEM',
      school: 'Trường ĐH Bách Khoa HN',
      date: '2023-12-28',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&w=400',
      description: 'Phần mềm mô phỏng mạch điện giúp học sinh thực hành thiết kế mạch điện tử.',
      tags: ['Phần mềm', 'Mô phỏng', 'Mạch điện', 'THPT'],
      featured: true
    }
  ];

  const categories = ['all', 'Vật lý', 'Hóa học', 'Sinh học', 'Toán học', 'Công nghệ', 'Thiên văn học', 'Điện tử'];
  const types = ['all', 'video', 'image', 'document', 'model', 'software'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'image': return <Image className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      case 'model': return <Folder className="w-5 h-5" />;
      case 'software': return <Grid className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'video': 'bg-red-100 text-red-800',
      'image': 'bg-green-100 text-green-800',
      'document': 'bg-blue-100 text-blue-800',
      'model': 'bg-purple-100 text-purple-800',
      'software': 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'video': 'Video',
      'image': 'Hình ảnh',
      'document': 'Tài liệu',
      'model': 'Mô hình 3D',
      'software': 'Phần mềm'
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Thư viện Tài nguyên
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Kho tàng phong phú các tài nguyên đa phương tiện hỗ trợ giảng dạy STEM
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="Tìm kiếm tài nguyên..."
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
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="flex border border-gray-300 rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="image">Hình ảnh</TabsTrigger>
            <TabsTrigger value="document">Tài liệu</TabsTrigger>
            <TabsTrigger value="model">Mô hình 3D</TabsTrigger>
            <TabsTrigger value="software">Phần mềm</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Featured Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tài nguyên nổi bật</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.filter(r => r.featured).map((resource) => (
              <Card key={resource.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                      <Play className="w-4 h-4 mr-2" />
                      Xem
                    </Button>
                  </div>
                  <Badge className={`absolute top-3 left-3 ${getTypeColor(resource.type)}`}>
                    <div className="flex items-center gap-1">
                      {getTypeIcon(resource.type)}
                      {getTypeLabel(resource.type)}
                    </div>
                  </Badge>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 rounded px-2 py-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-white text-xs">{resource.rating}</span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{resource.author}</span>
                    <span>{resource.size}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-3">
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
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-stem-primary hover:bg-stem-primary/90">
                      <Download className="w-4 h-4 mr-2" />
                      Tải về
                    </Button>
                    <Button variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Resources */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Tất cả tài nguyên ({filteredResources.length})
            </h2>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  <div className="relative">
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className={`absolute top-3 left-3 ${getTypeColor(resource.type)}`}>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(resource.type)}
                        {getTypeLabel(resource.type)}
                      </div>
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                      {resource.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>{resource.size}</span>
                      <span>{resource.views} views</span>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button size="sm" className="flex-1 text-xs bg-stem-primary hover:bg-stem-primary/90">
                        <Download className="w-3 h-3 mr-1" />
                        Tải
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={resource.thumbnail}
                        alt={resource.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                          <Badge className={getTypeColor(resource.type)}>
                            <div className="flex items-center gap-1">
                              {getTypeIcon(resource.type)}
                              {getTypeLabel(resource.type)}
                            </div>
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                          {resource.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{resource.author}</span>
                          <span>{resource.size}</span>
                          <span>{resource.views} lượt xem</span>
                          <span>{resource.downloads} lượt tải</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="bg-stem-primary hover:bg-stem-primary/90">
                          <Download className="w-4 h-4 mr-2" />
                          Tải về
                        </Button>
                        <Button variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Tải thêm tài nguyên
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResourceLibrary;
