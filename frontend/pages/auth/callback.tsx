import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { FiLoader, FiCheckCircle, FiXCircle } from 'react-icons/fi';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          router.push('/auth/login?error=auth_failed');
          return;
        }

        if (data.session) {
          // Successful authentication
          router.push('/');
        } else {
          // No session found
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Unexpected error during auth callback:', error);
        router.push('/auth/login?error=unexpected');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-4"
        >
          <FiLoader className="w-full h-full text-blue-400" />
        </motion.div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Giriş işlemi tamamlanıyor...
        </h2>
        <p className="text-gray-400">
          Lütfen bekleyin, hesabınıza yönlendiriliyorsunuz.
        </p>
      </div>
    </div>
  );
} 