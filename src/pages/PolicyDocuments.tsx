
import React, { useState } from 'react';
import { FileText, Download, Calendar, Building, Search, Filter, ChevronDown, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PolicyDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documents = [
    {
      id: 1,
      title: 'Thông tư 32/2018/TT-BGDĐT về chương trình giáo dục phổ thông',
      category: 'Thông tư',
      issuer: 'Bộ GD&ĐT',
      date: '26/12/2018',
      summary: 'Quy định về chương trình giáo dục phổ thông, trong đó có quy định về giáo dục STEM.',
      type: 'Chính thức',
      downloads: 1250,
      tags: ['Chương trình', 'STEM', 'Phổ thông'],
      fileSize: '2.3 MB',
      pages: 156
    },
    {
      id: 2,
      title: 'Hướng dẫn triển khai giáo dục STEM trong trường phổ thông',
      category: 'Hướng dẫn',
      issuer: 'Vụ Giáo dục Trung học',
      date: '15/03/2020',
      summary: 'Tài liệu hướng dẫn chi tiết cách triển khai giáo dục STEM hiệu quả trong môi trường trường học.',
      type: 'Hướng dẫn',
      downloads: 890,
      tags: ['Hướng dẫn', 'Triển khai', 'STEM'],
      fileSize: '1.8 MB',
      pages: 89
    },
    {
      id: 3,
      title: 'Quyết định 2080/QĐ-BGDĐT về đổi mới phương pháp dạy học',
      category: 'Quyết định',
      issuer: 'Bộ GD&ĐT',
      date: '22/08/2019',
      summary: 'Quy định về đổi mới phương pháp dạy học theo hướng phát triển năng lực học sinh.',
      type: 'Chính thức',
      downloads: 756,
      tags: ['Đổi mới', 'Phương pháp', 'Năng lực'],
      fileSize: '3.1 MB',
      pages: 124
    },
    {
      id: 4,
      title: 'Mô hình STEAM - Tích hợp nghệ thuật vào giáo dục STEM',
      category: 'Mô hình',
      issuer: 'Viện Khoa học Giáo dục',
      date: '10/11/2021',
      summary: 'Nghiên cứu và đề xuất mô hình STEAM tích hợp nghệ thuật vào giáo dục STEM.',
      type: 'Nghiên cứu',
      downloads: 567,
      tags: ['STEAM', 'Nghệ thuật', 'Tích hợp'],
      fileSize: '4.2 MB',
      pages: 78
    },
    {
      id: 5,
      title: 'Công văn 1875/BGDĐT-GDTH về tăng cường hoạt động STEM',
      category: 'Công văn',
      issuer: 'Bộ GD&ĐT',
      date: '05/09/2022',
      summary: 'Chỉ đạo các cơ sở giáo dục tăng cường triển khai các hoạt động giáo dục STEM.',
      type: 'Chính thức',
      downloads: 432,
      tags: ['Chỉ đạo', 'Hoạt động', 'STEM'],
      fileSize: '0.8 MB',
      pages: 12
    },
    {
      id: 6,
      title: 'Khung chương trình STEM cho giáo dục tiểu học',
      category: 'Khung chương trình',
      issuer: 'Vụ Giáo dục Tiểu học',
      date: '20/01/2023',
      summary: 'Khung chương trình chi tiết cho việc triển khai giáo dục STEM ở bậc tiểu học.',
      type: 'Khung chương trình',
      downloads: 678,
      tags: ['Tiểu học', 'Khung CT', 'STEM'],
      fileSize: '2.7 MB',
      pages: 95
    }
  ];

  const categories = ['all', 'Thông tư', 'Hướng dẫn', 'Quyết định', 'Mô hình', 'Công văn', 'Khung chương trình'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Thông tư': 'bg-blue-100 text-blue-800',
      'Hướng dẫn': 'bg-green-100 text-green-800',
      'Quyết định': 'bg-purple-100 text-purple-800',
      'Mô hình': 'bg-orange-100 text-orange-800',
      'Công văn': 'bg-red-100 text-red-800',
      'Khung chương trình': 'bg-cyan-100 text-cyan-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-stem-primary to-stem-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Chính sách & Văn bản pháp luật
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Tổng hợp các văn bản pháp luật, chính sách và hướng dẫn về giáo dục STEM từ Bộ GD&ĐT
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="Tìm kiếm văn bản theo tiêu đề, nội dung..."
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
              <option value="all">Tất cả loại văn bản</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-stem-primary" : ""}
              >
                {category === 'all' ? 'Tất cả' : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Tìm thấy <span className="font-semibold text-stem-primary">{filteredDocuments.length}</span> văn bản
          </p>
        </div>

        {/* Documents Grid */}
        <div className="grid gap-6">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-stem-primary to-stem-secondary rounded-lg flex items-center justify-center">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start gap-2 mb-3">
                      <Badge className={getCategoryColor(doc.category)}>
                        {doc.category}
                      </Badge>
                      <Badge variant="outline">{doc.type}</Badge>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-stem-primary cursor-pointer">
                      {doc.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {doc.summary}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        <span>{doc.issuer}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{doc.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span>{doc.downloads} lượt tải</span>
                      </div>
                      <span>{doc.fileSize} • {doc.pages} trang</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {doc.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button className="bg-stem-primary hover:bg-stem-primary/90">
                      <Download className="w-4 h-4 mr-2" />
                      Tải xuống
                    </Button>
                    <Button variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Xem trước
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Xem thêm văn bản
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PolicyDocuments;
