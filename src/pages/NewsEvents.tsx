import React, { useState } from 'react';
import { Search, Calendar, MapPin, Users, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';

const NewsEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const types = [
    { id: 'all', name: 'Tất cả' },
    { id: 'news', name: 'Tin tức' },
    { id: 'workshop', name: 'Hội thảo' },
    { id: 'conference', name: 'Hội nghị' },
    { id: 'competition', name: 'Cuộc thi' },
  ];

  const newsEvents = [
    {
      id: 1,
      title: 'Hội thảo "Đổi mới phương pháp giảng dạy STEM"',
      description: 'Chia sẻ kinh nghiệm và phương pháp giảng dạy STEM hiệu quả',
      type: 'workshop',
      date: '2024-02-15',
      location: 'Hồ Chí Minh, Việt Nam',
      participants: 200,
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400'
    },
    {
      id: 2,
      title: 'Cuộc thi Sáng tạo Khoa học Kỹ thuật cấp Quốc gia',
      description: 'Tìm kiếm và phát triển các dự án sáng tạo của học sinh, sinh viên',
      type: 'competition',
      date: '2024-03-10',
      location: 'Hà Nội, Việt Nam',
      participants: 500,
      image: 'https://images.unsplash.com/photo-1519389950473-47a04ca018e0?w=400'
    },
    {
      id: 3,
      title: 'Tin tức: Ứng dụng AI trong giáo dục STEM',
      description: 'Các ứng dụng của trí tuệ nhân tạo trong việc nâng cao chất lượng dạy và học STEM',
      type: 'news',
      date: '2024-02-01',
      location: 'Toàn quốc',
      image: 'https://images.unsplash.com/photo-1588982947574-5cb946075f41?w=400'
    },
    {
      id: 4,
      title: 'Hội nghị Quốc tế về Giáo dục STEM',
      description: 'Gặp gỡ các chuyên gia và nhà nghiên cứu hàng đầu trong lĩnh vực STEM',
      type: 'conference',
      date: '2024-04-20',
      location: 'Singapore',
      participants: 300,
      image: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=400'
    },
  ];

  const filteredEvents = newsEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Tin tức & Sự kiện</h1>
          <p className="text-gray-600 mb-6">
            Cập nhật tin tức mới nhất và các sự kiện về giáo dục STEM
          </p>
          <AdBanner size="medium" className="mb-6" />
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm tin tức, sự kiện..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {types.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedType === type.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type.id)}
                >
                  {type.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* News & Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">
                    {types.find(t => t.id === event.type)?.name}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(event.date).toLocaleDateString('vi-VN')}
                  </div>
                </div>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  {event.participants && (
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {event.participants} người tham gia
                    </div>
                  )}
                </div>
                <Button className="w-full">
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy sự kiện</h3>
            <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc loại sự kiện</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default NewsEvents;
