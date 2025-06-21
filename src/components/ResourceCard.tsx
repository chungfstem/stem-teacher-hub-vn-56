
import { Download, Eye, Heart, Clock, Tag, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Resource } from '@/types/resource';
import { getLevelColor, getTypeColor } from '@/utils/resourceStyles';

interface ResourceCardProps {
  resource: Resource;
  index: number;
}

const ResourceCard = ({ resource, index }: ResourceCardProps) => {
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in group cursor-pointer" 
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={resource.image}
          alt={resource.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={getLevelColor(resource.level)}>
            {resource.level}
          </Badge>
          <Badge className={getTypeColor(resource.type)}>
            {resource.type}
          </Badge>
        </div>
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-stem-primary transition-colors">
          {resource.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {resource.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <User className="w-4 h-4" />
          <span>{resource.author}</span>
          <span>•</span>
          <span>{resource.school}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
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
          <div className="flex items-center gap-1 ml-auto">
            <Clock className="w-4 h-4" />
            <span>{resource.date}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 bg-stem-primary hover:bg-stem-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Tải xuống
          </Button>
          <Button variant="outline" className="hover:bg-stem-primary/10">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
