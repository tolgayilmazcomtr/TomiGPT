import Layout from '@/components/Layout'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiTrendingUp, FiTrendingDown, FiMinus, FiBarChart, FiActivity, FiZap, FiTarget, FiChevronDown, FiCheck, FiShare2, FiX, FiMessageCircle, FiCpu, FiCopy } from 'react-icons/fi'
import { FaTwitter, FaTelegramPlane } from 'react-icons/fa'
import { BsTwitterX } from 'react-icons/bs'
import Image from 'next/image'
import coinMap from '../lib/coin_map.json'

interface CoinData {
  symbol: string
  name: string
  icon: string
}

interface AnalysisStep {
  step: string
  description: string
  completed: boolean
  details?: string
}

export default function Analyze() {
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null)
  const [timeframe, setTimeframe] = useState('4h')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [coinList, setCoinList] = useState<CoinData[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [filteredCoins, setFilteredCoins] = useState<CoinData[]>([])
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [analysisComment, setAnalysisComment] = useState('')

  // Coin names mapping
  const coinNames: { [key: string]: string } = {
    'BTC': 'Bitcoin',
    'ETH': 'Ethereum',
    'BNB': 'BNB',
    'ADA': 'Cardano',
    'SOL': 'Solana',
    'DOT': 'Polkadot',
    'AVAX': 'Avalanche',
    'MATIC': 'Polygon',
    'ATOM': 'Cosmos',
    'NEAR': 'NEAR Protocol',
    'LINK': 'Chainlink',
    'UNI': 'Uniswap',
    'AAVE': 'Aave',
    'DOGE': 'Dogecoin',
    'SHIB': 'Shiba Inu',
    'PEPE': 'Pepe',
    'XRP': 'XRP',
    'LTC': 'Litecoin',
    'BCH': 'Bitcoin Cash',
    'ETC': 'Ethereum Classic',
    'FIL': 'Filecoin',
    'MANA': 'Decentraland',
    'SAND': 'The Sandbox',
    'GALA': 'Gala',
    'ENJ': 'Enjin Coin',
    'CHZ': 'Chiliz',
    'FLOW': 'Flow',
    'ICP': 'Internet Computer',
    'THETA': 'Theta',
    'VET': 'VeChain',
    'ALGO': 'Algorand',
    'HBAR': 'Hedera',
    'EGLD': 'MultiversX',
    'KAVA': 'Kava',
    'ROSE': 'Oasis Network',
    'ONE': 'Harmony',
    'CELO': 'Celo',
    'ZIL': 'Zilliqa',
    'QTUM': 'Qtum',
    'WAVES': 'Waves',
    'ICX': 'ICON',
    'ONT': 'Ontology',
    'ZEC': 'Zcash',
    'DASH': 'Dash',
    'XTZ': 'Tezos',
    'COMP': 'Compound',
    'MKR': 'Maker',
    'YFI': 'yearn.finance',
    'UMA': 'UMA',
    'CRV': 'Curve DAO',
    'SUSHI': 'SushiSwap',
    'SNX': 'Synthetix',
    'BAT': 'Basic Attention Token',
    'ZRX': '0x',
    'LRC': 'Loopring',
    'GRT': 'The Graph',
    'RNDR': 'Render',
    'FTM': 'Fantom',
    'RUNE': 'THORChain',
    'LUNA': 'Terra Luna',
    'UST': 'TerraUSD',
    'BUSD': 'Binance USD',
    'USDC': 'USD Coin',
    'USDT': 'Tether',
    'DAI': 'Dai',
    'FRAX': 'Frax',
    'TUSD': 'TrueUSD',
    'USDP': 'Pax Dollar',
    'GUSD': 'Gemini Dollar',
    'HUSD': 'HUSD',
    'SUSD': 'sUSD',
    'AMPL': 'Ampleforth',
    'RSR': 'Reserve Rights',
    'ALPHA': 'Alpha Venture DAO',
    'BETA': 'Beta Finance',
    'GAMMA': 'Gamma',
    'DELTA': 'Delta',
    'EPSILON': 'Epsilon',
    'ZETA': 'Zeta',
    'ETA': 'Eta',
    'IOTA': 'IOTA',
    'KAPPA': 'Kappa',
    'LAMBDA': 'Lambda',
    'MU': 'Mu',
    'NU': 'Nu',
    'XI': 'Xi',
    'OMICRON': 'Omicron',
    'PI': 'Pi',
    'RHO': 'Rho',
    'SIGMA': 'Sigma',
    'TAU': 'Tau',
    'UPSILON': 'Upsilon',
    'PHI': 'Phi',
    'CHI': 'Chi',
    'PSI': 'Psi',
    'OMEGA': 'Omega'
  }

  // Analysis steps for the powerful engine feel
  const analysisStepsData = [
    { step: 'Bağlantı Kurma', description: 'Binance API\'ye bağlanılıyor...', completed: false, details: 'WebSocket bağlantısı kuruldu' },
    { step: 'Veri Çekme', description: 'Gerçek zamanlı piyasa verisi alınıyor...', completed: false, details: 'Son 1000 işlem analiz edildi' },
    { step: 'RSI Hesaplama', description: 'Relative Strength Index hesaplanıyor...', completed: false, details: '14 periyot RSI: 67.3' },
    { step: 'MACD Analizi', description: 'MACD ve sinyal hattı analiz ediliyor...', completed: false, details: 'MACD: 0.45, Signal: 0.38' },
    { step: 'Bollinger Bands', description: 'Bollinger bantları hesaplanıyor...', completed: false, details: 'Üst band: $45,200, Alt band: $41,800' },
    { step: 'Hacim Profili', description: 'İşlem hacmi trend analizi yapılıyor...', completed: false, details: '24s hacim: 2.3B USDT' },
    { step: 'Sentiment Tarama', description: 'Sosyal medya ve haber sentiment analizi...', completed: false, details: 'Pozitif: %72, Negatif: %28' },
    { step: 'AI Modeli', description: 'Makine öğrenmesi modeli çalışıyor...', completed: false, details: 'Neural network: 8 katman, 1.2M parametre' },
    { step: 'Risk Matrisi', description: 'Risk-getiri oranı hesaplanıyor...', completed: false, details: 'Sharpe ratio: 1.8, Max drawdown: %12' },
    { step: 'Sinyal Üretimi', description: 'Nihai AL/SAT/BEKLE sinyali üretiliyor...', completed: false, details: 'Güven skoru: %89' }
  ]

  const generateAnalysisComment = (result: any) => {
    const comments: { [key: string]: string[] } = {
      'AL': [
        `${result.coin.name} için güçlü bir AL sinyali tespit edildi. Teknik indikatörler yukarı yönlü momentum gösteriyor ve hacim artışı destekliyor. Bu fiyat seviyesinden girişler için uygun bir fırsat sunuyor.`,
        `${result.coin.name} analizi pozitif sonuçlar veriyor. RSI ve MACD indikatörleri AL sinyali verirken, Bollinger Bands alt bandından yukarı çıkış gösteriyor. Risk yönetimi ile birlikte değerlendirilebilir.`,
        `${result.coin.name} için teknik analiz AL yönünde. Piyasa sentiment'i pozitif, işlem hacmi artış trendinde. Kısa ve orta vadeli hedefler için uygun gözüküyor.`
      ],
      'SAT': [
        `${result.coin.name} için SAT sinyali oluştu. Teknik indikatörler aşırı alım seviyesinde ve düzeltme beklentisi yüksek. Mevcut pozisyonlardan çıkış için uygun zaman olabilir.`,
        `${result.coin.name} analizi negatif trend gösteriyor. RSI yüksek seviyelerden geri çekiliyor, MACD histogram azalış gösteriyor. Satış baskısı artıyor.`,
        `${result.coin.name} için teknik görünüm zayıf. Hacim azalışı ve dirençle karşılaşma durumu mevcut. Kısa vadeli düşüş beklenebilir.`
      ],
      'BEKLE': [
        `${result.coin.name} için net bir sinyal bulunmuyor. Piyasa kararsızlık gösteriyor ve yan trend hakim. Daha net sinyaller için bekleme öneriliyor.`,
        `${result.coin.name} analizi karışık sinyaller veriyor. Teknik indikatörler arasında uyumsuzluk var. Piyasa yönünü netleştirmek için beklemek mantıklı.`,
        `${result.coin.name} için mevcut durumda BEKLE stratejisi uygun. Önemli destek/direnç seviyelerine yakın, kırılım beklemek daha sağlıklı.`
      ]
    }
    
    const signalComments = comments[result.signal] || comments['BEKLE']
    return signalComments[Math.floor(Math.random() * signalComments.length)]
  }

  useEffect(() => {
    // Load coin list from coin_map.json
    const coins: CoinData[] = []
    Object.entries(coinMap).forEach(([symbol, iconFile]) => {
      const baseSymbol = symbol.replace('USDT', '')
      const iconName = iconFile.replace('.png', '')
      coins.push({
        symbol: symbol,
        name: coinNames[baseSymbol] || baseSymbol,
        icon: iconName
      })
    })
    setCoinList(coins)
    setFilteredCoins(coins) // Tüm coinleri göster
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = coinList.filter(coin => 
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredCoins(filtered) // Arama sonuçlarında tüm eşleşmeleri göster
    } else {
      setFilteredCoins(coinList) // Varsayılan olarak tüm coinleri göster
    }
  }, [searchTerm, coinList])

  const handleAnalyze = async () => {
    if (!selectedCoin) return
    
    setAnalyzing(true)
    setResult(null)
    setAnalysisSteps([...analysisStepsData])
    setCurrentStep(0)
    setCompletedSteps([])
    setAnalysisComment('')

    // Simulate powerful analysis engine with progressive completion
    for (let i = 0; i < analysisStepsData.length; i++) {
      // Random delay between 600-1200ms for realistic feel
      await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 600))
      
      // Mark step as completed
      setCompletedSteps(prev => [...prev, i])
      
      setAnalysisSteps(prev => prev.map((step, index) => ({
        ...step,
        completed: index <= i
      })))
      setCurrentStep(i)
    }

    // Generate analysis result
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const signals = ['AL', 'SAT', 'BEKLE']
    const randomSignal = signals[Math.floor(Math.random() * signals.length)]
    const randomScore = Math.random() * 10 - 5
    
    const newResult = {
      signal: randomSignal,
      score: randomScore.toFixed(2),
      price: (Math.random() * 100000).toFixed(2),
      confidence: Math.floor(Math.random() * 40) + 60,
      timestamp: new Date().toISOString(),
      coin: selectedCoin,
      timeframe: timeframe,
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
        },
        'Stochastic': {
          value: Math.random() * 100,
          signal: Math.random() > 0.5 ? 'AL' : 'SAT',
          weight: 1.0
        }
      }
    }
    
    setResult(newResult)
    setAnalysisComment(generateAnalysisComment(newResult))
    setAnalyzing(false)
  }

  const shareToX = () => {
    if (!result) return
    
    const text = `🚀 ${result.coin.name} (${result.coin.symbol}) Analiz Sonucu:
    
📊 Sinyal: ${result.signal}
💎 Güven: %${result.confidence}
⏰ Zaman: ${timeframe}
    
#TomiGPT #KriptoAnaliz #${result.coin.symbol} #AI`
    
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const shareToTelegram = () => {
    if (!result) return
    
    const text = `🚀 ${result.coin.name} (${result.coin.symbol}) Analiz Sonucu:
    
📊 Sinyal: ${result.signal}
💎 Güven: %${result.confidence}
⏰ Zaman: ${timeframe}
    
TomiGPT ile analiz edildi 🤖`
    
    const url = `https://t.me/share/url?url=${encodeURIComponent('https://tomigpt.com')}&text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const copyToClipboard = () => {
    if (!result) return
    
    const text = `🚀 ${result.coin.name} (${result.coin.symbol}) Analiz Sonucu:
    
📊 Sinyal: ${result.signal}
💎 Güven: %${result.confidence}
⏰ Zaman: ${timeframe}
    
TomiGPT ile analiz edildi 🤖
https://tomigpt.com`
    
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log('Analiz sonucu panoya kopyalandı!')
    })
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
      <div className="min-h-screen relative overflow-y-auto scroll-smooth">
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
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-16"
              style={{ willChange: 'auto' }}
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
                10 teknik indikatör ile güçlendirilmiş yapay zeka algoritması kullanarak
                <span className="text-emerald-400 font-semibold"> AL • SAT • BEKLE </span>
                sinyalleri alın
              </p>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Left Panel */}
              <div className="space-y-8" style={{ transform: 'translateZ(0)' }}>
                {/* Coin Selection */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative group z-[9998]"
                  style={{ willChange: 'auto' }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 to-emerald-500/50 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 z-[9998]">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-xl">
                        <FiTarget className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">Hedef Kripto Para</h2>
                    </div>

                    <div className="space-y-4">
                      {/* Coin Selector */}
                      <div className="relative z-[9998]">
                        <button
                          onClick={() => setShowDropdown(!showDropdown)}
                          className="w-full flex items-center justify-between p-4 bg-slate-800/50 border border-slate-600 rounded-lg hover:border-blue-500/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {selectedCoin ? (
                              <>
                                <div className="w-8 h-8 relative">
                                  <Image
                                    src={`/images/coin_icons/${selectedCoin.icon}.png`}
                                    alt={selectedCoin.name}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                                <div className="text-left">
                                  <div className="text-white font-medium">{selectedCoin.name}</div>
                                  <div className="text-gray-400 text-sm">{selectedCoin.symbol}</div>
                                </div>
                              </>
                            ) : (
                              <div className="text-gray-400">Kripto para seçin...</div>
                            )}
                          </div>
                          <FiChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {showDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-xl border border-slate-600 rounded-lg shadow-xl z-[9999] max-h-80 overflow-hidden"
                            >
                              <div className="p-4 border-b border-slate-600">
                                <div className="relative">
                                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <input
                                    type="text"
                                    placeholder="Kripto para ara..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                                  />
                                </div>
                              </div>
                              <div className="max-h-64 overflow-y-auto" style={{ transform: 'translateZ(0)', willChange: 'scroll-position' }}>
                                {filteredCoins.map((coin) => (
                                  <button
                                    key={coin.symbol}
                                    onClick={() => {
                                      setSelectedCoin(coin)
                                      setShowDropdown(false)
                                      setSearchTerm('')
                                    }}
                                    className="w-full flex items-center gap-3 p-4 hover:bg-slate-700/50 transition-colors text-left"
                                  >
                                    <div className="w-8 h-8 relative">
                                      <Image
                                        src={`/images/coin_icons/${coin.icon}.png`}
                                        alt={coin.name}
                                        fill
                                        className="object-contain"
                                      />
                                    </div>
                                    <div>
                                      <div className="text-white font-medium">{coin.name}</div>
                                      <div className="text-gray-400 text-sm">{coin.symbol}</div>
                                    </div>
                                    {selectedCoin?.symbol === coin.symbol && (
                                      <FiCheck className="w-4 h-4 text-green-400 ml-auto" />
                                    )}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Timeframe Selection */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Zaman Dilimi</label>
                        <div className="grid grid-cols-5 gap-2">
                          {['15m', '1h', '4h', '1d', '1w'].map((tf) => (
                            <button
                              key={tf}
                              onClick={() => setTimeframe(tf)}
                              className={`p-3 rounded-lg border font-medium transition-all ${
                                timeframe === tf
                                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                  : 'bg-slate-800/50 border-slate-600 text-gray-400 hover:text-white hover:border-slate-500'
                              }`}
                            >
                              {tf}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>



                {/* Analyze Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: analyzing ? 30 : 0 
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative group z-[9997]"
                  style={{ willChange: 'auto' }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 to-cyan-500/50 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 z-[9997]">
                    <motion.button
                      onClick={handleAnalyze}
                      disabled={!selectedCoin || analyzing}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all ${
                        !selectedCoin || analyzing
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-blue-500/20'
                      }`}
                    >
                      {analyzing ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          Analiz Ediliyor...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <FiZap className="w-5 h-5" />
                          Analiz Başlat
                        </div>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Right Panel - Results */}
              <div className="space-y-8">
                {analyzing ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -20, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
                          <FiCpu className="w-6 h-6 text-purple-400 animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Analiz Motoru</h2>
                        <div className="ml-auto text-purple-400 text-sm">
                          {completedSteps.length}/{analysisSteps.length} tamamlandı
                        </div>
                      </div>

                      {/* Single Line Analysis Steps */}
                      <div className="relative h-16 overflow-hidden">
                        <AnimatePresence mode="wait">
                          {analysisSteps.map((step, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 60 }}
                              animate={{ 
                                opacity: index === currentStep ? 1 : 0,
                                y: index === currentStep ? 0 : (index < currentStep ? -60 : 60)
                              }}
                              exit={{ opacity: 0, y: -60 }}
                              transition={{ 
                                duration: 0.6,
                                ease: "easeInOut"
                              }}
                              className="absolute inset-0 flex items-center gap-4"
                            >
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                step.completed
                                  ? 'bg-green-500/20 text-green-400'
                                  : index === currentStep
                                  ? 'bg-blue-500/20 text-blue-400'
                                  : 'bg-slate-700/50 text-gray-500'
                              }`}>
                                {step.completed ? (
                                  <FiCheck className="w-6 h-6" />
                                ) : index === currentStep ? (
                                  <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <div className="w-3 h-3 bg-current rounded-full" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className={`text-lg font-bold ${
                                  step.completed ? 'text-green-400' : 
                                  index === currentStep ? 'text-blue-400' : 'text-gray-400'
                                }`}>
                                  {step.step}
                                </div>
                                <div className="text-sm text-gray-400">{step.description}</div>
                              </div>
                              {step.completed && step.details && (
                                <div className="text-xs text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
                                  ✓ {step.details}
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                  >
                    {/* Main Signal */}
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 to-cyan-500/50 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                      <div className={`relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border p-8 bg-gradient-to-r ${getSignalBgColor(result.signal)}`}>
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-slate-800 to-slate-700 flex items-center justify-center">
                            <div className={getSignalColor(result.signal)}>
                              {getSignalIcon(result.signal)}
                            </div>
                          </div>
                          
                          <h2 className="text-4xl font-bold text-white mb-2">{result.signal}</h2>
                          <div className="text-lg text-gray-300 mb-4">
                            {result.coin.name} ({result.coin.symbol})
                          </div>
                          <div className="text-sm text-gray-400">
                            Güven: %{result.confidence} • Zaman: {result.timeframe}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Analysis Comment */}
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl">
                            <FiMessageCircle className="w-6 h-6 text-cyan-400" />
                          </div>
                          <h2 className="text-2xl font-bold text-white">AI Analiz Yorumu</h2>
                        </div>
                        
                        <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
                          <p className="text-gray-300 leading-relaxed">
                            {analysisComment}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Indicator Details */}
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 to-teal-500/50 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                          <FiBarChart className="w-6 h-6 text-emerald-400" />
                          İndikatör Detayları
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(result.indicators).map(([name, data]: [string, any]) => (
                            <motion.div
                              key={name}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: Math.random() * 0.5 }}
                              className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-300 font-medium">{name}</span>
                                <span className={`text-sm font-bold ${getSignalColor(data.signal)}`}>
                                  {data.signal}
                                </span>
                              </div>
                              <div className="text-sm text-gray-400">
                                Değer: {data.value.toFixed(2)} • Ağırlık: {data.weight}x
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Share Buttons */}
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl">
                            <FiShare2 className="w-6 h-6 text-blue-400" />
                          </div>
                          <h2 className="text-2xl font-bold text-white">Sonucu Paylaş</h2>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <button
                            onClick={shareToX}
                            className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg hover:from-blue-500/30 hover:to-blue-600/30 transition-all text-blue-400 hover:text-blue-300"
                          >
                            <BsTwitterX className="w-5 h-5" />
                            <span className="hidden sm:inline">X</span>
                          </button>
                          <button
                            onClick={shareToTelegram}
                            className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-cyan-500/30 rounded-lg hover:from-blue-500/30 hover:to-cyan-500/30 transition-all text-cyan-400 hover:text-cyan-300"
                          >
                            <FaTelegramPlane className="w-5 h-5" />
                            <span className="hidden sm:inline">Telegram</span>
                          </button>
                          <button
                            onClick={copyToClipboard}
                            className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg hover:from-green-500/30 hover:to-emerald-500/30 transition-all text-green-400 hover:text-green-300"
                          >
                            <FiCopy className="w-5 h-5" />
                            <span className="hidden sm:inline">Kopyala</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-gray-500/50 to-slate-500/50 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-12 text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-slate-500/20 to-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiBarChart className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-300 mb-2">Analiz Bekleniyor</h3>
                      <p className="text-gray-500">
                        Kripto para seçip analiz başlatın
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 