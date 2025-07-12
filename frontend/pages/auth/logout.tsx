import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiLogOut, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { supabase } from '../../lib/supabase';

export default function Logout() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Eğer kullanıcı zaten giriş yapmamışsa login sayfasına yönlendir
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/login');
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setIsLoggedOut(true);
      
      // 2 saniye sonra login sayfasına yönlendir
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoading(false);
    }
  };

  if (isLoggedOut) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-float-reverse"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-md w-full"
        >
          <div className="glass-card p-8 rounded-2xl border border-green-500/20 shadow-xl backdrop-blur-xl text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FiCheck className="w-8 h-8 text-green-400" />
            </motion.div>
            
            <h1 className="text-2xl font-bold text-white mb-4">
              Başarıyla Çıkış Yaptınız
            </h1>
            <p className="text-gray-400 mb-6">
              TomiGPT'yi kullandığınız için teşekkürler. Yakında giriş sayfasına yönlendirileceksiniz.
            </p>
            
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
              />
            </div>
            
            <Link
              href="/auth/login"
              className="text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              Şimdi Giriş Sayfasına Git
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-float-reverse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-md w-full"
      >
        <div className="glass-card p-8 rounded-2xl border border-red-500/20 shadow-xl backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FiLogOut className="w-8 h-8 text-red-400" />
            </motion.div>
            
            <h1 className="text-2xl font-bold text-white mb-2">
              Çıkış Yap
            </h1>
            <p className="text-gray-400">
              Hesabınızdan çıkış yapmak istediğinizden emin misiniz?
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <motion.button
              onClick={handleLogout}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full glass-button py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                isLoading
                  ? 'bg-red-500/20 text-red-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/20'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-red-300 border-t-transparent rounded-full animate-spin"></div>
                  <span>Çıkış Yapılıyor...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <FiLogOut className="w-5 h-5" />
                  <span>Evet, Çıkış Yap</span>
                </div>
              )}
            </motion.button>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/"
                className="w-full glass-button py-3 px-6 rounded-lg font-medium transition-all duration-200 bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white flex items-center justify-center space-x-2"
              >
                <FiArrowLeft className="w-5 h-5" />
                <span>İptal</span>
              </Link>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Çıkış yaptıktan sonra tekrar giriş yapabilirsiniz
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 