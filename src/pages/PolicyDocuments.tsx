import React, { useState } from 'react';
import { Search, Download, FileText, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';

const PolicyDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const documents = [
    {
      id: 1,
      title: 'Chương trình Giáo dục phổ thông mới - Môn Toán',
      description: 'Tài liệu hướng dẫn thực hiện chương trình giáo dục phổ thông mới cho môn Toán',
      type: 'Chính sách',
      date: '2024-01-15',
      author: 'Bộ Giáo dục và Đào tạo',
      fileSize: '2.3 MB',
    },
    {
      id: 2,
      title: 'Thông tư 22/2021/TT-BGDĐT về đánh giá học sinh THCS, THPT',
      description: 'Quy định về đánh giá học sinh trung học cơ sở và trung học phổ thông',
      type: 'Thông tư',
      date: '2021-12-22',
      author: 'Bộ Giáo dục và Đào tạo',
      fileSize: '1.8 MB',
    },
    {
      id: 3,
      title: 'Hướng dẫn 5555/BGDĐT-GDTrH về tổ chức hoạt động trải nghiệm, hướng nghiệp',
      description: 'Hướng dẫn tổ chức các hoạt động trải nghiệm và hướng nghiệp cho học sinh',
      type: 'Hướng dẫn',
      date: '2020-12-18',
      author: 'Bộ Giáo dục và Đào tạo',
      fileSize: '2.5 MB',
    },
    {
      id: 4,
      title: 'Công văn 3089/BGDĐT-GDTrH về triển khai giáo dục STEM',
      description: 'Hướng dẫn triển khai giáo dục STEM trong trường trung học',
      type: 'Công văn',
      date: '2019-07-29',
      author: 'Bộ Giáo dục và Đào tạo',
      fileSize: '1.5 MB',
    },
  ];

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Tài liệu Chính sách</h1>
          <p className="text-gray-600 mb-6">
            Tài liệu chính sách, quy định và hướng dẫn về giáo dục STEM
          </p>
          <AdBanner size="medium" className="mb-6" />
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm tài liệu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-6">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{doc.title}</CardTitle>
                    <CardDescription className="text-base">{doc.description}</CardDescription>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500 ml-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <Badge variant="outline">{doc.type}</Badge>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(doc.date).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {doc.author}
                    </div>
                    <span>{doc.fileSize}</span>
                  </div>
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Tải xuống
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy tài liệu</h3>
            <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PolicyDocuments;
