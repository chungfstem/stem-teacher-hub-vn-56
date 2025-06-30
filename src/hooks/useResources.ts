
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Resource {
  id: string;
  title: string;
  description?: string;
  content?: string;
  resource_type: 'document' | 'video' | 'lesson' | 'project' | 'news';
  category_id?: string;
  author_id: string;
  file_url?: string;
  thumbnail_url?: string;
  is_published: boolean;
  view_count: number;
  like_count: number;
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name: string;
    avatar_url?: string;
  };
  categories?: {
    name: string;
    color: string;
  };
}

export const useResources = (type?: string, category?: string) => {
  return useQuery({
    queryKey: ['resources', type, category],
    queryFn: async () => {
      let query = supabase
        .from('resources')
        .select(`
          *,
          profiles:author_id (full_name, avatar_url),
          categories:category_id (name, color)
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (type) {
        query = query.eq('resource_type', type);
      }

      if (category) {
        query = query.eq('category_id', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Resource[];
    },
  });
};

export const useResource = (id: string) => {
  return useQuery({
    queryKey: ['resource', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select(`
          *,
          profiles:author_id (full_name, avatar_url),
          categories:category_id (name, color)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      
      // Increment view count
      await supabase.rpc('increment_view_count', { resource_uuid: id });
      
      return data as Resource;
    },
  });
};

export const useCreateResource = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (resource: Partial<Resource>) => {
      const { data, error } = await supabase
        .from('resources')
        .insert([resource])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
  });
};
