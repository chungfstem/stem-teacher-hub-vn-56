import React, { useState } from 'react';
import { Search, Filter, BookOpen, Download, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import { useAuth } from '@/hooks/useAuth';

const ResourceLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { user } = useAuth();

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'documents', name: 'Tài liệu' },
    { id: 'videos', name: 'Video' },
    { id: 'presentations', name: 'Bài thuyết trình' },
    { id: 'experiments', name: 'Thí nghiệm' },
  ];

  const resources = [
    {
      id: 1,
      title: 'Bài giảng Vật lý 12 - Dao động cơ',
      description: 'Tài liệu chi tiết về dao động cơ học với các ví dụ minh họa',
      category: 'documents',
      author: 'GV. Nguyễn Văn A',
      downloads: 1234,
      likes: 89,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
    },
    {
      id: 2,
      title: 'Video thí nghiệm Hóa học 11',
      description: 'Các thí nghiệm thú vị về phản ứng산-bazơ',
      category: 'videos',
      author: 'GV. Trần Thị B',
      downloads: 892,
      likes: 156,
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
    },
    {
      id: 3,
      title: 'Bài thuyết trình Sinh học 10 - Tế bào',
      description: 'Tổng quan về cấu trúc và chức năng của tế bào',
      category: 'presentations',
      author: 'GV. Lê Văn C',
      downloads: 678,
      likes: 112,
      image: 'https://images.unsplash.com/photo-1587370560943-15393726b40a?w=400',
    },
    {
      id: 4,
      title: 'Hướng dẫn thí nghiệm Vật lý 11 - Điện từ',
      description: 'Các bước thực hiện thí nghiệm về điện từ trường',
      category: 'experiments',
      author: 'GV. Phạm Thị D',
      downloads: 456,
      likes: 78,
      image: 'https://images.unsplash.com/photo-1564325524537-765d19fca3a5?w=400',
    },
    {
      id: 5,
      title: 'Bài giảng Toán học 12 - Tích phân',
      description: 'Các phương pháp tính tích phân và ứng dụng',
      category: 'documents',
      author: 'GV. Hoàng Văn E',
      downloads: 901,
      likes: 189,
      image: 'https://images.unsplash.com/photo-1555045424-61216a514382?w=400',
    },
    {
      id: 6,
      title: 'Video thí nghiệm Hóa học 12 - Polyme',
      description: 'Thí nghiệm điều chế và ứng dụng của polyme',
      category: 'videos',
      author: 'GV. Đỗ Thị F',
      downloads: 789,
      likes: 134,
      image: 'https://images.unsplash.com/photo-1542445279-465c55995146?w=400',
    },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thư viện tài nguyên</h1>
          <AdBanner size="small" className="mb-6" />
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm tài nguyên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                <img 
                  src={resource.image} 
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {resource.author}
                  </div>
                  <Badge variant="outline">{categories.find(c => c.id === resource.category)?.name}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {resource.downloads}
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {resource.likes}
                    </div>
                  </div>
                  <Button size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Tải về
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy tài nguyên</h3>
            <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ResourceLibrary;
