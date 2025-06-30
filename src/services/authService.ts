
import { supabase } from '@/integrations/supabase/client';

export const authService = {
  async signUp(email: string, password: string, fullName?: string) {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: fullName,
        }
      }
    });
  },

  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  async signOut() {
    return supabase.auth.signOut();
  },

  async getCurrentUser() {
    return supabase.auth.getUser();
  },

  async getSession() {
    return supabase.auth.getSession();
  },

  async updateProfile(updates: any) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    return supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
  }
};
