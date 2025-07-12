import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import { FiTrendingUp, FiTrendingDown, FiMinus, FiClock } from 'react-icons/fi'

export default function History() {
  // Demo history data
  const analysisHistory = [
    {
      id: 1,
      symbol: 'BTC/USDT',
      signal: 'AL',
      score: 6.8,
      price: 45234.56,
      timeframe: '4h',
      date: '2024-01-15T10:30:00Z',
      indicators: { RSI: 65, MACD: 0.8, EMA: 1.2 }
    },
    {
      id: 2,
      symbol: 'ETH/USDT',
      signal: 'SAT',
      score: -4.2,
      price: 2834.12,
      timeframe: '1d',
      date: '2024-01-14T14:20:00Z',
      indicators: { RSI: 75, MACD: -0.5, EMA: -0.8 }
    },
    {
      id: 3,
      symbol: 'BNB/USDT',
      signal: 'BEKLE',
      score: 1.5,
      price: 312.45,
      timeframe: '4h',
      date: '2024-01-13T09:15:00Z',
      indicators: { RSI: 55, MACD: 0.2, EMA: 0.1 }
    },
  ]

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
      case 'AL': return <FiTrendingUp className="w-5 h-5" />
      case 'SAT': return <FiTrendingDown className="w-5 h-5" />
      case 'BEKLE': return <FiMinus className="w-5 h-5" />
      default: return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Analiz Geçmişi
            </h1>
            <p className="text-xl text-gray-300">
              Geçmiş analiz sonuçlarınız ve performans istatistikleri
            </p>
          </motion.div>

          {/* İstatistikler */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-gradient mb-2">
                {analysisHistory.length}
              </div>
              <p className="text-gray-300">Toplam Analiz</p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {analysisHistory.filter(a => a.signal === 'AL').length}
              </div>
              <p className="text-gray-300">AL Sinyali</p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">
                {analysisHistory.filter(a => a.signal === 'SAT').length}
              </div>
              <p className="text-gray-300">SAT Sinyali</p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {analysisHistory.filter(a => a.signal === 'BEKLE').length}
              </div>
              <p className="text-gray-300">BEKLE Sinyali</p>
            </div>
          </motion.div>

          {/* Analiz Listesi */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card p-6"
          >
            <h2 className="text-2xl font-bold mb-6 text-white">
              Son Analizler
            </h2>
            
            <div className="space-y-4">
              {analysisHistory.map((analysis) => (
                <div
                  key={analysis.id}
                  className="glass-card p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-2 ${getSignalColor(analysis.signal)}`}>
                        {getSignalIcon(analysis.signal)}
                        <span className="font-bold text-lg">{analysis.signal}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{analysis.symbol}</div>
                        <div className="text-sm text-gray-400">
                          {analysis.timeframe} • {formatDate(analysis.date)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold text-white">
                        ${analysis.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-sm text-gray-400">
                        Skor: {analysis.score}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-sm text-gray-300">
                      <span className="font-medium">İndikatörler:</span>
                      {Object.entries(analysis.indicators).map(([key, value]) => (
                        <span key={key} className="ml-4">
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {analysisHistory.length === 0 && (
              <div className="text-center py-12">
                <FiClock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Henüz analiz geçmişi bulunmuyor</p>
                <p className="text-gray-500 text-sm mt-2">
                  İlk analizinizi yapmak için Analiz sayfasına gidin
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  )
} 