import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiEdit2, FiSave } from 'react-icons/fi'
import { useState } from 'react'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    fullName: 'Demo Kullanıcı',
    email: 'demo@example.com',
    avatarUrl: '',
    subscriptionPlan: 'starter',
    dailyAnalysisCount: 2,
    createdAt: '2024-01-01'
  })

  const handleSave = () => {
    setIsEditing(false)
    // Demo - gerçek uygulamada API'ye gönderilecek
    alert('Profil bilgileri güncellendi!')
  }

  const handleChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'starter': return 'Starter (Ücretsiz)'
      case 'pro': return 'Pro ($39/ay)'
      case 'gold': return 'Gold ($59/ay)'
      default: return 'Bilinmiyor'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Profil
            </h1>
            <p className="text-xl text-gray-300">
              Hesap bilgilerinizi yönetin ve istatistiklerinizi görün
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profil Kartı */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-card p-6"
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUser className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  {profile.fullName}
                </h2>
                <p className="text-gray-300">{profile.email}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Plan:</span>
                  <span className="text-white font-semibold">
                    {getPlanName(profile.subscriptionPlan)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Üyelik:</span>
                  <span className="text-white">
                    {formatDate(profile.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Bugün:</span>
                  <span className="text-white">
                    {profile.dailyAnalysisCount}/5 analiz
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Profil Düzenleme */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 glass-card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Profil Bilgileri
                </h2>
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="glass-button px-4 py-2 text-white text-sm font-medium flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  {isEditing ? (
                    <>
                      <FiSave className="w-4 h-4" />
                      Kaydet
                    </>
                  ) : (
                    <>
                      <FiEdit2 className="w-4 h-4" />
                      Düzenle
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ad Soyad
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                      {profile.fullName}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    E-posta
                  </label>
                  <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                    {profile.email}
                    <span className="text-xs text-gray-500 ml-2">
                      (değiştirilemez)
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mevcut Plan
                  </label>
                  <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                    {getPlanName(profile.subscriptionPlan)}
                  </div>
                </div>

                {!isEditing && (
                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Hesap İşlemleri
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full glass-button px-4 py-3 text-white font-medium rounded-lg hover:scale-105 transition-transform">
                        Şifre Değiştir
                      </button>
                      <button className="w-full bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-400 font-medium rounded-lg hover:bg-red-500/20 transition-colors">
                        Hesabı Sil
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 