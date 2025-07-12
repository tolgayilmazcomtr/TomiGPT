import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiEye, FiEyeOff, FiArrowRight, FiArrowLeft, FiCheck, FiShield } from 'react-icons/fi';
import { authHelpers } from '../../lib/supabase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if we have the necessary hash parameters
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      setIsValidToken(true);
    } else {
      // Redirect to forgot password if no valid token
      router.push('/auth/forgot-password');
    }
  }, [router]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Şifreler eşleşmiyor.');
      return;
    }

    if (password.length < 6) {
      toast.error('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authHelpers.updatePassword(password);

      if (error) {
        const errorMessage = typeof error === 'string' ? error : (error as any)?.message || 'Şifre güncelleme hatası';
        toast.error(errorMessage);
        return;
      }

      setIsSuccess(true);
      toast.success('Şifreniz başarıyla güncellendi!');
    } catch (error: any) {
      toast.error(error?.message || 'Şifre güncellenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Yönlendiriliyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ultra Premium Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-slate-900"></div>
      
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
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
              href="/auth/login"
              className="inline-flex items-center gap-3 px-4 py-3 bg-slate-800/50 backdrop-blur-xl border border-slate-600/50 rounded-xl text-gray-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
            >
              <FiArrowLeft className="w-4 h-4" />
              Giriş Sayfasına Dön
            </Link>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
              {!isSuccess ? (
                <>
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                  >
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30 mb-6">
                      <FiShield className="w-5 h-5 text-purple-400" />
                      <span className="text-purple-300 font-medium">Şifre Sıfırlama</span>
                    </div>
                    
                    <h1 className="text-4xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Yeni Şifre Belirle
                      </span>
                    </h1>
                    
                    <p className="text-gray-400 text-lg">
                      Hesabınız için güvenli bir şifre belirleyin
                    </p>
                  </motion.div>

                  {/* Reset Form */}
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    onSubmit={handleResetPassword}
                    className="space-y-6"
                  >
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-3">
                        Yeni Şifre
                      </label>
                      <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-12 pr-12 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
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
                          className="w-full pl-12 pr-12 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
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

                    <motion.button
                      type="submit"
                      disabled={!password || !confirmPassword || isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group/btn relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 p-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="relative bg-slate-900 rounded-2xl px-6 py-4 transition-all duration-300 group-hover/btn:bg-transparent">
                        <div className="flex items-center justify-center gap-3">
                          {isLoading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-white font-bold">Güncelleniyor...</span>
                            </>
                          ) : (
                            <>
                              <span className="text-white font-bold">Şifreyi Güncelle</span>
                              <FiArrowRight className="w-5 h-5 text-white group-hover/btn:translate-x-1 transition-transform" />
                            </>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  </motion.form>

                  {/* Help Text */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-8 p-4 bg-slate-800/30 rounded-xl border border-slate-600/30"
                  >
                    <div className="flex items-start gap-3">
                      <FiLock className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-white font-medium mb-2">Güvenli Şifre İpuçları</h3>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• En az 6 karakter uzunluğunda olmalı</li>
                          <li>• Büyük ve küçük harfler kullanın</li>
                          <li>• Sayılar ve özel karakterler ekleyin</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </>
              ) : (
                <>
                  {/* Success Message */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                  >
                    <div className="relative mb-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <FiCheck className="w-10 h-10 text-emerald-400" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-xl"></div>
                    </div>
                    
                    <h1 className="text-3xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                        Şifre Güncellendi!
                      </span>
                    </h1>
                    
                    <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-600/30 mb-8">
                      <p className="text-gray-300 mb-4">
                        Şifreniz başarıyla güncellendi. Artık yeni şifrenizle giriş yapabilirsiniz.
                      </p>
                      <p className="text-sm text-gray-400">
                        Güvenliğiniz için düzenli olarak şifrenizi değiştirmenizi öneririz.
                      </p>
                    </div>

                    <Link
                      href="/auth/login"
                      className="group/btn relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 p-[2px] hover:scale-105 transition-transform block"
                    >
                      <div className="relative bg-slate-900 rounded-2xl px-6 py-3 transition-all duration-300 group-hover/btn:bg-transparent text-center">
                        <span className="text-white font-bold">Giriş Yap</span>
                      </div>
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 