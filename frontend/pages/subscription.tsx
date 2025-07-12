import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import { SUBSCRIPTION_PLANS } from '@/lib/stripe'
import { FiCheck, FiAward } from 'react-icons/fi'

export default function Subscription() {
  const handleSubscribe = async (planId: string) => {
    // Demo - gerçek uygulamada Stripe'a yönlendirme yapılacak
    alert(`${planId} planı için ödeme sayfasına yönlendirileceksiniz`)
  }

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Abonelik Planları
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              İhtiyaçlarınıza uygun planı seçin ve kripto analizlerinin keyfini çıkarın
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(SUBSCRIPTION_PLANS).map(([planId, plan], index) => (
              <motion.div
                key={planId}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`glass-card p-8 relative ${
                  planId === 'pro' ? 'neon-border' : ''
                }`}
              >
                {planId === 'pro' && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                         <div className="glass-button px-4 py-2 text-sm font-semibold text-white flex items-center gap-2">
                       <FiAward className="w-4 h-4" />
                       En Popüler
                     </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-gradient mb-4">
                    {plan.price === 0 ? 'Ücretsiz' : `$${plan.price}/ay`}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(planId)}
                  className={`w-full py-3 text-center font-semibold transition-transform hover:scale-105 ${
                    planId === 'pro' 
                      ? 'glass-button text-white neon-border' 
                      : 'glass-button text-white'
                  }`}
                >
                  {plan.price === 0 ? 'Başla' : 'Planı Seç'}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Özellikler Karşılaştırması */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gradient">
              Plan Karşılaştırması
            </h2>
            <div className="glass-card p-8 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 text-white">Özellik</th>
                    <th className="text-center py-4 text-white">Starter</th>
                    <th className="text-center py-4 text-white">Pro</th>
                    <th className="text-center py-4 text-white">Gold</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-4 text-gray-300">Günlük Analiz</td>
                    <td className="text-center py-4 text-white">5</td>
                    <td className="text-center py-4 text-white">20</td>
                    <td className="text-center py-4 text-white">40</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 text-gray-300">Desteklenen Coinler</td>
                    <td className="text-center py-4 text-white">BTC, ETH</td>
                    <td className="text-center py-4 text-white">Tümü</td>
                    <td className="text-center py-4 text-white">Tümü</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 text-gray-300">Sinyal Geçmişi</td>
                    <td className="text-center py-4 text-gray-400">✗</td>
                    <td className="text-center py-4 text-green-400">✓</td>
                    <td className="text-center py-4 text-green-400">✓</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 text-gray-300">Premium Destek</td>
                    <td className="text-center py-4 text-gray-400">✗</td>
                    <td className="text-center py-4 text-gray-400">✗</td>
                    <td className="text-center py-4 text-green-400">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
} 