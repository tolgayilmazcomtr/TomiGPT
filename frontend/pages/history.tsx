import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import { FiTrendingUp, FiTrendingDown, FiMinus, FiClock, FiBarChart, FiActivity, FiTarget, FiTrendingDown as FiArrowDown, FiTrendingUp as FiArrowUp } from 'react-icons/fi'
import { useState } from 'react'

export default function History() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [timeFilter, setTimeFilter] = useState('all')

  // Enhanced history data
  const analysisHistory = [
    {
      id: 1,
      symbol: 'BTC/USDT',
      name: 'Bitcoin',
      signal: 'AL',
      score: 6.8,
      price: 45234.56,
      currentPrice: 47891.23,
      timeframe: '4h',
      date: '2024-01-15T10:30:00Z',
      confidence: 87,
      profit: 5.86,
      indicators: { RSI: 65, MACD: 0.8, EMA: 1.2, 'Bollinger Bands': 0.5, ADX: 72, CCI: -45, Volume: 1.8 }
    },
    {
      id: 2,
      symbol: 'ETH/USDT',
      name: 'Ethereum',
      signal: 'SAT',
      score: -4.2,
      price: 2834.12,
      currentPrice: 2654.89,
      timeframe: '1d',
      date: '2024-01-14T14:20:00Z',
      confidence: 72,
      profit: 6.33,
      indicators: { RSI: 75, MACD: -0.5, EMA: -0.8, 'Bollinger Bands': -0.7, ADX: 68, CCI: 89, Volume: 2.1 }
    },
    {
      id: 3,
      symbol: 'BNB/USDT',
      name: 'BNB',
      signal: 'BEKLE',
      score: 1.5,
      price: 312.45,
      currentPrice: 318.92,
      timeframe: '4h',
      date: '2024-01-13T09:15:00Z',
      confidence: 65,
      profit: 2.07,
      indicators: { RSI: 55, MACD: 0.2, EMA: 0.1, 'Bollinger Bands': 0.1, ADX: 45, CCI: 12, Volume: 1.3 }
    },
    {
      id: 4,
      symbol: 'SOL/USDT',
      name: 'Solana',
      signal: 'AL',
      score: 7.2,
      price: 89.34,
      currentPrice: 95.67,
      timeframe: '4h',
      date: '2024-01-12T16:45:00Z',
      confidence: 92,
      profit: 7.09,
      indicators: { RSI: 42, MACD: 1.2, EMA: 1.5, 'Bollinger Bands': 0.8, ADX: 78, CCI: -67, Volume: 2.4 }
    },
    {
      id: 5,
      symbol: 'ADA/USDT',
      name: 'Cardano',
      signal: 'SAT',
      score: -5.1,
      price: 0.4567,
      currentPrice: 0.4234,
      timeframe: '1d',
      date: '2024-01-11T11:20:00Z',
      confidence: 78,
      profit: 7.29,
      indicators: { RSI: 82, MACD: -0.8, EMA: -1.1, 'Bollinger Bands': -0.9, ADX: 71, CCI: 145, Volume: 1.9 }
    }
  ]

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'AL': return 'text-green-400'
      case 'SAT': return 'text-red-400'
      case 'BEKLE': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getSignalBgColor = (signal: string) => {
    switch (signal) {
      case 'AL': return 'from-green-500/20 to-emerald-500/20 border-green-500/30'
      case 'SAT': return 'from-red-500/20 to-pink-500/20 border-red-500/30'
      case 'BEKLE': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-500/30'
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

  const filteredHistory = analysisHistory.filter(analysis => {
    if (selectedFilter !== 'all' && analysis.signal !== selectedFilter) return false
    if (timeFilter !== 'all' && analysis.timeframe !== timeFilter) return false
    return true
  })

  const stats = {
    total: analysisHistory.length,
    buy: analysisHistory.filter(a => a.signal === 'AL').length,
    sell: analysisHistory.filter(a => a.signal === 'SAT').length,
    hold: analysisHistory.filter(a => a.signal === 'BEKLE').length,
    avgProfit: (analysisHistory.reduce((sum, a) => sum + a.profit, 0) / analysisHistory.length).toFixed(2),
    successRate: Math.round((analysisHistory.filter(a => a.profit > 0).length / analysisHistory.length) * 100)
  }

  return (
    <Layout>
      <div className="min-h-screen relative overflow-hidden">
        {/* Ultra Premium Background */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-slate-900"></div>
        
        {/* Floating Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-reverse"></div>
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
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full border border-emerald-500/30 mb-6">
                <FiClock className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300 font-medium">Analiz Performansı</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Analiz Geçmişi
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Geçmiş analiz sonuçlarınız ve
                <span className="text-emerald-400 font-semibold"> performans istatistikleri</span>
              </p>
            </motion.div>

            {/* Statistics Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12"
            >
              {[
                { label: 'Toplam Analiz', value: stats.total, color: 'from-blue-500 to-cyan-500', icon: FiBarChart },
                { label: 'AL Sinyali', value: stats.buy, color: 'from-green-500 to-emerald-500', icon: FiArrowUp },
                { label: 'SAT Sinyali', value: stats.sell, color: 'from-red-500 to-pink-500', icon: FiArrowDown },
                { label: 'BEKLE Sinyali', value: stats.hold, color: 'from-yellow-500 to-orange-500', icon: FiMinus },
                { label: 'Başarı Oranı', value: `%${stats.successRate}`, color: 'from-purple-500 to-violet-500', icon: FiTarget },
                { label: 'Ort. Kar', value: `%${stats.avgProfit}`, color: 'from-emerald-500 to-teal-500', icon: FiActivity }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="group relative"
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000`}></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 text-center">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.value}
                    </div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-slate-500/50 to-gray-500/50 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Signal Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Sinyal Türü</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { value: 'all', label: 'Hepsi' },
                          { value: 'AL', label: 'AL' },
                          { value: 'SAT', label: 'SAT' },
                          { value: 'BEKLE', label: 'BEKLE' }
                        ].map((filter) => (
                          <button
                            key={filter.value}
                            onClick={() => setSelectedFilter(filter.value)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                              selectedFilter === filter.value
                                ? 'bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/50 text-white'
                                : 'bg-slate-800/30 border border-slate-600/30 text-gray-300 hover:bg-slate-700/50'
                            }`}
                          >
                            {filter.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Zaman Dilimi</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 'all', label: 'Hepsi' },
                          { value: '4h', label: '4 Saat' },
                          { value: '1d', label: '1 Gün' }
                        ].map((filter) => (
                          <button
                            key={filter.value}
                            onClick={() => setTimeFilter(filter.value)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                              timeFilter === filter.value
                                ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/50 text-white'
                                : 'bg-slate-800/30 border border-slate-600/30 text-gray-300 hover:bg-slate-700/50'
                            }`}
                          >
                            {filter.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Analysis List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6"
            >
              {filteredHistory.map((analysis, index) => (
                <motion.div
                  key={analysis.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${getSignalBgColor(analysis.signal)} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000`}></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 hover:bg-slate-800/50 transition-all">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                      {/* Left Section */}
                      <div className="flex items-center gap-6">
                        {/* Signal Badge */}
                        <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${getSignalBgColor(analysis.signal)} border flex items-center gap-2`}>
                          {getSignalIcon(analysis.signal)}
                          <span className={`font-bold text-lg ${getSignalColor(analysis.signal)}`}>
                            {analysis.signal}
                          </span>
                        </div>

                        {/* Coin Info */}
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                              {analysis.symbol.slice(0, 3)}
                            </div>
                            <div>
                              <div className="font-bold text-white text-lg">{analysis.symbol}</div>
                              <div className="text-gray-400 text-sm">{analysis.name}</div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-400">
                            {analysis.timeframe} • {formatDate(analysis.date)}
                          </div>
                        </div>
                      </div>

                      {/* Right Section */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full lg:w-auto">
                        {/* Prices */}
                        <div className="text-center">
                          <div className="text-gray-400 text-sm mb-1">Analiz Fiyatı</div>
                          <div className="text-white font-bold">${analysis.price.toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400 text-sm mb-1">Güncel Fiyat</div>
                          <div className="text-white font-bold">${analysis.currentPrice.toLocaleString()}</div>
                        </div>

                        {/* Performance */}
                        <div className="text-center">
                          <div className="text-gray-400 text-sm mb-1">Performans</div>
                          <div className={`font-bold ${analysis.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {analysis.profit > 0 ? '+' : ''}{analysis.profit.toFixed(2)}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400 text-sm mb-1">Güven</div>
                          <div className="text-emerald-400 font-bold">%{analysis.confidence}</div>
                        </div>
                      </div>
                    </div>

                    {/* Indicators Summary */}
                    <div className="mt-6 pt-6 border-t border-slate-600/30">
                      <div className="text-sm text-gray-300">
                        <span className="font-medium text-gray-200">İndikatörler: </span>
                        {Object.entries(analysis.indicators).map(([key, value], idx) => (
                          <span key={key} className="text-gray-400">
                            {idx > 0 && ' • '}
                            {key}: <span className="text-white">{typeof value === 'number' ? value.toFixed(1) : value}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredHistory.length === 0 && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-slate-500/50 to-gray-500/50 rounded-2xl blur opacity-25"></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-12 text-center">
                    <FiClock className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">Sonuç Bulunamadı</h3>
                    <p className="text-gray-400">Seçilen filtreler için analiz bulunamadı</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 