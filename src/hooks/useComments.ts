
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Comment {
  id: string;
  resource_id: string;
  author_id: string;
  content: string;
  parent_id?: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name: string;
    avatar_url?: string;
  };
}

export const useComments = (resourceId: string) => {
  return useQuery({
    queryKey: ['comments', resourceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles:author_id (full_name, avatar_url)
        `)
        .eq('resource_id', resourceId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as Comment[];
    },
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ resourceId, content, parentId }: { 
      resourceId: string; 
      content: string; 
      parentId?: string;
    }) => {
      const { data, error } = await supabase
        .from('comments')
        .insert([{
          resource_id: resourceId,
          content,
          parent_id: parentId,
          author_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.resourceId] });
    },
  });
};
