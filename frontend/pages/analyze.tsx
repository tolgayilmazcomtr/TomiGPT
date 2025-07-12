import Layout from '@/components/Layout'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi'

export default function Analyze() {
  const [selectedCoin, setSelectedCoin] = useState('')
  const [timeframe, setTimeframe] = useState('4h')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const popularCoins = [
    'BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'ADA/USDT', 'SOL/USDT',
    'DOT/USDT', 'AVAX/USDT', 'MATIC/USDT', 'ATOM/USDT', 'NEAR/USDT'
  ]

  const handleAnalyze = async () => {
    if (!selectedCoin) return
    
    setAnalyzing(true)
    
    // Demo analiz sonucu
    setTimeout(() => {
      const signals = ['AL', 'SAT', 'BEKLE']
      const randomSignal = signals[Math.floor(Math.random() * signals.length)]
      const randomScore = Math.random() * 10 - 5
      
      setResult({
        signal: randomSignal,
        score: randomScore.toFixed(2),
        price: (Math.random() * 100000).toFixed(2),
        indicators: {
          RSI: Math.random() * 100,
          MACD: Math.random() * 2 - 1,
          EMA: Math.random() * 2 - 1,
          'Bollinger Bands': Math.random() * 2 - 1,
          ADX: Math.random() * 100,
          CCI: Math.random() * 200 - 100,
          'Volume': Math.random() * 2
        }
      })
      setAnalyzing(false)
    }, 2000)
  }

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'AL': return 'text-green-400'
      case 'SAT': return 'text-red-400'
      case 'BEKLE': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'AL': return <FiTrendingUp className="w-8 h-8" />
      case 'SAT': return <FiTrendingDown className="w-8 h-8" />
      case 'BEKLE': return <FiMinus className="w-8 h-8" />
      default: return null
    }
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
              Kripto Analiz
            </h1>
            <p className="text-xl text-gray-300">
              Teknik indikatörler ile kripto para analizi yapın
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Analiz Formu */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-card p-6"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">
                Analiz Parametreleri
              </h2>

              {/* Coin Seçimi */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Kripto Para
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedCoin}
                    onChange={(e) => setSelectedCoin(e.target.value)}
                    placeholder="BTC/USDT"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <FiSearch className="absolute right-3 top-3 text-gray-400" />
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {popularCoins.map((coin) => (
                    <button
                      key={coin}
                      onClick={() => setSelectedCoin(coin)}
                      className="px-3 py-1 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-300 transition-colors"
                    >
                      {coin}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zaman Dilimi */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Zaman Dilimi
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['4h', '1d'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        timeframe === tf
                          ? 'glass-button text-white'
                          : 'bg-white/5 hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Analiz Butonu */}
              <button
                onClick={handleAnalyze}
                disabled={!selectedCoin || analyzing}
                className="w-full glass-button px-6 py-3 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
              >
                {analyzing ? 'Analiz Ediliyor...' : 'Analiz Başlat'}
              </button>
            </motion.div>

            {/* Sonuçlar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-card p-6"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">
                Analiz Sonucu
              </h2>

              {result ? (
                <div className="space-y-6">
                  {/* Sinyal */}
                  <div className="text-center">
                    <div className={`inline-flex items-center gap-2 ${getSignalColor(result.signal)}`}>
                      {getSignalIcon(result.signal)}
                      <span className="text-4xl font-bold">{result.signal}</span>
                    </div>
                    <p className="text-gray-300 mt-2">
                      Skor: {result.score} | Fiyat: ${result.price}
                    </p>
                  </div>

                  {/* İndikatörler */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">
                      İndikatör Detayları
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(result.indicators).map(([name, value]) => (
                        <div key={name} className="flex justify-between items-center">
                          <span className="text-gray-300">{name}</span>
                          <span className="text-white font-mono">
                            {typeof value === 'number' ? value.toFixed(2) : value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <p>Analiz sonucu burada görünecek</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 