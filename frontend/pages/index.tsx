import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTrendingUp, 
  FiClock, 
  FiBarChart, 
  FiShare2, 
  FiBookmark, 
  FiDownload,
  FiZap,
  FiTarget,
  FiShield,
  FiActivity,
  FiTrendingDown,
  FiChevronDown,
  FiCheck,
  FiLoader
} from 'react-icons/fi';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import coinMap from '../public/images/coin_icons/coin_map.json';
import Image from 'next/image';

// Convert coin_map.json to usable coin data with mock prices
const generateCoinData = () => {
  const coinEntries = Object.entries(coinMap);
  const mockPrices = [
    { price: '₺734.250', change: '+%2.34', volume: '₺56.7M' },
    { price: '₺87.432', change: '+%1.87', volume: '₺32.4M' },
    { price: '₺15.678', change: '+%0.94', volume: '₺12.3M' },
    { price: '₺18.052', change: '+%3.21', volume: '₺6.3M' },
    { price: '₺3.852', change: '+%5.67', volume: '₺21.3M' },
    { price: '₺212.60', change: '+%2.11', volume: '₺8.3M' },
    { price: '₺930.15', change: '+%1.45', volume: '₺9.3M' },
    { price: '₺33.12', change: '+%0.87', volume: '₺15.3M' },
    { price: '₺332.15', change: '+%2.98', volume: '₺6.3M' },
    { price: '₺152.60', change: '+%1.23', volume: '₺3.3M' },
    { price: '₺45.78', change: '--%1.45', volume: '₺7.2M' },
    { price: '₺89.42', change: '+%0.65', volume: '₺4.8M' },
  ];

  return coinEntries.slice(0, 50).map(([symbol, iconFile], index) => {
    const coinSymbol = symbol.replace('USDT', '');
    const mockData = mockPrices[index % mockPrices.length];
    
    return {
      symbol: `${coinSymbol}/USDT`,
      name: coinSymbol,
      price: mockData.price,
      change: mockData.change,
      volume: mockData.volume,
      icon: iconFile
    };
  });
};

const COINS = generateCoinData();

const TIMEFRAMES = [
  { value: '1S', label: '1 Saat', active: false },
  { value: '4S', label: '4 Saat', active: true },
  { value: '1G', label: '1 Gün', active: false },
  { value: '1H', label: '1 Hafta', active: false },
];

const ANALYSIS_STEPS = [
  'Fiyat verileri alınıyor...',
  'Teknik indikatörler hesaplanıyor...',
  'Piyasa duyarlılığı analizi yapılıyor...',
  'Hacim analizi gerçekleştiriliyor...',
  'Yapay zeka hesaplaması yapılıyor...',
  'Risk analizi tamamlanıyor...',
  'Sonuçlar hazırlanıyor...',
];

interface AnalysisResult {
  signal: 'AL' | 'SAT' | 'BEKLE';
  confidence: number;
  currentPrice: number;
  targetPrices: {
    target1: { price: number; percentage: number };
    target2: { price: number; percentage: number };
    target3: { price: number; percentage: number };
  };
  stopLoss: { price: number; percentage: number };
  aiCommentary: string;
  technicalIndicators: {
    rsi: number;
    macd: number;
    ema: number;
    bollinger: string;
    volume: string;
  };
  timestamp: string;
}

