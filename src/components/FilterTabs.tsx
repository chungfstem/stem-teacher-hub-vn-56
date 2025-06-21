
import { Button } from '@/components/ui/button';

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterTabs = ({ activeFilter, onFilterChange }: FilterTabsProps) => {
  const filters = ['Tất cả', 'Bài giảng', 'Thí nghiệm', 'Dự án', 'Video', 'Tài liệu'];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={filter === activeFilter ? 'default' : 'outline'}
          className={filter === activeFilter ? 'bg-stem-primary hover:bg-stem-primary/90' : 'hover:bg-stem-primary/10'}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};

export default FilterTabs;
