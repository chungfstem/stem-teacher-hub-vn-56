
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useLikes = (resourceId: string) => {
  return useQuery({
    queryKey: ['likes', resourceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('resource_id', resourceId);

      if (error) throw error;
      return data;
    },
  });
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ resourceId, isLiked }: { resourceId: string; isLiked: boolean }) => {
      const userId = (await supabase.auth.getUser()).data.user?.id;
      
      if (!userId) throw new Error('User not authenticated');

      if (isLiked) {
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('resource_id', resourceId)
          .eq('user_id', userId);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('likes')
          .insert([{ resource_id: resourceId, user_id: userId }]);
        
        if (error) throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['likes', variables.resourceId] });
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
  });
};