export default function AdvancedAnalysis() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCoin, setSelectedCoin] = useState('BTC/USDT');
  const [selectedTimeframe, setSelectedTimeframe] = useState('4S');
  const [includeVolume, setIncludeVolume] = useState(true);
  const [marketSentiment, setMarketSentiment] = useState(true);
  const [newsImpact, setNewsImpact] = useState(false);
  const [showCoinDropdown, setShowCoinDropdown] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [coinSearchTerm, setCoinSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    getUser();
  }, []);

  const handleAnalyze = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    setIsAnalyzing(true);
    setCurrentStep(0);
    setResult(null);

    // Simulate analysis steps
    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
      setCurrentStep(i + 1);
    }

    // Generate mock result
    const mockResult: AnalysisResult = {
      signal: Math.random() > 0.6 ? 'AL' : Math.random() > 0.3 ? 'SAT' : 'BEKLE',
      confidence: Math.floor(Math.random() * 30) + 70,
      currentPrice: 734250,
      targetPrices: {
        target1: { price: 765800, percentage: 4.29 },
        target2: { price: 788500, percentage: 7.40 },
        target3: { price: 825600, percentage: 12.46 },
      },
      stopLoss: { price: 704500, percentage: -4.05 },
      aiCommentary: `${selectedCoin} güçlü bir yükseliş momentumu gösteriyor ve 730.000₺ seviyesindeki kritik direnç seviyesini aştıktan sonra. 4 saatlik grafik, RSI indikatörü ile net bir yükseliş sapması gösteriyor.\n\nHacim analizi artan alım baskısını doğruluyor ve MACD histogramı pozitif momentum gösteriyor. 50 EMA, 200 EMA'nın üzerine geçerek altın haç formasyonu oluşturuyor. Genel piyasa koşulları da destekleyici görünüyor.`,
      technicalIndicators: {
        rsi: Math.floor(Math.random() * 40) + 30,
        macd: Math.random() * 2 - 1,
        ema: Math.random() * 100,
        bollinger: 'Üst Bant',
        volume: 'Artış',
      },
      timestamp: new Date().toLocaleString('tr-TR'),
    };

    setResult(mockResult);
    setIsAnalyzing(false);
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'AL': return 'text-green-400';
      case 'SAT': return 'text-red-400';
      case 'BEKLE': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getSignalBg = (signal: string) => {
    switch (signal) {
      case 'AL': return 'bg-green-500/20 border-green-500/30';
      case 'SAT': return 'bg-red-500/20 border-red-500/30';
      case 'BEKLE': return 'bg-yellow-500/20 border-yellow-500/30';
      default: return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  // Filter coins based on search term
  const filteredCoins = COINS.filter(coin => 
    coin.symbol.toLowerCase().includes(coinSearchTerm.toLowerCase()) ||
    coin.name.toLowerCase().includes(coinSearchTerm.toLowerCase())
  );

  const selectedCoinData = COINS.find(c => c.symbol === selectedCoin) || COINS[0];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Panel - Analysis Parameters */}
          <div className="xl:col-span-1">
            <div className="glass-card p-6 rounded-xl h-fit">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Analiz Parametreleri
              </h2>

              {/* Coin Pair Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Kripto Para Çifti
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowCoinDropdown(!showCoinDropdown)}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white text-left flex items-center justify-between hover:bg-white/15 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-slate-700">
                        {selectedCoinData?.icon ? (
                          <Image
                            src={`/images/coin_icons/${selectedCoinData.icon}`}
                            alt={selectedCoinData.name}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white font-bold text-sm">₿</span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{selectedCoin}</div>
                        <div className="text-xs text-gray-400">{selectedCoinData?.price} {selectedCoinData?.change}</div>
                      </div>
                    </div>
                    <FiChevronDown className={`w-5 h-5 transition-transform ${showCoinDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {showCoinDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-sm border border-white/20 rounded-lg z-10 overflow-hidden"
                      >
                        {/* Search Input */}
                        <div className="p-3 border-b border-white/10">
                          <input
                            type="text"
                            placeholder="Kripto para ara..."
                            value={coinSearchTerm}
                            onChange={(e) => setCoinSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                          />
                        </div>
                        
                        {/* Coins List */}
                        <div className="max-h-60 overflow-y-auto">
                          {filteredCoins.map((coin) => (
                            <button
                              key={coin.symbol}
                              onClick={() => {
                                setSelectedCoin(coin.symbol);
                                setShowCoinDropdown(false);
                                setCoinSearchTerm('');
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center space-x-3"
                            >
                              <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-slate-700 flex-shrink-0">
                                {coin.icon ? (
                                  <Image
                                    src={`/images/coin_icons/${coin.icon}`}
                                    alt={coin.name}
                                    width={24}
                                    height={24}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <span className="text-white font-bold text-xs">₿</span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-white font-medium truncate">{coin.symbol}</div>
                                <div className="text-xs text-gray-400 truncate">{coin.name}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-white">{coin.price}</div>
                                <div className={`text-xs ${coin.change.startsWith('+') ? 'text-green-400' : coin.change.startsWith('-') ? 'text-red-400' : 'text-gray-400'}`}>
                                  {coin.change}
                                </div>
                              </div>
                              {selectedCoin === coin.symbol && (
                                <FiCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                              )}
                            </button>
                          ))}
                          {filteredCoins.length === 0 && (
                            <div className="px-4 py-8 text-center text-gray-400">
                              Aradığınız kripto para bulunamadı
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Time Interval */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Zaman Aralığı
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {TIMEFRAMES.map((timeframe) => (
                    <button
                      key={timeframe.value}
                      onClick={() => setSelectedTimeframe(timeframe.value)}
                      className={`px-3 py-3 rounded-lg border transition-all duration-200 text-sm font-medium ${
                        selectedTimeframe === timeframe.value
                          ? 'bg-green-500/20 border-green-500/50 text-green-400'
                          : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/15'
                      }`}
                    >
                      {timeframe.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Options */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Gelişmiş Seçenekler
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FiActivity className="w-5 h-5 text-blue-400" />
                      <span className="text-white">Hacim Analizi Dahil Et</span>
                    </div>
                    <button
                      onClick={() => setIncludeVolume(!includeVolume)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        includeVolume ? 'bg-green-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                        includeVolume ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FiTrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-white">Piyasa Duyarlılığı</span>
                    </div>
                    <button
                      onClick={() => setMarketSentiment(!marketSentiment)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        marketSentiment ? 'bg-green-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                        marketSentiment ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FiZap className="w-5 h-5 text-yellow-400" />
                      <span className="text-white">Haber Etkisi</span>
                    </div>
                    <button
                      onClick={() => setNewsImpact(!newsImpact)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        newsImpact ? 'bg-green-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                        newsImpact ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Run Analysis Button */}
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full glass-button bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <FiLoader className="w-5 h-5 animate-spin" />
                    Analiz Yapılıyor
                  </>
                ) : (
                  <>
                    <FiZap className="w-5 h-5" />
                    Analiz Yap
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Panel - Analysis Result */}
          <div className="xl:col-span-2">
            <div className="glass-card p-6 rounded-xl min-h-[600px]">
              {!isAnalyzing && !result && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <FiBarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Analiz İçin Hazır
                    </h3>
                    <p className="text-gray-400">
                      Parametrelerinizi ayarlayın ve analiz yapın
                    </p>
                  </div>
                </div>
              )}

              {isAnalyzing && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-white">
                      {selectedCoin} Analizi
                    </h2>
                    <div className="text-sm text-gray-400">
                      {selectedTimeframe.replace('S', ' Saat').replace('G', ' Gün').replace('H', ' Hafta')} • {new Date().toLocaleString('tr-TR')}
                    </div>
                  </div>

                  {/* Progress Steps */}
                  <div className="space-y-4">
                    {ANALYSIS_STEPS.map((step, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          index < currentStep 
                            ? 'bg-green-500 text-white' 
                            : index === currentStep 
                              ? 'bg-blue-500 text-white animate-pulse' 
                              : 'bg-gray-600 text-gray-400'
                        }`}>
                          {index < currentStep ? (
                            <FiCheck className="w-3 h-3" />
                          ) : index === currentStep ? (
                            <FiLoader className="w-3 h-3 animate-spin" />
                          ) : (
                            <span className="text-xs">{index + 1}</span>
                          )}
                        </div>
                        <span className={`text-sm ${
                          index <= currentStep ? 'text-white' : 'text-gray-400'
                        }`}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(currentStep / ANALYSIS_STEPS.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-white">
                        {selectedCoin} Analizi
                      </h2>
                      <p className="text-gray-400 text-sm">
                        {selectedTimeframe.replace('S', ' Saat').replace('G', ' Gün').replace('H', ' Hafta')} • {result.timestamp}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 glass-card hover:bg-white/10 rounded-lg transition-colors">
                        <FiShare2 className="w-5 h-5 text-gray-400" />
                      </button>
                      <button className="p-2 glass-card hover:bg-white/10 rounded-lg transition-colors">
                        <FiBookmark className="w-5 h-5 text-gray-400" />
                      </button>
                      <button className="p-2 glass-card hover:bg-white/10 rounded-lg transition-colors">
                        <FiDownload className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Main Signal */}
                  <div className="text-center">
                    <div className={`inline-block px-12 py-6 rounded-2xl border-2 ${getSignalBg(result.signal)}`}>
                      <div className={`text-5xl font-bold ${getSignalColor(result.signal)} mb-2`}>
                        {result.signal}
                      </div>
                      <div className="text-gray-300 text-sm">
                        Güven: %{result.confidence}
                      </div>
                    </div>
                  </div>

                  {/* Target Prices */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="glass-card p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Hedef Fiyat 1</div>
                      <div className="text-green-400 font-bold text-lg">
                        ₺{result.targetPrices.target1.price.toLocaleString('tr-TR')}
                      </div>
                      <div className="text-green-400 text-sm">
                        +%{result.targetPrices.target1.percentage.toFixed(1)}
                      </div>
                    </div>
                    <div className="glass-card p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Hedef Fiyat 2</div>
                      <div className="text-green-400 font-bold text-lg">
                        ₺{result.targetPrices.target2.price.toLocaleString('tr-TR')}
                      </div>
                      <div className="text-green-400 text-sm">
                        +%{result.targetPrices.target2.percentage.toFixed(1)}
                      </div>
                    </div>
                    <div className="glass-card p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Hedef Fiyat 3</div>
                      <div className="text-green-400 font-bold text-lg">
                        ₺{result.targetPrices.target3.price.toLocaleString('tr-TR')}
                      </div>
                      <div className="text-green-400 text-sm">
                        +%{result.targetPrices.target3.percentage.toFixed(1)}
                      </div>
                    </div>
                    <div className="glass-card p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Zarar Durdur</div>
                      <div className="text-red-400 font-bold text-lg">
                        ₺{result.stopLoss.price.toLocaleString('tr-TR')}
                      </div>
                      <div className="text-red-400 text-sm">
                        %{result.stopLoss.percentage.toFixed(1)}
                      </div>
                    </div>
                  </div>

                  {/* AI Commentary */}
                  <div className="glass-card p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <FiZap className="text-blue-400" />
                      AI Yorumu
                    </h3>
                    <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {result.aiCommentary}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 