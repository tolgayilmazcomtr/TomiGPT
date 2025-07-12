import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import { User, AuthChangeEvent, Session } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiSettings, FiLogOut, FiHome, FiBarChart, FiClock, FiCreditCard, FiCheck, FiGlobe } from 'react-icons/fi';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const router = useRouter();

  useEffect(() => {
    getUser();
    
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('language') as 'tr' | 'en';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
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
    router.push('/auth/logout');
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

  const changeLanguage = (lang: 'tr' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    setShowLanguageMenu(false);
    // Trigger window event to notify all components
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
  };

  const t = (tr: string, en: string) => language === 'tr' ? tr : en;

  const navigation = [
    { name: t('Dashboard', 'Dashboard'), href: '/', icon: FiHome },
    { name: t('Analiz', 'Analysis'), href: '/analyze', icon: FiBarChart },
    { name: t('Geçmiş', 'History'), href: '/history', icon: FiClock },
    { name: t('Abonelik', 'Subscription'), href: '/subscription', icon: FiCreditCard },
  ];

  const profileMenuItems = [
    { name: t('Profil', 'Profile'), href: '/profile', icon: FiUser },
    { name: t('Ayarlar', 'Settings'), href: '/settings', icon: FiSettings },
  ];

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
                <motion.button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-3 py-2 glass-card rounded-lg hover:bg-white/10 transition-all duration-200 border border-white/10"
                >
                  <FiGlobe className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-sm font-medium">
                    {language.toUpperCase()}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {showLanguageMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-32 glass-card border border-green-500/20 rounded-lg shadow-xl backdrop-blur-xl"
                    >
                      <div className="py-2">
                        <button
                          onClick={() => changeLanguage('tr')}
                          className={`flex items-center space-x-2 px-4 py-2 text-sm w-full text-left transition-all duration-200 ${
                            language === 'tr'
                              ? 'bg-green-500/20 text-green-400'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <span>🇹🇷</span>
                          <span>Türkçe</span>
                          {language === 'tr' && <FiCheck className="w-4 h-4 ml-auto" />}
                        </button>
                        <button
                          onClick={() => changeLanguage('en')}
                          className={`flex items-center space-x-2 px-4 py-2 text-sm w-full text-left transition-all duration-200 ${
                            language === 'en'
                              ? 'bg-green-500/20 text-green-400'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <span>🇺🇸</span>
                          <span>English</span>
                          {language === 'en' && <FiCheck className="w-4 h-4 ml-auto" />}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {loading ? (
                <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse"></div>
              ) : user ? (
                <div className="relative">
                  <motion.button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-3 px-3 py-2 glass-card rounded-lg hover:bg-white/10 transition-all duration-200 border border-white/10"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {getUserInitials(user)}
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-gray-300 text-sm font-medium">
                        {user.user_metadata?.full_name || user.email?.split('@')[0]}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {user.email?.split('@')[0]}
                      </div>
                    </div>
                    <FiUser className="w-4 h-4 text-gray-400" />
                  </motion.button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 glass-card border border-green-500/20 rounded-lg shadow-xl backdrop-blur-xl"
                      >
                        <div className="py-2">
                          {/* User Info Header */}
                          <div className="px-4 py-3 border-b border-white/10">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center text-white font-bold">
                                {getUserInitials(user)}
                              </div>
                              <div>
                                <div className="text-white font-medium">
                                  {user.user_metadata?.full_name || t('Kullanıcı', 'User')}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className="py-2">
                            {profileMenuItems.map((item) => (
                              <motion.div key={item.name} whileHover={{ x: 4 }}>
                                <Link
                                  href={item.href}
                                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                                  onClick={() => setShowProfileMenu(false)}
                                >
                                  <item.icon className="w-5 h-5" />
                                  <span className="font-medium">{item.name}</span>
                                </Link>
                              </motion.div>
                            ))}
                          </div>

                          {/* Logout */}
                          <div className="border-t border-white/10 py-2">
                            <motion.button
                              onClick={signOut}
                              whileHover={{ x: 4 }}
                              className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 w-full text-left"
                            >
                              <FiLogOut className="w-5 h-5" />
                              <span className="font-medium">{t('Çıkış Yap', 'Logout')}</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/auth/login"
                      className="px-4 py-2 text-gray-300 hover:text-white transition-all duration-200 font-medium"
                    >
                      {t('Giriş', 'Login')}
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/auth/register"
                      className="glass-button px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/20 transition-all duration-200 font-medium"
                    >
                      {t('Kayıt Ol', 'Sign Up')}
                    </Link>
                  </motion.div>
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