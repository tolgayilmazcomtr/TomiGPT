import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheck, FiShield } from 'react-icons/fi';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if there's a valid session (user clicked on reset link)
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (session) {
        setIsValidToken(true);
      } else {
        toast.error('Geçersiz veya süresi dolmuş link. Lütfen tekrar deneyin.');
        router.push('/auth/forgot-password');
      }
    };

    checkSession();
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
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setIsPasswordReset(true);
      toast.success('Şifreniz başarıyla sıfırlandı!');
    } catch (error) {
      toast.error('Şifre sıfırlanırken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Ultra Premium Background */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-slate-900"></div>
        
        {/* Floating Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-float-reverse"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/50 to-orange-500/50 rounded-3xl blur opacity-25"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 max-w-md text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiShield className="w-8 h-8 text-red-400" />
              </div>
              
              <h1 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Link Geçersiz
                </span>
              </h1>
              
              <p className="text-gray-400 mb-8">
                Şifre sıfırlama linki geçersiz veya süresi dolmuş. Lütfen yeni bir link talep edin.
              </p>
              
              <Link
                href="/auth/forgot-password"
                className="group/btn relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 p-[2px] hover:scale-105 transition-transform inline-block"
              >
                <div className="relative bg-slate-900 rounded-2xl px-6 py-3 transition-all duration-300 group-hover/btn:bg-transparent">
                  <span className="text-white font-bold">Yeni Link Talep Et</span>
                </div>
              </Link>
            </div>
          </motion.div>
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 to-blue-500/50 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
              {!isPasswordReset ? (
                <>
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                  >
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full border border-emerald-500/30 mb-6">
                      <FiLock className="w-5 h-5 text-emerald-400" />
                      <span className="text-emerald-300 font-medium">Şifre Yenileme</span>
                    </div>
                    
                    <h1 className="text-4xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Yeni Şifre
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
                          required
                          className="w-full pl-12 pr-12 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                          placeholder="En az 6 karakter"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showPassword ? (
                            <FiEyeOff className="w-5 h-5" />
                          ) : (
                            <FiEye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-3">
                        Şifre Tekrar
                      </label>
                      <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="w-full pl-12 pr-12 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                          placeholder="Şifrenizi tekrar girin"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showConfirmPassword ? (
                            <FiEyeOff className="w-5 h-5" />
                          ) : (
                            <FiEye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Password Strength Indicator */}
                    <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-600/30">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Şifre Gereksinimleri:</h4>
                      <div className="space-y-2 text-sm">
                        <div className={`flex items-center gap-2 ${password.length >= 6 ? 'text-emerald-400' : 'text-gray-400'}`}>
                          <div className={`w-2 h-2 rounded-full ${password.length >= 6 ? 'bg-emerald-400' : 'bg-gray-600'}`}></div>
                          En az 6 karakter
                        </div>
                        <div className={`flex items-center gap-2 ${password === confirmPassword && password ? 'text-emerald-400' : 'text-gray-400'}`}>
                          <div className={`w-2 h-2 rounded-full ${password === confirmPassword && password ? 'bg-emerald-400' : 'bg-gray-600'}`}></div>
                          Şifreler eşleşmeli
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!password || !confirmPassword || password !== confirmPassword || password.length < 6 || isLoading}
                      className="group/btn relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-blue-500 to-cyan-500 p-[2px] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                    >
                      <div className="relative bg-slate-900 rounded-2xl px-6 py-4 transition-all duration-300 group-hover/btn:bg-transparent">
                        <div className="flex items-center justify-center gap-3">
                          {isLoading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-white font-bold">Şifre güncelleniyor...</span>
                            </>
                          ) : (
                            <>
                              <span className="text-white font-bold">Şifreyi Güncelle</span>
                              <FiArrowRight className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform" />
                            </>
                          )}
                        </div>
                      </div>
                    </button>
                  </motion.form>
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
                      <div className="w-20 h-20 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
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
                      <p className="text-gray-300 mb-2">
                        Şifreniz başarıyla güncellendi.
                      </p>
                      <p className="text-sm text-gray-400">
                        Artık yeni şifrenizle güvenli bir şekilde giriş yapabilirsiniz.
                      </p>
                    </div>

                    <Link
                      href="/auth/login"
                      className="group/btn relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 p-[2px] hover:scale-105 transition-transform inline-block"
                    >
                      <div className="relative bg-slate-900 rounded-2xl px-8 py-4 transition-all duration-300 group-hover/btn:bg-transparent">
                        <div className="flex items-center gap-3">
                          <span className="text-white font-bold">Giriş Sayfasına Git</span>
                          <FiArrowRight className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform" />
                        </div>
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