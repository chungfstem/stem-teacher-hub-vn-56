
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Home } from 'lucide-react';

const Auth = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: 'customer' as 'admin' | 'customer' | 'student' | 'teacher'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'register') {
        // Validation for registration
        if (!formData.fullName.trim()) {
          toast({
            title: "Lỗi",
            description: "Vui lòng nhập họ và tên",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Lỗi",
            description: "Mật khẩu xác nhận không khớp",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          toast({
            title: "Lỗi",
            description: "Mật khẩu phải có ít nhất 6 ký tự",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        console.log('Attempting to sign up with:', {
          email: formData.email,
          fullName: formData.fullName,
          role: formData.role
        });

        const { error } = await signUp(formData.email, formData.password, formData.fullName, formData.role);
        if (error) {
          console.error('Sign up error:', error);
          toast({
            title: "Lỗi đăng ký",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Đăng ký thành công",
            description: "Tài khoản đã được tạo thành công! Bạn có thể đăng nhập ngay.",
          });
          // Switch to login mode after successful registration
          setMode('login');
          setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
        }
      } else {
        // Login
        console.log('Attempting to sign in with:', formData.email);
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          console.error('Sign in error:', error);
          toast({
            title: "Lỗi đăng nhập",
            description: "Email hoặc mật khẩu không đúng. Vui lòng thử lại.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Đăng nhập thành công",
            description: "Chào mừng bạn quay trở lại!",
          });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Có lỗi xảy ra",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGoHome}
            className="absolute left-0 top-0 flex items-center gap-2 text-sm"
          >
            <Home className="w-4 h-4" />
            Về trang chủ
          </Button>
          <CardTitle className="text-2xl font-bold text-gray-800 mt-8">
            {mode === 'login' ? 'Đăng nhập' : 'Đăng ký tài khoản'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên *</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Vai trò</Label>
                  <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Khách hàng</SelectItem>
                      <SelectItem value="student">Học sinh</SelectItem>
                      <SelectItem value="teacher">Giáo viên</SelectItem>
                      <SelectItem value="admin">Quản trị viên</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-stem-primary hover:bg-stem-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (mode === 'login' ? 'Đang đăng nhập...' : 'Đang đăng ký...') : (mode === 'login' ? 'Đăng nhập' : 'Đăng ký')}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">
                {mode === 'login' ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
              </span>
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-stem-primary hover:underline"
              >
                {mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
