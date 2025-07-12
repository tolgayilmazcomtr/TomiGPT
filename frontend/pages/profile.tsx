import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiEdit2, FiSave, FiCalendar, FiBarChart, FiTrendingUp, FiAward, FiSettings, FiShield } from 'react-icons/fi'
import { useState } from 'react'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    fullName: 'Demo Kullanıcı',
    email: 'demo@tomigpt.com',
    avatarUrl: '',
    subscriptionPlan: 'pro',
    dailyAnalysisCount: 8,
    dailyAnalysisLimit: 20,
    createdAt: '2024-01-01',
    totalAnalyses: 156,
    successfulSignals: 127,
    totalProfit: 23.45,
    preferredTimeframe: '4h',
    notificationsEnabled: true
  })

  const handleSave = () => {
    setIsEditing(false)
    // Demo - gerçek uygulamada API'ye gönderilecek
    alert('Profil bilgileri güncellendi!')
  }

  const handleChange = (field: string, value: string | boolean) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getPlanInfo = (plan: string) => {
    switch (plan) {
      case 'starter': 
        return { 
          name: 'Starter', 
          color: 'from-slate-500 to-gray-500', 
          icon: FiUser,
          badge: 'Ücretsiz' 
        }
      case 'pro': 
        return { 
          name: 'Pro', 
          color: 'from-blue-500 to-cyan-500', 
          icon: FiAward,
          badge: '$39/ay' 
        }
      case 'gold': 
        return { 
          name: 'Gold', 
          color: 'from-yellow-500 to-orange-500', 
          icon: FiAward,
          badge: '$59/ay' 
        }
      default: 
        return { 
          name: 'Bilinmiyor', 
          color: 'from-gray-500 to-slate-500', 
          icon: FiUser,
          badge: '' 
        }
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

  const planInfo = getPlanInfo(profile.subscriptionPlan)
  const successRate = Math.round((profile.successfulSignals / profile.totalAnalyses) * 100)

  return (
    <Layout>
      <div className="min-h-screen relative overflow-hidden">
        {/* Ultra Premium Background */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-slate-900"></div>
        
        {/* Floating Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-reverse"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 mb-6">
                <FiUser className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300 font-medium">Hesap Yönetimi</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Profilim
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Hesap bilgilerinizi yönetin ve
                <span className="text-purple-400 font-semibold"> analiz performansınızı </span>
                takip edin
              </p>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="xl:col-span-1 space-y-8"
              >
                {/* Main Profile Card */}
                <div className="relative group">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${planInfo.color} rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000`}></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 text-center">
                    {/* Avatar */}
                    <div className="relative mb-6">
                      <div className={`w-24 h-24 bg-gradient-to-r ${planInfo.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <FiUser className="w-12 h-12 text-white" />
                      </div>
                      <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r ${planInfo.color} rounded-full border border-white/20`}>
                        <planInfo.icon className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* User Info */}
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {profile.fullName}
                    </h2>
                    <p className="text-gray-300 mb-4">{profile.email}</p>

                    {/* Plan Badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${planInfo.color} rounded-full mb-6`}>
                      <planInfo.icon className="w-4 h-4 text-white" />
                      <span className="text-white font-semibold">{planInfo.name}</span>
                      <span className="text-white/80 text-sm">{planInfo.badge}</span>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-600/30">
                        <div className="text-2xl font-bold text-emerald-400">{profile.dailyAnalysisCount}</div>
                        <div className="text-sm text-gray-400">Bugün</div>
                      </div>
                      <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-600/30">
                        <div className="text-2xl font-bold text-blue-400">{profile.dailyAnalysisLimit}</div>
                        <div className="text-sm text-gray-400">Günlük Limit</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 to-blue-500/50 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <FiBarChart className="w-6 h-6 text-emerald-400" />
                      Performans
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Toplam Analiz:</span>
                        <span className="text-white font-bold">{profile.totalAnalyses}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Başarılı Sinyal:</span>
                        <span className="text-emerald-400 font-bold">{profile.successfulSignals}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Başarı Oranı:</span>
                        <span className="text-purple-400 font-bold">%{successRate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Toplam Kar:</span>
                        <span className="text-blue-400 font-bold">+%{profile.totalProfit}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Üyelik:</span>
                        <span className="text-white">{formatDate(profile.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Settings Panel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="xl:col-span-2 space-y-8"
              >
                {/* Profile Settings */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/50 to-cyan-500/50 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <FiSettings className="w-6 h-6 text-purple-400" />
                        Profil Bilgileri
                      </h2>
                      <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 p-[2px] hover:scale-105 transition-transform"
                      >
                        <div className="relative bg-slate-900 rounded-xl px-6 py-3 transition-all duration-300 group-hover/btn:bg-transparent">
                          <div className="flex items-center gap-2">
                            {isEditing ? (
                              <>
                                <FiSave className="w-4 h-4 text-white" />
                                <span className="text-white font-medium">Kaydet</span>
                              </>
                            ) : (
                              <>
                                <FiEdit2 className="w-4 h-4 text-white" />
                                <span className="text-white font-medium">Düzenle</span>
                              </>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Personal Information */}
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            Ad Soyad
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={profile.fullName}
                              onChange={(e) => handleChange('fullName', e.target.value)}
                              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-slate-800/30 border border-slate-600/30 rounded-xl text-white">
                              {profile.fullName}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            E-posta
                          </label>
                          <div className="px-4 py-3 bg-slate-800/30 border border-slate-600/30 rounded-xl text-gray-400 relative">
                            {profile.email}
                            <span className="absolute right-3 top-3 text-xs text-gray-500">
                              (değiştirilemez)
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            Tercih Edilen Zaman Dilimi
                          </label>
                          {isEditing ? (
                            <select
                              value={profile.preferredTimeframe}
                              onChange={(e) => handleChange('preferredTimeframe', e.target.value)}
                              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                            >
                              <option value="4h">4 Saat</option>
                              <option value="1d">1 Gün</option>
                            </select>
                          ) : (
                            <div className="px-4 py-3 bg-slate-800/30 border border-slate-600/30 rounded-xl text-white">
                              {profile.preferredTimeframe === '4h' ? '4 Saat' : '1 Gün'}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Subscription & Preferences */}
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            Mevcut Plan
                          </label>
                          <div className={`px-4 py-3 bg-gradient-to-r ${planInfo.color} rounded-xl flex items-center gap-3`}>
                            <planInfo.icon className="w-5 h-5 text-white" />
                            <span className="text-white font-medium">{planInfo.name}</span>
                            <span className="text-white/80 text-sm">{planInfo.badge}</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            Bildirimler
                          </label>
                          <div className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-600/30 rounded-xl">
                            <span className="text-white">Push Bildirimler</span>
                            <button
                              onClick={() => handleChange('notificationsEnabled', !profile.notificationsEnabled)}
                              disabled={!isEditing}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                profile.notificationsEnabled ? 'bg-purple-500' : 'bg-gray-600'
                              } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  profile.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            Günlük Kullanım
                          </label>
                          <div className="p-4 bg-slate-800/30 border border-slate-600/30 rounded-xl">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-white">{profile.dailyAnalysisCount} / {profile.dailyAnalysisLimit}</span>
                              <span className="text-purple-400 text-sm">
                                {Math.round((profile.dailyAnalysisCount / profile.dailyAnalysisLimit) * 100)}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all"
                                style={{ width: `${(profile.dailyAnalysisCount / profile.dailyAnalysisLimit) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Actions */}
                {!isEditing && (
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500/50 to-orange-500/50 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                    <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <FiShield className="w-6 h-6 text-red-400" />
                        Hesap İşlemleri
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-[2px] hover:scale-105 transition-transform">
                          <div className="relative bg-slate-900 rounded-xl px-6 py-4 transition-all duration-300 group-hover/btn:bg-transparent">
                            <div className="flex items-center justify-center gap-2">
                              <FiShield className="w-5 h-5 text-white" />
                              <span className="text-white font-medium">Şifre Değiştir</span>
                            </div>
                          </div>
                        </button>
                        
                        <button className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-red-500 to-pink-500 p-[2px] hover:scale-105 transition-transform">
                          <div className="relative bg-slate-900 rounded-xl px-6 py-4 transition-all duration-300 group-hover/btn:bg-transparent">
                            <div className="flex items-center justify-center gap-2">
                              <FiShield className="w-5 h-5 text-white" />
                              <span className="text-white font-medium">Hesabı Sil</span>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 