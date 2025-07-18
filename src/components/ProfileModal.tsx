
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUpdateProfile, Profile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

const ProfileModal = ({ isOpen, onClose, profile }: ProfileModalProps) => {
  const [formData, setFormData] = useState({
    full_name: profile.full_name || '',
    bio: profile.bio || '',
    school: profile.school || '',
    grade_level: profile.grade_level || '',
    phone: profile.phone || '',
    address: profile.address || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const updateProfile = useUpdateProfile();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile.mutateAsync({
        id: profile.id,
        ...formData,
      });
      
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin hồ sơ đã được cập nhật",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Có lỗi xảy ra khi cập nhật",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 px-2">
          <div className="space-y-2">
            <Label htmlFor="full_name">Họ và tên</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => handleInputChange('full_name', e.target.value)}
              placeholder="Nhập họ và tên"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Giới thiệu bản thân</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Viết vài dòng giới thiệu về bản thân..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="school">Trường học</Label>
            <Input
              id="school"
              value={formData.school}
              onChange={(e) => handleInputChange('school', e.target.value)}
              placeholder="Tên trường học"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade_level">Cấp học</Label>
            <Select value={formData.grade_level} onValueChange={(value) => handleInputChange('grade_level', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn cấp học" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="elementary">Tiểu học</SelectItem>
                <SelectItem value="middle">Trung học cơ sở</SelectItem>
                <SelectItem value="high">Trung học phổ thông</SelectItem>
                <SelectItem value="university">Đại học</SelectItem>
                <SelectItem value="graduate">Sau đại học</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Số điện thoại"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Địa chỉ"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button 
              type="submit" 
              className="bg-stem-primary hover:bg-stem-primary/90"
              disabled={isLoading}
            >
              {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
