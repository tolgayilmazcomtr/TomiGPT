import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import { User, AuthChangeEvent, Session } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiSettings, FiLogOut, FiHome, FiBarChart, FiClock, FiCreditCard, FiGlobe } from 'react-icons/fi';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [language, setLanguage] = useState('tr'); // 'tr' or 'en'
  const router = useRouter();

  useEffect(() => {
    getUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const getUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  const getUserInitials = (user: User | null) => {
    if (!user) return 'U';
    
    const name = user.user_metadata?.full_name || user.email || '';
    const parts = name.split(' ');
    
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    
    return name.slice(0, 2).toUpperCase();
  };

  const navigation = [
    { name: language === 'tr' ? 'Analiz' : 'Analysis', href: '/', icon: FiBarChart },
    { name: language === 'tr' ? 'Geçmiş' : 'History', href: '/history', icon: FiClock },
    { name: language === 'tr' ? 'Abonelik' : 'Subscription', href: '/subscription', icon: FiCreditCard },
  ];

  const profileMenuItems = [
    { name: language === 'tr' ? 'Profil' : 'Profile', href: '/profile', icon: FiUser },
    { name: language === 'tr' ? 'Ayarlar' : 'Settings', href: '/settings', icon: FiSettings },
  ];

  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setShowLanguageMenu(false);
    // Store in localStorage
    localStorage.setItem('language', langCode);
  };

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['tr', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-float-reverse"></div>
      </div>

      {/* Navigation */}
      <nav className="glass-card border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                TomiGPT
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    router.pathname === item.href
                      ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Profile/Auth Section */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  <span className="text-xl">
                    {languages.find(lang => lang.code === language)?.flag}
                  </span>
                  <span className="hidden sm:block text-gray-300 text-sm">
                    {languages.find(lang => lang.code === language)?.name}
                  </span>
                </button>

                <AnimatePresence>
                  {showLanguageMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-40 glass-card border border-white/10 rounded-lg shadow-xl"
                    >
                      <div className="py-2">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`flex items-center space-x-3 px-4 py-2 w-full text-left transition-all duration-200 ${
                              language === lang.code
                                ? 'bg-green-500/20 text-green-400'
                                : 'text-gray-300 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <span className="text-lg">{lang.flag}</span>
                            <span className="text-sm">{lang.name}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {loading ? (
                <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse"></div>
              ) : user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center text-white font-semibold text-sm">
                      {getUserInitials(user)}
                    </div>
                    <span className="hidden sm:block text-gray-300 text-sm">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 glass-card border border-white/10 rounded-lg shadow-xl"
                      >
                        <div className="py-2">
                          {profileMenuItems.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                              onClick={() => setShowProfileMenu(false)}
                            >
                              <item.icon className="w-4 h-4" />
                              <span>{item.name}</span>
                            </Link>
                          ))}
                          <hr className="my-2 border-white/10" />
                          <button
                            onClick={signOut}
                            className="flex items-center space-x-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 w-full text-left"
                          >
                            <FiLogOut className="w-4 h-4" />
                            <span>{language === 'tr' ? 'Çıkış Yap' : 'Sign Out'}</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 text-gray-300 hover:text-white transition-all duration-200"
                  >
                    {language === 'tr' ? 'Giriş' : 'Login'}
                  </Link>
                  <Link
                    href="/auth/register"
                    className="glass-button px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/20 transition-all duration-200"
                  >
                    {language === 'tr' ? 'Kayıt Ol' : 'Sign Up'}
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                {showMobileMenu ? (
                  <FiX className="w-6 h-6 text-gray-300" />
                ) : (
                  <FiMenu className="w-6 h-6 text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-sm"
            >
              <div className="px-4 py-2 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                      router.pathname === item.href
                        ? 'bg-green-500/20 text-green-400'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="relative">{children}</main>
    </div>
  );
} 