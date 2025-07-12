import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import { FiGlobe, FiMoon, FiBell, FiMail, FiShield, FiSettings as FiSettingsIcon, FiToggleLeft, FiToggleRight, FiLock, FiEye } from 'react-icons/fi'
import { useState } from 'react'

export default function Settings() {
  const [settings, setSettings] = useState({
    language: 'tr',
    theme: 'dark',
    notifications: true,
    emailNotifications: true,
    pushNotifications: false,
    privacy: {
      showProfile: true,
      showHistory: false,
      dataSharing: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      loginAlerts: true
    }
  })

  const handleToggle = (section: string, key: string) => {
    if (section === 'privacy') {
      setSettings(prev => ({
        ...prev,
        privacy: {
          ...prev.privacy,
          [key]: !prev.privacy[key as keyof typeof prev.privacy]
        }
      }))
    } else if (section === 'security') {
      setSettings(prev => ({
        ...prev,
        security: {
          ...prev.security,
          [key]: !prev.security[key as keyof typeof prev.security]
        }
      }))
    } else {
      setSettings(prev => ({
        ...prev,
        [key]: !prev[key as keyof typeof prev]
      }))
    }
  }

  const handleChange = (key: string, value: string | number) => {
    if (key === 'sessionTimeout') {
      setSettings(prev => ({
        ...prev,
        security: {
          ...prev.security,
          sessionTimeout: value as number
        }
      }))
    } else {
      setSettings(prev => ({
        ...prev,
        [key]: value
      }))
    }
  }

  const handleSave = () => {
    // Demo - gerçek uygulamada API'ye gönderilecek
    alert('Ayarlar kaydedildi!')
  }

  const ToggleSwitch = ({ enabled, onToggle, disabled = false }: { enabled: boolean, onToggle: () => void, disabled?: boolean }) => (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-gradient-to-r from-emerald-500 to-blue-500' : 'bg-gray-600'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )

  return (
    <Layout>
      <div className="min-h-screen relative overflow-hidden">
        {/* Ultra Premium Background */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-slate-900"></div>
        
        {/* Floating Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
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
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-emerald-500/20 rounded-full border border-purple-500/30 mb-6">
                <FiSettingsIcon className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300 font-medium">Sistem Tercihleri</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Ayarlar
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Uygulama tercihlerinizi yönetin ve
                <span className="text-emerald-400 font-semibold"> güvenlik ayarlarınızı </span>
                özelleştirin
              </p>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Language & Theme */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl">
                        <FiGlobe className="w-6 h-6 text-blue-400" />
                      </div>
                      Dil ve Görünüm
                    </h2>
                    
                    <div className="space-y-8">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-4">
                          Dil Seçimi
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { value: 'tr', label: 'Türkçe', flag: '🇹🇷' },
                            { value: 'en', label: 'English', flag: '🇺🇸' }
                          ].map((lang) => (
                            <button
                              key={lang.value}
                              onClick={() => handleChange('language', lang.value)}
                              className={`relative group p-4 rounded-xl border transition-all duration-300 ${
                                settings.language === lang.value
                                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50 scale-105'
                                  : 'bg-slate-800/30 border-slate-600/30 hover:border-blue-500/50 hover:bg-slate-800/50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{lang.flag}</span>
                                <div className="text-left">
                                  <div className="text-white font-semibold">{lang.label}</div>
                                </div>
                              </div>
                              {settings.language === lang.value && (
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-4">
                          Tema
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { value: 'dark', label: 'Koyu Tema', icon: FiMoon },
                            { value: 'light', label: 'Açık Tema', icon: FiEye }
                          ].map((theme) => (
                            <button
                              key={theme.value}
                              onClick={() => handleChange('theme', theme.value)}
                              className={`relative group p-4 rounded-xl border transition-all duration-300 ${
                                settings.theme === theme.value
                                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/50 scale-105'
                                  : 'bg-slate-800/30 border-slate-600/30 hover:border-purple-500/50 hover:bg-slate-800/50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <theme.icon className="w-6 h-6 text-purple-400" />
                                <div className="text-white font-semibold">{theme.label}</div>
                              </div>
                              {settings.theme === theme.value && (
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Notifications */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 to-blue-500/50 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-xl">
                        <FiBell className="w-6 h-6 text-emerald-400" />
                      </div>
                      Bildirimler
                    </h2>
                    
                    <div className="space-y-6">
                      {[
                        {
                          key: 'notifications',
                          title: 'Uygulama Bildirimleri',
                          description: 'Önemli analiz sonuçları ve güncellemeler',
                          enabled: settings.notifications
                        },
                        {
                          key: 'emailNotifications',
                          title: 'E-posta Bildirimleri',
                          description: 'Haftalık rapor ve önemli güncellemeler',
                          enabled: settings.emailNotifications
                        },
                        {
                          key: 'pushNotifications',
                          title: 'Push Bildirimleri',
                          description: 'Acil sinyal değişimleri ve piyasa uyarıları',
                          enabled: settings.pushNotifications
                        }
                      ].map((notification) => (
                        <div key={notification.key} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-600/30 hover:bg-slate-800/50 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <FiMail className="w-5 h-5 text-emerald-400" />
                              <p className="text-white font-medium">{notification.title}</p>
                            </div>
                            <p className="text-gray-400 text-sm ml-8">
                              {notification.description}
                            </p>
                          </div>
                          <ToggleSwitch 
                            enabled={notification.enabled}
                            onToggle={() => handleToggle('', notification.key)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Privacy */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
                        <FiShield className="w-6 h-6 text-purple-400" />
                      </div>
                      Gizlilik
                    </h2>
                    
                    <div className="space-y-6">
                      {[
                        {
                          key: 'showProfile',
                          title: 'Profil Görünürlüğü',
                          description: 'Profiliniz diğer kullanıcılara görünsün',
                          enabled: settings.privacy.showProfile
                        },
                        {
                          key: 'showHistory',
                          title: 'Analiz Geçmişi',
                          description: 'Analiz geçmişiniz herkese açık olsun',
                          enabled: settings.privacy.showHistory
                        },
                        {
                          key: 'dataSharing',
                          title: 'Veri Paylaşımı',
                          description: 'Anonim kullanım verilerini paylaş',
                          enabled: settings.privacy.dataSharing
                        }
                      ].map((privacy) => (
                        <div key={privacy.key} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-600/30 hover:bg-slate-800/50 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <FiEye className="w-5 h-5 text-purple-400" />
                              <p className="text-white font-medium">{privacy.title}</p>
                            </div>
                            <p className="text-gray-400 text-sm ml-8">
                              {privacy.description}
                            </p>
                          </div>
                          <ToggleSwitch 
                            enabled={privacy.enabled}
                            onToggle={() => handleToggle('privacy', privacy.key)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Security */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/50 to-orange-500/50 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl">
                        <FiLock className="w-6 h-6 text-red-400" />
                      </div>
                      Güvenlik
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-600/30 hover:bg-slate-800/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <FiShield className="w-5 h-5 text-red-400" />
                            <p className="text-white font-medium">İki Faktörlü Doğrulama</p>
                          </div>
                          <p className="text-gray-400 text-sm ml-8">
                            Hesabınız için ekstra güvenlik katmanı
                          </p>
                        </div>
                        <ToggleSwitch 
                          enabled={settings.security.twoFactorAuth}
                          onToggle={() => handleToggle('security', 'twoFactorAuth')}
                        />
                      </div>

                      <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-600/30">
                        <div className="flex items-center gap-3 mb-4">
                          <FiLock className="w-5 h-5 text-red-400" />
                          <p className="text-white font-medium">Oturum Zaman Aşımı</p>
                        </div>
                        <div className="ml-8">
                          <p className="text-gray-400 text-sm mb-3">
                            Otomatik çıkış süresi (dakika)
                          </p>
                          <select
                            value={settings.security.sessionTimeout}
                            onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50"
                          >
                            <option value={15}>15 dakika</option>
                            <option value={30}>30 dakika</option>
                            <option value={60}>1 saat</option>
                            <option value={120}>2 saat</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-600/30 hover:bg-slate-800/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <FiBell className="w-5 h-5 text-red-400" />
                            <p className="text-white font-medium">Giriş Uyarıları</p>
                          </div>
                          <p className="text-gray-400 text-sm ml-8">
                            Yeni cihaz girişlerinde e-posta gönder
                          </p>
                        </div>
                        <ToggleSwitch 
                          enabled={settings.security.loginAlerts}
                          onToggle={() => handleToggle('security', 'loginAlerts')}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 flex justify-center"
            >
              <button
                onClick={handleSave}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 p-[2px] hover:scale-105 transition-transform"
              >
                <div className="relative bg-slate-900 rounded-2xl px-12 py-4 transition-all duration-300 group-hover:bg-transparent">
                  <div className="flex items-center gap-3">
                    <FiSettingsIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    <span className="text-white font-bold text-lg">Ayarları Kaydet</span>
                  </div>
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 