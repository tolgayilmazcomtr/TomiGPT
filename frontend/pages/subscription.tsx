import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import { FiCheck, FiAward, FiZap, FiStar, FiShield, FiTrendingUp, FiUsers, FiUser } from 'react-icons/fi'
import { useState } from 'react'

// Enhanced subscription plans
const SUBSCRIPTION_PLANS = {
  starter: {
    name: 'Starter',
    price: 0,
    period: 'Ücretsiz',
    description: 'Kripto analiz dünyasına ilk adımınız',
    features: [
      '5 günlük analiz hakkı',
      'BTC ve ETH analizi',
      'AL/SAT/BEKLE sinyalleri',
      'Temel teknik indikatörler',
      'Email destek'
    ],
    color: 'from-slate-500 to-gray-500',
    icon: FiUsers,
    popular: false
  },
  pro: {
    name: 'Pro',
    price: 39,
    period: 'aylık',
    description: 'Ciddi yatırımcılar için gelişmiş özellikler',
    features: [
      '20 günlük analiz hakkı',
      '2000+ coin desteği',
      'Gelişmiş sinyal geçmişi',
      'Detaylı indikatör analizi',
      'Push bildirimler',
      'Öncelikli destek',
      'Mobil uygulama erişimi'
    ],
    color: 'from-blue-500 to-cyan-500',
    icon: FiStar,
    popular: true
  },
  gold: {
    name: 'Gold',
    price: 59,
    period: 'aylık',
    description: 'Profesyonel traders için premium deneyim',
    features: [
      '40 günlük analiz hakkı',
      'Tüm coinlerde sınırsız analiz',
      'AI destekli özel stratejiler',
      'Risk yönetimi araçları',
      'Telegram bot entegrasyonu',
      '7/24 premium destek',
      'Özel webinar erişimi',
      'Portfolio tracking'
    ],
    color: 'from-yellow-500 to-orange-500',
    icon: FiAward,
    popular: false
  }
}

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const handleSubscribe = async (planId: string) => {
    setSelectedPlan(planId)
    // Demo - gerçek uygulamada Stripe'a yönlendirme yapılacak
    setTimeout(() => {
      alert(`${SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS].name} planı için ödeme sayfasına yönlendirileceksiniz`)
      setSelectedPlan(null)
    }, 2000)
  }

  const getYearlyDiscount = (price: number) => {
    return Math.round(price * 12 * 0.8) // 20% discount
  }

  return (
    <Layout>
      <div className="min-h-screen relative overflow-hidden">
        {/* Ultra Premium Background */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-slate-900"></div>
        
        {/* Floating Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-float-reverse"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
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
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-yellow-500/20 rounded-full border border-blue-500/30 mb-6">
                <FiAward className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300 font-medium">Premium Abonelik Planları</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Doğru Planı Seçin
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                İhtiyaçlarınıza uygun planı seçin ve
                <span className="text-yellow-400 font-semibold"> profesyonel analiz </span>
                deneyiminin keyfini çıkarın
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex items-center bg-slate-800/50 backdrop-blur-xl rounded-full p-1 border border-slate-600/50">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Aylık
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-6 py-3 rounded-full font-medium transition-all relative ${
                    billingCycle === 'yearly'
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Yıllık
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                    %20 İndirim
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {Object.entries(SUBSCRIPTION_PLANS).map(([planId, plan], index) => (
                <motion.div
                  key={planId}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`group relative ${plan.popular ? 'scale-105 z-10' : ''}`}
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${plan.color} rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 ${
                    plan.popular ? 'opacity-50' : ''
                  }`}></div>
                  
                  {/* Card */}
                  <div className={`relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border p-8 ${
                    plan.popular ? 'border-blue-500/50' : 'border-slate-700/50'
                  }`}>
                    {/* Popular Badge */}
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-2 rounded-full text-white font-bold text-sm flex items-center gap-2">
                          <FiAward className="w-4 h-4" />
                          En Popüler
                        </div>
                      </div>
                    )}

                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <plan.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {plan.name}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4">
                        {plan.description}
                      </p>

                      {/* Price */}
                      <div className="mb-4">
                        {plan.price === 0 ? (
                          <div className={`text-4xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                            Ücretsiz
                          </div>
                        ) : (
                          <div>
                            <div className={`text-4xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                              ${billingCycle === 'yearly' ? getYearlyDiscount(plan.price) : plan.price}
                              {billingCycle === 'yearly' && (
                                <span className="text-lg text-gray-400 line-through ml-2">
                                  ${plan.price * 12}
                                </span>
                              )}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {billingCycle === 'yearly' ? 'yıllık' : plan.period}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + featureIndex * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className={`w-5 h-5 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                            <FiCheck className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleSubscribe(planId)}
                      disabled={selectedPlan === planId}
                      className={`group/btn relative w-full overflow-hidden rounded-2xl bg-gradient-to-r ${plan.color} p-[2px] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform`}
                    >
                      <div className={`relative bg-slate-900 rounded-2xl px-6 py-4 transition-all duration-300 group-hover/btn:bg-transparent ${
                        plan.popular ? 'group-hover/btn:bg-transparent' : ''
                      }`}>
                        <div className="flex items-center justify-center gap-3">
                          {selectedPlan === planId ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-white font-bold">İşleniyor...</span>
                            </>
                          ) : (
                            <>
                              <span className="text-white font-bold">
                                {plan.price === 0 ? 'Hemen Başla' : 'Planı Seç'}
                              </span>
                              <FiZap className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform" />
                            </>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-16"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
                  <h2 className="text-3xl font-bold text-center mb-8">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Detaylı Plan Karşılaştırması
                    </span>
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-600/50">
                          <th className="text-left py-4 px-4 text-white font-semibold">Özellik</th>
                          <th className="text-center py-4 px-4 text-white font-semibold">Starter</th>
                          <th className="text-center py-4 px-4 text-white font-semibold">Pro</th>
                          <th className="text-center py-4 px-4 text-white font-semibold">Gold</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['Günlük Analiz Hakkı', '5', '20', '40'],
                          ['Desteklenen Coinler', 'BTC, ETH', '2000+', 'Sınırsız'],
                          ['Sinyal Geçmişi', '❌', '✅', '✅'],
                          ['Push Bildirimler', '❌', '✅', '✅'],
                          ['Mobil Uygulama', '❌', '✅', '✅'],
                          ['Premium Destek', '❌', '❌', '✅'],
                          ['AI Stratejiler', '❌', '❌', '✅'],
                          ['Portfolio Tracking', '❌', '❌', '✅']
                        ].map((row, index) => (
                          <tr key={index} className="border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors">
                            <td className="py-4 px-4 text-gray-300 font-medium">{row[0]}</td>
                            <td className="text-center py-4 px-4 text-white">{row[1]}</td>
                            <td className="text-center py-4 px-4 text-white">{row[2]}</td>
                            <td className="text-center py-4 px-4 text-white">{row[3]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: FiShield,
                  title: 'Güvenli Ödeme',
                  description: 'Stripe ile korumalı ödeme altyapısı',
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  icon: FiTrendingUp,
                  title: '%95 Başarı Oranı',
                  description: 'Kanıtlanmış analiz performansı',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: FiUsers,
                  title: '10.000+ Kullanıcı',
                  description: 'Binlerce kullanıcının güvendiği platform',
                  color: 'from-purple-500 to-violet-500'
                }
              ].map((item, index) => (
                <div key={index} className="group relative">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000`}></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 text-center">
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 