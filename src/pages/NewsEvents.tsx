
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, ExternalLink, Share2, BookmarkPlus, Newspaper, Award, Megaphone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NewsEvents = () => {
  const news = [
    {
      id: 1,
      title: 'Hội thảo Quốc tế về Giáo dục STEM 2024',
      category: 'Hội thảo',
      date: '2024-01-15',
      time: '08:00 - 17:00',
      location: 'Hà Nội',
      venue: 'Trung tâm Hội nghị Quốc gia',
      organizer: 'Bộ GD&ĐT',
      participants: 500,
      type: 'Sự kiện',
      status: 'Sắp diễn ra',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&w=400',
      description: 'Hội thảo quy tụ các chuyên gia hàng đầu trong lĩnh vực giáo dục STEM từ khắp thế giới.',
      highlights: [
        'Xu hướng giáo dục STEM toàn cầu',
        'Ứng dụng AI trong giảng dạy',
        'Mô hình STEAM thành công'
      ],
      speakers: ['GS. Nguyễn Văn A', 'TS. Sarah Johnson', 'PGS. Trần Thị B'],
      registrationDeadline: '2024-01-10',
      fee: 'Miễn phí',
      tags: ['Hội thảo', 'Quốc tế', 'STEM', 'Giáo dục']
    },
    {
      id: 2,
      title: 'Cuộc thi Robot STEM dành cho học sinh THPT',
      category: 'Cuộc thi',
      date: '2024-02-20',
      time: '09:00 - 16:00',
      location: 'TP.HCM',
      venue: 'Đại học Bách Khoa',
      organizer: 'Sở GD&ĐT TP.HCM',
      participants: 200,
      type: 'Cuộc thi',
      status: 'Đang mở đăng ký',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&w=400',
      description: 'Cuộc thi robot sáng tạo dành cho học sinh THPT toàn quốc với nhiều thử thách thú vị.',
      highlights: [
        'Thiết kế robot tự động',
        'Lập trình AI cơ bản',
        'Giải pháp thực tế'
      ],
      prizes: ['Giải Nhất: 20 triệu đồng', 'Giải Nhì: 15 triệu đồng', 'Giải Ba: 10 triệu đồng'],
      registrationDeadline: '2024-02-10',
      fee: '500.000 VNĐ/đội',
      tags: ['Cuộc thi', 'Robot', 'THPT', 'Sáng tạo']
    },
    {
      id: 3,
      title: 'Chương trình tập huấn giáo viên STEM miền Bắc',
      category: 'Tập huấn',
      date: '2024-01-25',
      time: '08:30 - 16:30',
      location: 'Hà Nội',
      venue: 'Trường ĐH Sư phạm Hà Nội',
      organizer: 'Vụ Giáo dục Trung học',
      participants: 150,
      type: 'Tập huấn',
      status: 'Đang diễn ra',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&w=400',
      description: 'Chương trình tập huấn nâng cao năng lực giảng dạy STEM cho giáo viên các tỉnh miền Bắc.',
      highlights: [
        'Phương pháp giảng dạy tích hợp',
        'Sử dụng công nghệ trong dạy học',
        'Đánh giá năng lực STEM'
      ],
      benefits: ['Cấp chứng chỉ tập huấn', 'Tài liệu miễn phí', 'Hỗ trợ chi phí đi lại'],
      registrationDeadline: '2024-01-20',
      fee: 'Miễn phí',
      tags: ['Tập huấn', 'Giáo viên', 'Miền Bắc', 'Năng lực']
    },
    {
      id: 4,
      title: 'Triển lãm Công nghệ Giáo dục STEM Việt Nam 2024',
      category: 'Triển lãm',
      date: '2024-03-15',
      time: '09:00 - 18:00',
      location: 'Hà Nội',
      venue: 'Trung tâm Triển lãm Giảng Võ',
      organizer: 'Hiệp hội STEM Việt Nam',
      participants: 1000,
      type: 'Triển lãm',
      status: 'Sắp diễn ra',
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&w=400',
      description: 'Triển lãm quy mô lớn giới thiệu các sản phẩm, công nghệ mới nhất trong giáo dục STEM.',
      highlights: [
        'Công nghệ AR/VR trong giáo dục',
        'Robot giáo dục thông minh',
        'Phần mềm mô phỏng khoa học'
      ],
      exhibitors: ['FPT Education', 'STEAM for Vietnam', 'Techkids'],
      activities: ['Demo sản phẩm', 'Workshop thực hành', 'Talk show chuyên gia'],
      fee: 'Miễn phí',
      tags: ['Triển lãm', 'Công nghệ', 'STEM', 'Sản phẩm']
    }
  ];

  const recentNews = [
    {
      id: 5,
      title: 'Bộ GD&ĐT công bố chương trình STEM mới cho năm học 2024-2025',
      category: 'Tin tức',
      date: '2024-01-10',
      source: 'Báo Giáo dục Việt Nam',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&w=400',
      summary: 'Chương trình mới tích hợp nhiều hoạt động thực hành và ứng dụng công nghệ hiện đại.',
      tags: ['Chính sách', 'Chương trình', 'Bộ GD&ĐT']
    },
    {
      id: 6,
      title: 'Học sinh Việt Nam đạt giải cao tại Olympic STEM Quốc tế',
      category: 'Thành tích',
      date: '2024-01-08',
      source: 'VnExpress',
      image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-4.0.3&w=400',
      summary: 'Đội tuyển Việt Nam giành 3 huy chương vàng và 5 huy chương bạc tại cuộc thi quốc tế.',
      tags: ['Thành tích', 'Olympic', 'Quốc tế']
    },
    {
      id: 7,
      title: '100 trường học đầu tiên triển khai phòng lab STEM thông minh',
      category: 'Dự án',
      date: '2024-01-05',
      source: 'Tuổi Trẻ Online',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&w=400',
      summary: 'Dự án thí điểm trang bị phòng lab STEM với công nghệ AI và IoT cho 100 trường THPT.',
      tags: ['Dự án', 'Phòng lab', 'Công nghệ']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sắp diễn ra': return 'bg-blue-100 text-blue-800';
      case 'Đang diễn ra': return 'bg-green-100 text-green-800';
      case 'Đang mở đăng ký': return 'bg-yellow-100 text-yellow-800';
      case 'Đã kết thúc': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Hội thảo': return <Users className="w-5 h-5" />;
      case 'Cuộc thi': return <Award className="w-5 h-5" />;
      case 'Tập huấn': return <BookmarkPlus className="w-5 h-5" />;
      case 'Triển lãm': return <Megaphone className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tin tức & Sự kiện STEM
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Cập nhật những tin tức mới nhất và tham gia các sự kiện STEM hấp dẫn
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="events" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="events">Sự kiện sắp tới</TabsTrigger>
            <TabsTrigger value="news">Tin tức mới</TabsTrigger>
          </TabsList>
          
          <TabsContent value="events" className="space-y-8">
            <div className="grid gap-8">
              {news.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/3">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                    </div>
                    
                    <CardContent className="lg:w-2/3 p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getCategoryIcon(event.category)}
                          {event.category}
                        </Badge>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-stem-primary cursor-pointer">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">
                        {event.description}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location} - {event.venue}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{event.participants} người tham gia</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">BTC:</span> {event.organizer}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Phí:</span> {event.fee}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Điểm nổi bật:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {event.highlights.map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Button className="bg-stem-primary hover:bg-stem-primary/90">
                          Đăng ký tham gia
                        </Button>
                        <Button variant="outline">
                          <Share2 className="w-4 h-4 mr-2" />
                          Chia sẻ
                        </Button>
                        <Button variant="outline">
                          <BookmarkPlus className="w-4 h-4 mr-2" />
                          Lưu
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="news" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentNews.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800">
                      {article.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-stem-primary transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.summary}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>{article.source}</span>
                      <span>{article.date}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Đọc thêm
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default NewsEvents;
