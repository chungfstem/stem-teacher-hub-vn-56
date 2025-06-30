
-- Tạo bảng profiles để lưu thông tin người dùng
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  school TEXT,
  grade_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Tạo bảng categories cho phân loại tài nguyên
CREATE TABLE public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Tạo bảng resources để lưu tài nguyên STEM
CREATE TABLE public.resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('document', 'video', 'lesson', 'project', 'news')),
  category_id UUID REFERENCES public.categories(id),
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  file_url TEXT,
  thumbnail_url TEXT,
  is_published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Tạo bảng comments cho bình luận
CREATE TABLE public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Tạo bảng likes cho chức năng thích
CREATE TABLE public.likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(resource_id, user_id)
);

-- Tạo bảng favorites cho tài nguyên yêu thích
CREATE TABLE public.favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(resource_id, user_id)
);

-- Bật Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies cho profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies cho categories
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);

-- RLS Policies cho resources
CREATE POLICY "Published resources are viewable by everyone" ON public.resources FOR SELECT 
  USING (is_published = true OR auth.uid() = author_id);
CREATE POLICY "Users can insert their own resources" ON public.resources FOR INSERT 
  WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own resources" ON public.resources FOR UPDATE 
  USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own resources" ON public.resources FOR DELETE 
  USING (auth.uid() = author_id);

-- RLS Policies cho comments
CREATE POLICY "Comments are viewable by everyone" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert comments" ON public.comments FOR INSERT 
  WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own comments" ON public.comments FOR UPDATE 
  USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own comments" ON public.comments FOR DELETE 
  USING (auth.uid() = author_id);

-- RLS Policies cho likes
CREATE POLICY "Likes are viewable by everyone" ON public.likes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage their likes" ON public.likes FOR ALL 
  USING (auth.uid() = user_id);

-- RLS Policies cho favorites
CREATE POLICY "Users can view their own favorites" ON public.favorites FOR SELECT 
  USING (auth.uid() = user_id);
CREATE POLICY "Authenticated users can manage their favorites" ON public.favorites FOR ALL 
  USING (auth.uid() = user_id);

-- Function để tự động tạo profile khi user đăng ký
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger để tự động tạo profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function để cập nhật view count
CREATE OR REPLACE FUNCTION public.increment_view_count(resource_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.resources 
  SET view_count = view_count + 1 
  WHERE id = resource_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function để cập nhật like count
CREATE OR REPLACE FUNCTION public.update_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.resources 
    SET like_count = like_count + 1 
    WHERE id = NEW.resource_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.resources 
    SET like_count = like_count - 1 
    WHERE id = OLD.resource_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger để tự động cập nhật like count
CREATE TRIGGER update_resource_like_count
  AFTER INSERT OR DELETE ON public.likes
  FOR EACH ROW EXECUTE PROCEDURE public.update_like_count();

-- Insert dữ liệu mẫu cho categories
INSERT INTO public.categories (name, description, color) VALUES
('Toán học', 'Các tài liệu và bài giảng về Toán học', '#EF4444'),
('Khoa học', 'Vật lý, Hóa học, Sinh học', '#10B981'),
('Công nghệ', 'Lập trình, AI, Robotics', '#3B82F6'),
('Kỹ thuật', 'Cơ khí, Điện tử, Xây dựng', '#F59E0B'),
('Dự án STEM', 'Các dự án thực hành STEM', '#8B5CF6'),
('Tin tức', 'Tin tức và sự kiện STEM', '#06B6D4');
