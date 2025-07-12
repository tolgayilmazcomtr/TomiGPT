export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          subscription_plan: 'starter' | 'pro' | 'gold'
          subscription_status: 'active' | 'inactive' | 'canceled'
          stripe_customer_id: string | null
          daily_analysis_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_plan?: 'starter' | 'pro' | 'gold'
          subscription_status?: 'active' | 'inactive' | 'canceled'
          stripe_customer_id?: string | null
          daily_analysis_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_plan?: 'starter' | 'pro' | 'gold'
          subscription_status?: 'active' | 'inactive' | 'canceled'
          stripe_customer_id?: string | null
          daily_analysis_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      analysis_history: {
        Row: {
          id: string
          user_id: string
          symbol: string
          timeframe: '4h' | '1d'
          signal: 'AL' | 'SAT' | 'BEKLE'
          score: number
          indicators: Json
          price: number
          explanation: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          symbol: string
          timeframe: '4h' | '1d'
          signal: 'AL' | 'SAT' | 'BEKLE'
          score: number
          indicators: Json
          price: number
          explanation: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          symbol?: string
          timeframe?: '4h' | '1d'
          signal?: 'AL' | 'SAT' | 'BEKLE'
          score?: number
          indicators?: Json
          price?: number
          explanation?: string
          created_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          language: 'tr' | 'en'
          theme: 'dark' | 'light'
          notifications_enabled: boolean
          email_notifications: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          language?: 'tr' | 'en'
          theme?: 'dark' | 'light'
          notifications_enabled?: boolean
          email_notifications?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          language?: 'tr' | 'en'
          theme?: 'dark' | 'light'
          notifications_enabled?: boolean
          email_notifications?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_plan: 'starter' | 'pro' | 'gold'
      subscription_status: 'active' | 'inactive' | 'canceled'
      signal_type: 'AL' | 'SAT' | 'BEKLE'
      timeframe: '4h' | '1d'
      language: 'tr' | 'en'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 