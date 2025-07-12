import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYzMjc0MjgsImV4cCI6MTk2MTkwMzQyOH0.rJ8Sm4TIuKHxqQKYgNLmQhgfWWCO3LF2bLSKtKQOjuM'

// Development mode check
const isDevMode = process.env.NEXT_PUBLIC_DEV_MODE === 'true'
const hasValidCredentials = !supabaseUrl.includes('placeholder') && 
                           !supabaseUrl.includes('your_supabase_url_here') && 
                           !supabaseKey.includes('placeholder') && 
                           !supabaseKey.includes('your_supabase_anon_key_here')

// Debug: Supabase geliştirme modunda çalışıyor
if (isDevMode && !hasValidCredentials) {
  console.log('🔶 TomiGPT geliştirme modunda çalışıyor - demo veriler kullanılacak')
}

// Demo user data for development
const demoUser = {
  id: 'demo-user-id',
  email: 'demo@tomigpt.com',
  user_metadata: {
    full_name: 'Demo Kullanıcı',
    avatar_url: null,
  },
  app_metadata: {},
  aud: 'authenticated',
  role: 'authenticated',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

// Demo session data
const demoSession = {
  access_token: 'demo-access-token',
  refresh_token: 'demo-refresh-token',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: 'bearer',
  user: demoUser,
}

// State management for demo mode
let mockUserState: any = null
let mockSessionState: any = null

// Mock client for development mode
const mockClient = {
  auth: {
    signUp: () => Promise.resolve({ data: { user: demoUser, session: demoSession }, error: null }),
    signInWithPassword: (credentials: { email: string; password: string }) => {
      // Demo hesap kontrolü
      if (credentials.email === 'demo@tomigpt.com' && credentials.password === 'demo123') {
        mockUserState = demoUser
        mockSessionState = demoSession
        // Store in localStorage for persistence
        if (typeof window !== 'undefined') {
          localStorage.setItem('tomigpt-demo-user', JSON.stringify(demoUser))
          localStorage.setItem('tomigpt-demo-session', JSON.stringify(demoSession))
        }
        return Promise.resolve({ data: { user: demoUser, session: demoSession }, error: null })
      }
      return Promise.resolve({ data: { user: null, session: null }, error: { message: 'Geçersiz email veya şifre' } })
    },
    signInWithOAuth: () => Promise.resolve({ data: null, error: null }),
    signOut: () => {
      mockUserState = null
      mockSessionState = null
      if (typeof window !== 'undefined') {
        localStorage.removeItem('tomigpt-demo-user')
        localStorage.removeItem('tomigpt-demo-session')
      }
      return Promise.resolve({ error: null })
    },
    getUser: () => {
      // Check localStorage for persisted demo user
      if (typeof window !== 'undefined' && !mockUserState) {
        const storedUser = localStorage.getItem('tomigpt-demo-user')
        if (storedUser) {
          mockUserState = JSON.parse(storedUser)
        }
      }
      return Promise.resolve({ data: { user: mockUserState }, error: null })
    },
    getSession: () => {
      // Check localStorage for persisted demo session
      if (typeof window !== 'undefined' && !mockSessionState) {
        const storedSession = localStorage.getItem('tomigpt-demo-session')
        if (storedSession) {
          mockSessionState = JSON.parse(storedSession)
        }
      }
      return Promise.resolve({ data: { session: mockSessionState }, error: null })
    },
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      // Trigger initial callback with current state
      setTimeout(() => {
        if (mockSessionState) {
          callback('SIGNED_IN', mockSessionState)
        } else {
          callback('SIGNED_OUT', null)
        }
      }, 100)
      
      return { data: { subscription: { unsubscribe: () => {} } } }
    },
  },
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null }),
  }),
} as any

let supabaseClient: any = null

export const createSupabaseClient = () => {
  // Return existing client if already created
  if (supabaseClient) {
    return supabaseClient
  }
  
  // In development mode with placeholder credentials, return mock client
  if (isDevMode && !hasValidCredentials) {
    console.warn('🔶 Supabase çalışıyor geliştirme modunda - gerçek veriler kullanılmıyor')
    supabaseClient = mockClient
    return supabaseClient
  }
  
  // Create real Supabase client
  supabaseClient = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  })
  
  return supabaseClient
}

// Lazy getter for supabase client
export const getSupabaseClient = () => createSupabaseClient() 

// Default export for direct usage
export const supabase = createSupabaseClient()

// Demo account credentials for easy access
export const DEMO_CREDENTIALS = {
  email: 'demo@tomigpt.com',
  password: 'demo123'
} 