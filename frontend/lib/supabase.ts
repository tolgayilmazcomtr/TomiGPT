import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Gerçek Supabase credentials
const supabaseUrl = 'https://xtkpecdcztkvujennols.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0a3BlY2RjenRrdnVqZW5ub2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMzA1MjYsImV4cCI6MjA2NzkwNjUyNn0.9qk3ynKPb5vUQIkreWWXLVpQ9MD7mjVFI6E9hUB6pa4'

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// Auth helper functions
export const authHelpers = {
  // Sign up with email
  signUp: async (email: string, password: string, metadata?: { fullName?: string }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: metadata?.fullName || '',
          },
        },
      })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Sign out
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      return { error }
    }
  },

  // Reset password
  resetPassword: async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Update password
  updatePassword: async (password: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password,
      })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      return { user, error }
    } catch (error) {
      return { user: null, error }
    }
  },

  // Get current session
  getCurrentSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      return { session, error }
    } catch (error) {
      return { session: null, error }
    }
  },
}

// Database helper functions
export const dbHelpers = {
  // Get user profile
  getUserProfile: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Update user profile
  updateUserProfile: async (userId: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', userId)
        .select()
        .single()
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Get analysis history
  getAnalysisHistory: async (userId: string, limit: number = 20) => {
    try {
      const { data, error } = await supabase
        .from('analysis_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Save analysis result
  saveAnalysis: async (analysisData: {
    user_id: string
    coin_symbol: string
    coin_name: string
    timeframe: string
    signal: string
    total_score: number
    confidence_level: string
    price_at_analysis: number
    indicators_data: any
    analysis_text?: string
  }) => {
    try {
      const { data, error } = await supabase
        .from('analysis_history')
        .insert([analysisData])
        .select()
        .single()
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Check and increment analysis count
  checkAnalysisLimit: async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('increment_analysis_count', {
        user_uuid: userId
      })
      return { canAnalyze: data, error }
    } catch (error) {
      return { canAnalyze: false, error }
    }
  },

  // Get daily usage
  getDailyUsage: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('daily_usage')
        .select('*')
        .eq('user_id', userId)
        .eq('usage_date', new Date().toISOString().split('T')[0])
        .single()
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },
}

// Default export for backward compatibility
export default supabase 