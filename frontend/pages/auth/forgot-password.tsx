import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiArrowRight, FiArrowLeft, FiCheck, FiShield } from 'react-icons/fi';
import { authHelpers } from '../../lib/supabase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await authHelpers.resetPassword(email);

      if (error) {
        const errorMessage = typeof error === 'string' ? error : (error as any)?.message || 'E-posta gönderme hatası';
        toast.error(errorMessage);
        return;
      }

      setIsEmailSent(true);
      toast.success('Şifre sıfırlama e-postası gönderildi!');
    } catch (error: any) {
      toast.error(error?.message || 'E-posta gönderilirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ultra Premium Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-slate-900"></div>
      
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
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
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/50 to-emerald-500/50 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
              {!isEmailSent ? (
                <>
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                  >
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-emerald-500/20 rounded-full border border-orange-500/30 mb-6">
                      <FiShield className="w-5 h-5 text-orange-400" />
                      <span className="text-orange-300 font-medium">Şifre Sıfırlama</span>
                    </div>
                    
                    <h1 className="text-4xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-orange-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                        Şifremi Unuttum
                      </span>
                    </h1>
                    
                    <p className="text-gray-400 text-lg">
                      E-posta adresinizi girin, şifre sıfırlama linkini gönderelim
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
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3">
                        E-posta Adresi
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                          placeholder="kayitli@email.com"
                          required
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={!email || isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group/btn relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-emerald-500 to-blue-500 p-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="relative bg-slate-900 rounded-2xl px-6 py-4 transition-all duration-300 group-hover/btn:bg-transparent">
                        <div className="flex items-center justify-center gap-3">
                          {isLoading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-white font-bold">Gönderiliyor...</span>
                            </>
                          ) : (
                            <>
                              <span className="text-white font-bold">Sıfırlama Linki Gönder</span>
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
                      <FiMail className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-white font-medium mb-2">Nasıl çalışır?</h3>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Kayıtlı e-posta adresinizi girin</li>
                          <li>• Size güvenli bir sıfırlama linki göndereceğiz</li>
                          <li>• Linke tıklayarak yeni şifrenizi belirleyin</li>
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
                        E-posta Gönderildi!
                      </span>
                    </h1>
                    
                    <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-600/30 mb-8">
                      <p className="text-gray-300 mb-4">
                        <span className="font-medium text-emerald-400">{email}</span> adresine şifre sıfırlama linki gönderdik.
                      </p>
                      <p className="text-sm text-gray-400">
                        E-postanızı kontrol edin ve linke tıklayarak şifrenizi sıfırlayın. Link 24 saat geçerlidir.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={() => setIsEmailSent(false)}
                        className="w-full px-6 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
                      >
                        Farklı e-posta adresi dene
                      </button>
                      
                      <Link
                        href="/auth/login"
                        className="group/btn relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 p-[2px] hover:scale-105 transition-transform block"
                      >
                        <div className="relative bg-slate-900 rounded-2xl px-6 py-3 transition-all duration-300 group-hover/btn:bg-transparent text-center">
                          <span className="text-white font-bold">Giriş Sayfasına Dön</span>
                        </div>
                      </Link>
                    </div>
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