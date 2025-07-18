
import React, { useState } from 'react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import ProfileModal from './ProfileModal';

const ProfileDropdown = () => {
  const { user, signOut } = useAuth();
  const { data: profile } = useProfile(user?.id);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogout = () => {
    signOut();
  };

  const getRoleDisplayName = (role: string) => {
    const roleMap = {
      admin: 'Quản trị viên',
      customer: 'Khách hàng',
      student: 'Học sinh',
      teacher: 'Giáo viên'
    };
    return roleMap[role as keyof typeof roleMap] || role;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user || !profile) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2 hover:bg-white/10">
            <Avatar className="w-8 h-8">
              <AvatarImage src={profile.avatar_url || ''} alt={profile.full_name || ''} />
              <AvatarFallback className="bg-white/20 text-white text-sm">
                {profile.full_name ? getInitials(profile.full_name) : <User className="w-4 h-4" />}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium text-white">
                {profile.full_name || user.email}
              </span>
              <span className="text-xs text-white/70">
                {getRoleDisplayName(profile.role || 'customer')}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-white/70" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile.full_name || user.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {getRoleDisplayName(profile.role || 'customer')}
            </p>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => setShowProfileModal(true)}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Chỉnh sửa hồ sơ</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profile={profile}
      />
    </>
  );
};

export default ProfileDropdown;
