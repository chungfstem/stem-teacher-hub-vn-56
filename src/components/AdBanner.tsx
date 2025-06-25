
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AdBannerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const AdBanner = ({ size = 'medium', className = '' }: AdBannerProps) => {
  const sizeClasses = {
    small: 'h-20',
    medium: 'h-32',
    large: 'h-48'
  };

  return (
    <Card className={`${sizeClasses[size]} ${className} bg-gradient-to-r from-blue-50 to-purple-50 border-dashed border-2 border-blue-200`}>
      <CardContent className="flex items-center justify-center h-full p-4">
        <div className="text-center">
          <Badge variant="outline" className="mb-2 text-blue-600 border-blue-300">
            Quảng cáo
          </Badge>
          <p className="text-sm text-gray-500">
            Không gian quảng cáo - Liên hệ để đặt quảng cáo
          </p>
          <p className="text-xs text-gray-400 mt-1">
            contact@fstem.asia
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdBanner;
