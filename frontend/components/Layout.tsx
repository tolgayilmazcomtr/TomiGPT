import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiTrendingUp, 
  FiClock, 
  FiCreditCard, 
  FiUser, 
  FiSettings, 
  FiLogOut, 
  FiGlobe,
  FiChevronDown,
  FiShield,
  FiLogIn,
  FiUserPlus
} from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authHelpers, supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<string>('tr');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Language change function
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('languageChange', {
      detail: { language: newLanguage }
    }));
  };

  // Auth state management
  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { session } = await authHelpers.getCurrentSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        setLoading(false);

        if (event === 'SIGNED_IN') {
          toast.success('Başarıyla giriş yapıldı!');
        } else if (event === 'SIGNED_OUT') {
          toast.success('Başarıyla çıkış yapıldı!');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'tr';
    setLanguage(savedLanguage);
  }, []);

  const handleSignOut = async () => {
    try {
      await authHelpers.signOut();
      setIsProfileMenuOpen(false);
      router.push('/');
    } catch (error: any) {
      toast.error(error?.message || 'Çıkış yapılırken bir hata oluştu.');
    }
  };

  // Translation function
  const t = (tr: string, en: string) => language === 'tr' ? tr : en;

  // Navigation items
  const navigation = [
    { name: t('Anasayfa', 'Home'), href: '/', icon: FiHome },
    { name: t('Analiz', 'Analyze'), href: '/analyze', icon: FiTrendingUp },
    { name: t('Geçmiş', 'History'), href: '/history', icon: FiClock },
    { name: t('Abonelik', 'Subscription'), href: '/subscription', icon: FiCreditCard },
    { name: t('Ayarlar', 'Settings'), href: '/settings', icon: FiSettings },
  ];

  const profileMenuItems = user ? [
    { name: t('Profil', 'Profile'), href: '/profile', icon: FiUser },
    { name: t('Ayarlar', 'Settings'), href: '/settings', icon: FiSettings },
    { name: t('Çıkış Yap', 'Sign Out'), onClick: handleSignOut, icon: FiLogOut, isButton: true },
  ] : [
    { name: t('Giriş Yap', 'Sign In'), href: '/auth/login', icon: FiLogIn },
    { name: t('Kayıt Ol', 'Register'), href: '/auth/register', icon: FiUserPlus },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">{t('Yükleniyor...', 'Loading...')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl group-hover:scale-110 transition-transform">
                <FiTrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TomiGPT</span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    router.pathname === item.href
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="flex items-center bg-slate-800/50 border border-white/10 rounded-lg p-1">
                <button
                  onClick={() => handleLanguageChange('tr')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                    language === 'tr'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  🇹🇷
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                    language === 'en'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  🇺🇸
                </button>
              </div>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                >
                  {user ? (
                    <>
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {user.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium">{user.email}</span>
                    </>
                  ) : (
                    <>
                      <FiUser className="w-4 h-4" />
                      <span className="text-sm font-medium">{t('Hesap', 'Account')}</span>
                    </>
                  )}
                  <FiChevronDown className="w-4 h-4" />
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl z-[9999]"
                    >
                      <div className="p-2">
                        {user && (
                          <div className="px-3 py-2 border-b border-white/10 mb-2">
                            <p className="text-sm font-medium text-white">{user.email}</p>
                            <p className="text-xs text-gray-400">{t('Pro Üye', 'Pro Member')}</p>
                          </div>
                        )}
                        {profileMenuItems.map((item, index) => (
                          item.isButton ? (
                            <button
                              key={index}
                              onClick={item.onClick}
                              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                            >
                              <item.icon className="w-4 h-4" />
                              {item.name}
                            </button>
                          ) : (
                            <Link
                              key={index}
                              href={item.href || '#'}
                              onClick={() => setIsProfileMenuOpen(false)}
                              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                            >
                              <item.icon className="w-4 h-4" />
                              {item.name}
                            </Link>
                          )
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <FiTrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">TomiGPT</span>
            </Link>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <div className="flex items-center bg-slate-800/50 border border-white/10 rounded-lg p-1">
                <button
                  onClick={() => handleLanguageChange('tr')}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
                    language === 'tr'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  🇹🇷
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
                    language === 'en'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  🇺🇸
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 bg-slate-800/50 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-900/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                      router.pathname === item.href
                        ? 'text-blue-400 bg-blue-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                ))}
                
                <div className="border-t border-white/10 pt-2 mt-4">
                  {profileMenuItems.map((item, index) => (
                    item.isButton ? (
                      <button
                        key={index}
                        onClick={() => {
                          item.onClick?.();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                      >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        key={index}
                        href={item.href || '#'}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                      >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </Link>
                    )
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Click outside to close menus */}
      {(isMobileMenuOpen || isProfileMenuOpen) && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsProfileMenuOpen(false);
          }}
        />
      )}
    </div>
  );
} 