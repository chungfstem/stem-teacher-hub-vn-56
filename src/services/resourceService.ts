
import { supabase } from '@/integrations/supabase/client';

export const resourceService = {
  async getResources(filters?: {
    type?: string;
    category?: string;
    search?: string;
    difficulty?: string;
    tags?: string[];
  }) {
    let query = supabase
      .from('resources')
      .select(`
        *,
        profiles:author_id (full_name, avatar_url),
        categories:category_id (name, color)
      `)
      .eq('is_published', true);

    if (filters?.type) {
      query = query.eq('resource_type', filters.type);
    }

    if (filters?.category) {
      query = query.eq('category_id', filters.category);
    }

    if (filters?.difficulty) {
      query = query.eq('difficulty_level', filters.difficulty);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    if (filters?.tags && filters.tags.length > 0) {
      query = query.overlaps('tags', filters.tags);
    }

    return query.order('created_at', { ascending: false });
  },

  async createResource(resource: any) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    return supabase
      .from('resources')
      .insert([{ ...resource, author_id: user.id }])
      .select()
      .single();
  },

  async updateResource(id: string, updates: any) {
    return supabase
      .from('resources')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  },

  async deleteResource(id: string) {
    return supabase
      .from('resources')
      .delete()
      .eq('id', id);
  },

  async incrementViewCount(id: string) {
    return supabase.rpc('increment_view_count', { resource_uuid: id });
  }
};
