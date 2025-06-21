
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { mockResources } from '@/data/resources';
import ResourceCard from './ResourceCard';
import FilterTabs from './FilterTabs';

const ResourceGrid = () => {
  const [activeFilter, setActiveFilter] = useState('Tất cả');

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

      <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockResources.map((resource, index) => (
          <ResourceCard key={resource.id} resource={resource} index={index} />
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
