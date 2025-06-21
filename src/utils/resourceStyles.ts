
export const getLevelColor = (level: string) => {
  switch (level) {
    case 'THCS': return 'bg-green-100 text-green-800';
    case 'THPT': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getTypeColor = (type: string) => {
  switch (type) {
    case 'Bài giảng': return 'bg-purple-100 text-purple-800';
    case 'Hướng dẫn': return 'bg-orange-100 text-orange-800';
    case 'Dự án': return 'bg-cyan-100 text-cyan-800';
    case 'Khóa học': return 'bg-pink-100 text-pink-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
