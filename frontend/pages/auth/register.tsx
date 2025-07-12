import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiArrowLeft, FiUser, FiShield, FiCheck } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import { authHelpers } from '../../lib/supabase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
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
  }, [router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Şifreler eşleşmiyor.');
      return;
    }

    if (!acceptTerms) {
      toast.error('Kullanım şartlarını kabul etmelisiniz.');
      return;
    }

    if (password.length < 6) {
      toast.error('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await authHelpers.signUp(email, password, { fullName });

      if (error) {
        const errorMessage = typeof error === 'string' ? error : (error as any)?.message || 'Kayıt hatası';
        toast.error(errorMessage);
        return;
      }

      if (data?.user) {
        toast.success('Kayıt başarılı! E-posta adresinizi kontrol edin.');
        router.push('/auth/login');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Kayıt olurken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsGoogleLoading(true);
    
    try {
      const { error } = await authHelpers.signInWithGoogle();

      if (error) {
        const errorMessage = typeof error === 'string' ? error : (error as any)?.message || 'Google kayıt hatası';
        toast.error(errorMessage);
      }
      // OAuth will redirect to callback page
    } catch (error: any) {
      toast.error(error?.message || 'Google ile kayıt olurken bir hata oluştu.');
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-reverse"></div>
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
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 to-blue-500/50 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full border border-emerald-500/30 mb-6">
                  <FiUser className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">Yeni Hesap</span>
                </div>
                
                <h1 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    TomiGPT'ye Katılın
                  </span>
                </h1>
                
                <p className="text-gray-400 text-lg">
                  Hesap oluşturun ve profesyonel analiz yapmaya başlayın
                </p>
              </div>

              {/* Google Register */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8"
              >
                <button
                  onClick={handleGoogleRegister}
                  disabled={isGoogleLoading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGoogleLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <FaGoogle className="w-5 h-5" />
                  )}
                  <span className="font-medium">Google ile Kayıt Ol</span>
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

              {/* Register Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onSubmit={handleRegister}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-3">
                    Ad Soyad
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                      placeholder="Adınız ve soyadınız"
                      required
                    />
                  </div>
                </div>

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
                      className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
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
                      className="w-full pl-12 pr-12 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                      placeholder="En az 6 karakter"
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

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-3">
                    Şifre Onayı
                  </label>
                  <div className="relative">
                    <FiShield className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                      placeholder="Şifrenizi tekrar girin"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => setAcceptTerms(!acceptTerms)}
                    className={`flex-shrink-0 mt-1 w-5 h-5 rounded border-2 transition-all duration-200 ${
                      acceptTerms 
                        ? 'bg-emerald-500 border-emerald-500' 
                        : 'border-slate-600 hover:border-emerald-500'
                    }`}
                  >
                    {acceptTerms && <FiCheck className="w-3 h-3 text-white" />}
                  </button>
                  <label className="text-sm text-gray-300 leading-relaxed">
                    <Link href="/terms" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                      Kullanım Şartları
                    </Link>
                    {' '}ve{' '}
                    <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                      Gizlilik Politikası
                    </Link>
                    'nı okudum ve kabul ediyorum.
                  </label>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading || !acceptTerms}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group/btn relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 p-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="relative bg-slate-900 rounded-2xl px-6 py-4 transition-all duration-300 group-hover/btn:bg-transparent">
                    <div className="flex items-center justify-center gap-3">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-white font-bold">Kayıt olunuyor...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-white font-bold">Kayıt Ol</span>
                          <FiArrowRight className="w-5 h-5 text-white group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      )}
                    </div>
                  </div>
                </motion.button>
              </motion.form>

              {/* Login Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 text-center"
              >
                <p className="text-gray-400">
                  Zaten hesabınız var mı?{' '}
                  <Link
                    href="/auth/login"
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                  >
                    Giriş Yap
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