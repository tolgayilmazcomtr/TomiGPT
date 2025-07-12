import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiArrowLeft, FiShield, FiZap } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import { authHelpers } from '../../lib/supabase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { user } = await authHelpers.getCurrentUser();
      if (user) {
        router.push('/');
      }
    };
    
    checkUser();

    // Check for error query parameter
    const { error } = router.query;
    if (error === 'auth_failed') {
      toast.error('Giriş işlemi başarısız oldu. Lütfen tekrar deneyin.');
    } else if (error === 'unexpected') {
      toast.error('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
    }
  }, [router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await authHelpers.signIn(email, password);

      if (error) {
        const errorMessage = typeof error === 'string' ? error : 
          (error as any)?.message === 'Invalid login credentials' 
            ? 'Geçersiz e-posta veya şifre' 
            : (error as any)?.message || 'Giriş hatası';
        toast.error(errorMessage);
        return;
      }

      if (data?.user) {
        toast.success('Giriş başarılı!');
        router.push('/');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Giriş yapılırken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    
    try {
      const { error } = await authHelpers.signInWithGoogle();

      if (error) {
        const errorMessage = typeof error === 'string' ? error : (error as any)?.message || 'Google giriş hatası';
        toast.error(errorMessage);
      }
      // OAuth will redirect to callback page, no need to handle success here
    } catch (error: any) {
      toast.error(error?.message || 'Google ile giriş yapılırken bir hata oluştu.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ultra Premium Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-slate-900"></div>
      
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-4 py-3 bg-slate-800/50 backdrop-blur-xl border border-slate-600/50 rounded-xl text-gray-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
            >
              <FiArrowLeft className="w-4 h-4" />
              Ana Sayfaya Dön
            </Link>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 to-emerald-500/50 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full border border-blue-500/30 mb-6">
                  <FiShield className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-300 font-medium">Güvenli Giriş</span>
                </div>
                
                <h1 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    TomiGPT'ye Giriş
                  </span>
                </h1>
                
                <p className="text-gray-400 text-lg">
                  Hesabınıza giriş yaparak analiz yapmaya başlayın
                </p>
              </div>

              {/* Google Login */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8"
              >
                <button
                  onClick={handleGoogleLogin}
                  disabled={isGoogleLoading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGoogleLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <FaGoogle className="w-5 h-5" />
                  )}
                  <span className="font-medium">Google ile Giriş Yap</span>
                </button>
              </motion.div>

              {/* Divider */}
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-600/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-900 text-gray-400">veya e-posta ile</span>
                </div>
              </div>

              {/* Email Login Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onSubmit={handleEmailLogin}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3">
                    E-posta
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-3">
                    Şifre
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Şifremi unuttum
                  </Link>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group/btn relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 p-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="relative bg-slate-900 rounded-2xl px-6 py-4 transition-all duration-300 group-hover/btn:bg-transparent">
                    <div className="flex items-center justify-center gap-3">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-white font-bold">Giriş yapılıyor...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-white font-bold">Giriş Yap</span>
                          <FiArrowRight className="w-5 h-5 text-white group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      )}
                    </div>
                  </div>
                </motion.button>
              </motion.form>

              {/* Register Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 text-center"
              >
                <p className="text-gray-400">
                  Hesabınız yok mu?{' '}
                  <Link
                    href="/auth/register"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Kayıt Ol
                  </Link>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 