import Layout from '@/components/Layout'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiTrendingUp, FiTrendingDown, FiMinus, FiBarChart, FiActivity, FiZap, FiTarget } from 'react-icons/fi'

interface CoinData {
  symbol: string
  name: string
  icon?: string
}

export default function Analyze() {
  const [selectedCoin, setSelectedCoin] = useState('')
  const [timeframe, setTimeframe] = useState('4h')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [coinList, setCoinList] = useState<CoinData[]>([])
  const [searchResults, setSearchResults] = useState<CoinData[]>([])

  // Popular coins with better data
  const popularCoins = [
    { symbol: 'BTCUSDT', name: 'Bitcoin', icon: 'BTC' },
    { symbol: 'ETHUSDT', name: 'Ethereum', icon: 'ETH' },
    { symbol: 'BNBUSDT', name: 'BNB', icon: 'BNB' },
    { symbol: 'ADAUSDT', name: 'Cardano', icon: 'ADA' },
    { symbol: 'SOLUSDT', name: 'Solana', icon: 'SOL' },
    { symbol: 'DOTUSDT', name: 'Polkadot', icon: 'DOT' },
    { symbol: 'AVAXUSDT', name: 'Avalanche', icon: 'AVAX' },
    { symbol: 'MATICUSDT', name: 'Polygon', icon: 'POL' },
    { symbol: 'ATOMUSDT', name: 'Cosmos', icon: 'ATOM' },
    { symbol: 'NEARUSDT', name: 'NEAR', icon: 'NEAR' }
  ]

  useEffect(() => {
    // Simulate loading coin list
    setCoinList(popularCoins)
  }, [])

  useEffect(() => {
    if (selectedCoin) {
      const filtered = coinList.filter(coin => 
        coin.symbol.toLowerCase().includes(selectedCoin.toLowerCase()) ||
        coin.name.toLowerCase().includes(selectedCoin.toLowerCase())
      )
      setSearchResults(filtered.slice(0, 5))
    } else {
      setSearchResults([])
    }
  }, [selectedCoin, coinList])

  const handleAnalyze = async () => {
    if (!selectedCoin) return
    
    setAnalyzing(true)
    
    // Enhanced demo analysis result
    setTimeout(() => {
      const signals = ['AL', 'SAT', 'BEKLE']
      const randomSignal = signals[Math.floor(Math.random() * signals.length)]
      const randomScore = Math.random() * 10 - 5
      
      setResult({
        signal: randomSignal,
        score: randomScore.toFixed(2),
        price: (Math.random() * 100000).toFixed(2),
        confidence: Math.floor(Math.random() * 40) + 60, // 60-100%
        indicators: {
          RSI: {
            value: Math.random() * 100,
            signal: Math.random() > 0.5 ? 'AL' : 'SAT',
            weight: 2.0
          },
          MACD: {
            value: Math.random() * 2 - 1,
            signal: Math.random() > 0.5 ? 'AL' : 'SAT',
            weight: 1.5
          },
          EMA: {
            value: Math.random() * 2 - 1,
            signal: Math.random() > 0.5 ? 'AL' : 'BEKLE',
            weight: 1.0
          },
          'Bollinger Bands': {
            value: Math.random() * 2 - 1,
            signal: Math.random() > 0.5 ? 'AL' : 'SAT',
            weight: 1.2
          },
          ADX: {
            value: Math.random() * 100,
            signal: Math.random() > 0.5 ? 'AL' : 'BEKLE',
            weight: 1.0
          },
          CCI: {
            value: Math.random() * 200 - 100,
            signal: Math.random() > 0.5 ? 'AL' : 'SAT',
            weight: 1.0
          },
          'Volume': {
            value: Math.random() * 2,
            signal: Math.random() > 0.5 ? 'AL' : 'BEKLE',
            weight: 1.0
          }
        }
      })
      setAnalyzing(false)
    }, 3000)
  }

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
      case 'AL': return <FiTrendingUp className="w-8 h-8" />
      case 'SAT': return <FiTrendingDown className="w-8 h-8" />
      case 'BEKLE': return <FiMinus className="w-8 h-8" />
      default: return null
    }
  }

  return (
    <Layout>
      <div className="min-h-screen relative overflow-hidden">
        {/* Ultra Premium Background */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-slate-900"></div>
        
        {/* Floating Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
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
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full border border-blue-500/30 mb-6">
                <FiBarChart className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300 font-medium">AI Destekli Teknik Analiz</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Kripto Analiz
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                8 teknik indikatör ile güçlendirilmiş yapay zeka algoritması kullanarak
                <span className="text-emerald-400 font-semibold"> AL • SAT • BEKLE </span>
                sinyalleri alın
              </p>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Analysis Panel */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Coin Selection */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 to-emerald-500/50 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-xl">
                        <FiTarget className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">Hedef Kripto Para</h2>
                    </div>

                    <div className="space-y-4">
                      <div className="relative">
                        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={selectedCoin}
                          onChange={(e) => setSelectedCoin(e.target.value)}
                          placeholder="Coin ara... (örn: BTC, ETH)"
                          className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                        />
                        
                        {/* Search Results */}
                        {searchResults.length > 0 && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-xl overflow-hidden z-20">
                            {searchResults.map((coin) => (
                              <button
                                key={coin.symbol}
                                onClick={() => {
                                  setSelectedCoin(coin.symbol)
                                  setSearchResults([])
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors flex items-center gap-3"
                              >
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                  {coin.icon?.[0] || coin.symbol[0]}
                                </div>
                                <div>
                                  <div className="text-white font-medium">{coin.symbol}</div>
                                  <div className="text-gray-400 text-sm">{coin.name}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Popular Coins */}
                      <div>
                        <p className="text-sm text-gray-400 mb-3">Popüler Coinler:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {popularCoins.slice(0, 6).map((coin) => (
                            <button
                              key={coin.symbol}
                              onClick={() => setSelectedCoin(coin.symbol)}
                              className="group px-4 py-3 bg-slate-800/30 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-emerald-500/20 border border-slate-600/30 hover:border-emerald-500/50 rounded-lg text-left transition-all duration-300"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 transition-transform">
                                  {coin.icon?.[0] || coin.symbol[0]}
                                </div>
                                <div>
                                  <div className="text-white font-medium text-sm">{coin.symbol.replace('USDT', '')}</div>
                                  <div className="text-gray-400 text-xs">{coin.name}</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeframe Selection */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl">
                        <FiActivity className="w-6 h-6 text-purple-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">Zaman Dilimi</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: '4h', label: '4 Saat', desc: 'Kısa vadeli sinyaller' },
                        { value: '1d', label: '1 Gün', desc: 'Uzun vadeli trend' }
                      ].map((tf) => (
                        <button
                          key={tf.value}
                          onClick={() => setTimeframe(tf.value)}
                          className={`relative group p-6 rounded-xl border transition-all duration-300 ${
                            timeframe === tf.value
                              ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/50 scale-105'
                              : 'bg-slate-800/30 border-slate-600/30 hover:border-purple-500/50 hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="text-white font-bold text-lg mb-1">{tf.label}</div>
                          <div className="text-gray-400 text-sm">{tf.desc}</div>
                          {timeframe === tf.value && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Analyze Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={!selectedCoin || analyzing}
                  className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-blue-500 to-cyan-500 p-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="relative bg-slate-900 rounded-2xl px-8 py-6 transition-all duration-300 group-hover:bg-transparent group-disabled:bg-slate-900">
                    <div className="flex items-center justify-center gap-3">
                      {analyzing ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-white font-bold text-lg">Analiz Ediliyor...</span>
                        </>
                      ) : (
                        <>
                          <FiZap className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                          <span className="text-white font-bold text-lg">Analiz Başlat</span>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              </motion.div>

              {/* Results Panel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {result ? (
                  <>
                    {/* Main Signal */}
                    <div className="relative group">
                      <div className={`absolute -inset-1 bg-gradient-to-r ${getSignalBgColor(result.signal)} rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-1000`}></div>
                      <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 text-center">
                        <div className="mb-6">
                          <div className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${getSignalBgColor(result.signal)} rounded-full border mb-4`}>
                            {getSignalIcon(result.signal)}
                            <span className={`text-3xl font-bold ${getSignalColor(result.signal)}`}>
                              {result.signal}
                            </span>
                          </div>
                          <div className="text-gray-300 space-y-2">
                            <p>Fiyat: <span className="text-white font-bold">${result.price}</span></p>
                            <p>Skor: <span className="text-white font-bold">{result.score}</span></p>
                            <p>Güven: <span className="text-emerald-400 font-bold">%{result.confidence}</span></p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Indicators */}
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 to-blue-500/50 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                      <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                          <FiBarChart className="w-6 h-6 text-emerald-400" />
                          İndikatör Detayları
                        </h3>
                        <div className="space-y-4">
                          {Object.entries(result.indicators).map(([name, data]: [string, any]) => (
                            <div key={name} className="p-4 bg-slate-800/30 rounded-xl border border-slate-600/30">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-white font-medium">{name}</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getSignalColor(data.signal)} bg-slate-700/50`}>
                                  {data.signal}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm text-gray-400">
                                <span>Değer: {typeof data.value === 'number' ? data.value.toFixed(2) : data.value}</span>
                                <span>Ağırlık: {data.weight}x</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-slate-500/50 to-gray-500/50 rounded-2xl blur opacity-25"></div>
                    <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-12 text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-slate-500/20 to-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiBarChart className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-300 mb-2">Analiz Bekleniyor</h3>
                      <p className="text-gray-400">Bir coin seçip analiz başlatın</p>
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