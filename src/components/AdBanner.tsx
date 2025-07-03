
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AdBannerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const AdBanner = ({ size = 'small', className = '' }: AdBannerProps) => {
  const sizeClasses = {
    small: 'h-16',
    medium: 'h-24',
    large: 'h-32'
  };

  return (
    <Card className={`${sizeClasses[size]} ${className} bg-gradient-to-r from-blue-50 to-purple-50 border-dashed border-2 border-blue-200`}>
      <CardContent className="flex items-center justify-center h-full p-2">
        <div className="text-center">
          <Badge variant="outline" className="text-xs text-blue-600 border-blue-300 mb-1">
            Quảng cáo
          </Badge>
          <p className="text-xs text-gray-500">
            Liên hệ đặt quảng cáo
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdBanner;
