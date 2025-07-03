
import React, { useState } from 'react';
import { FileText, Download, Eye, Calendar, User, Tag, Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/AuthModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PolicyDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  const documents = [
    {
      id: 1,
      title: 'Thông tư 32/2018/TT-BGDĐT về việc ban hành chương trình giáo dục phổ thông',
      category: 'Chính sách',
      type: 'PDF',
      size: '2.5 MB',
      pages: 156,
      downloads: 2340,
      views: 15670,
      date: '2024-01-10',
      author: 'Bộ GD&ĐT',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&w=400',
      description: 'Văn bản quy định về chương trình giáo dục phổ thông mới, tập trung vào phát triển năng lực học sinh.',
      tags: ['Chính sách', 'Giáo dục', 'Chương trình'],
      featured: true
    },
    {
      id: 2,
      title: 'Hướng dẫn thực hiện giáo dục STEM trong trường phổ thông',
      category: 'Hướng dẫn',
      type: 'PDF',
      size: '1.8 MB',
      pages: 89,
      downloads: 1890,
      views: 12450,
      date: '2024-01-08',
      author: 'Viện Khoa học Giáo dục Việt Nam',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&w=400',
      description: 'Tài liệu hướng dẫn chi tiết về cách tích hợp giáo dục STEM vào chương trình học.',
      tags: ['STEM', 'Hướng dẫn', 'Tích hợp'],
      featured: false
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
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
      
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tài liệu Chính sách
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Kho tàng các văn bản chính sách, hướng dẫn về giáo dục STEM
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
              placeholder="Tìm kiếm tài liệu..."
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
            <option value="Chính sách">Chính sách</option>
            <option value="Hướng dẫn">Hướng dẫn</option>
            <option value="Quy định">Quy định</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              <div className="relative">
                <img
                  src={doc.image}
                  alt={doc.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-blue-100 text-blue-800">
                  <FileText className="w-3 h-3 mr-1" />
                  {doc.type}
                </Badge>
                <div className="absolute top-3 right-3 bg-black/50 rounded px-2 py-1">
                  <span className="text-white text-xs">{doc.size}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {doc.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {doc.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <User className="w-4 h-4" />
                  <span>{doc.author}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{doc.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span>{doc.downloads}</span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <Calendar className="w-4 h-4" />
                    <span>{doc.date}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {doc.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-stem-primary hover:bg-stem-primary/90"
                    onClick={handleActionClick}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Tải xuống
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleActionClick}
                  >
                    <Eye className="w-4 h-4" />
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

export default PolicyDocuments;
