import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import { FiGlobe, FiMoon, FiBell, FiMail, FiShield } from 'react-icons/fi'
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
    } else {
      setSettings(prev => ({
        ...prev,
        [key]: !prev[key as keyof typeof prev]
      }))
    }
  }

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    // Demo - gerçek uygulamada API'ye gönderilecek
    alert('Ayarlar kaydedildi!')
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
              Ayarlar
            </h1>
            <p className="text-xl text-gray-300">
              Uygulama tercihlerinizi yönetin
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Dil ve Görünüm */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="glass-card p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FiGlobe className="w-6 h-6" />
                Dil ve Görünüm
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Dil
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="tr">Türkçe</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tema
                  </label>
                  <select
                    value={settings.theme}
                    onChange={(e) => handleChange('theme', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="dark">Koyu Tema</option>
                    <option value="light">Açık Tema</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Bildirimler */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FiBell className="w-6 h-6" />
                Bildirimler
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Uygulama Bildirimleri</p>
                    <p className="text-gray-400 text-sm">
                      Önemli analiz sonuçları ve güncellemeler
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('', 'notifications')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.notifications ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">E-posta Bildirimleri</p>
                    <p className="text-gray-400 text-sm">
                      Haftalık rapor ve önemli güncellemeler
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('', 'emailNotifications')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.emailNotifications ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Push Bildirimleri</p>
                    <p className="text-gray-400 text-sm">
                      Acil sinyal değişimleri ve piyasa uyarıları
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('', 'pushNotifications')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.pushNotifications ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Gizlilik */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass-card p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FiShield className="w-6 h-6" />
                Gizlilik
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Profil Görünürlüğü</p>
                    <p className="text-gray-400 text-sm">
                      Profiliniz diğer kullanıcılara görünsün
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('privacy', 'showProfile')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.privacy.showProfile ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.privacy.showProfile ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Analiz Geçmişi</p>
                    <p className="text-gray-400 text-sm">
                      Analiz geçmişiniz herkese açık olsun
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('privacy', 'showHistory')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.privacy.showHistory ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.privacy.showHistory ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Veri Paylaşımı</p>
                    <p className="text-gray-400 text-sm">
                      Anonim kullanım verilerini paylaş
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('privacy', 'dataSharing')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.privacy.dataSharing ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.privacy.dataSharing ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Kaydet Butonu */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <button
                onClick={handleSave}
                className="glass-button px-8 py-4 text-white font-semibold text-lg hover:scale-105 transition-transform"
              >
                Ayarları Kaydet
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 