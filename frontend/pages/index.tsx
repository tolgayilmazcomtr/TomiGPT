import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTrendingUp, 
  FiTrendingDown,
  FiClock, 
  FiBarChart, 
  FiZap,
  FiActivity,
  FiDollarSign,
  FiPieChart,
  FiUsers,
  FiArrowRight,
  FiStar,
  FiAward,
  FiTarget,
  FiShield,
  FiCreditCard,
  FiUser,
  FiSettings,
  FiEye,
  FiPlayCircle,
  FiGlobe,
  FiChevronUp,
  FiChevronDown,
  FiLayers,
  FiDatabase,
  FiWifi,
  FiCpu,
  FiRefreshCw,
  FiHexagon,
  FiArrowUpCircle,
  FiArrowDownCircle,
  FiCircle,
  FiX,
  FiInfo,
  FiDollarSign as FiDollar,
  FiActivity as FiActivityIcon,
  FiDatabase as FiDatabaseIcon,
  FiTrendingUp as FiTrendUp
} from 'react-icons/fi';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import Image from 'next/image';
import coinMap from '../public/images/coin_icons/coin_map.json';

// Language System
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  tr: {
    // Hero Section
    heroTitle: 'TomiGPT',
    heroSubtitle: 'Yapay zeka destekli kripto analiz platformu ile piyasanın nabzını tutun',
    heroDescription: 'Profesyonel analizler • Gerçek zamanlı veriler • Akıllı sinyaller',
    liveData: 'Canlı Veriler',
    aiPowered: 'AI Destekli',
    proAnalysis: 'Pro Analizler',
    
    // Market Overview
    totalMarketCap: 'Toplam Piyasa Değeri',
    totalVolume: '24 Saatlik Hacim',
    btcDominance: 'BTC Hakimiyeti',
    activeCryptos: 'Aktif Kriptolar',
    marketCapDesc: 'Tüm kripto paraların toplam piyasa değeri. Coin sayısı x mevcut fiyat ile hesaplanır.',
    marketCapDetail: 'Bu değer kripto piyasasının genel büyüklüğünü gösterir ve yatırımcı ilgisinin bir göstergesidir.',
    volumeDesc: 'Son 24 saatte gerçekleşen toplam işlem hacmi.',
    volumeDetail: 'Yüksek hacim piyasanın aktif olduğunu ve likiditenin yüksek olduğunu gösterir.',
    dominanceDesc: 'Bitcoin\'in toplam kripto piyasasına oranı.',
    dominanceDetail: 'Yüksek BTC hakimiyeti altcoin sezonunun bitmekte olduğunu gösterebilir.',
    activeDesc: 'Piyasada aktif olarak işlem gören kripto para sayısı.',
    activeDetail: 'Bu sayı kripto ekosisteminin çeşitliliğini ve büyümesini gösterir.',
    
    // User Profile
    welcomeTitle: 'TomiGPT\'ye Hoş Geldiniz',
    welcomeDesc: 'Yapay zeka destekli kripto analiz platformumuzda profesyonel analizler yapın ve piyasanın nabzını tutun',
    login: 'Giriş Yap',
    register: 'Kayıt Ol',
    proMember: 'Pro Üye',
    active: 'Aktif',
    lastAnalysis: 'Son Analiz',
    minutesAgo: 'dakika önce',
    
    // Trending Coins
    trendingCoins: 'Trend Coinler',
    live: 'Canlı',
    viewAll: 'Tümünü Gör',
    
    // Market Pulse
    marketPulse: 'Piyasa Nabzı',
    marketSentiment: 'Piyasa Duyarlılığı',
    generalSentiment: 'Genel Duyarlılık',
    lastUpdated: 'Son güncelleme',
    
    // Top Movers
    topGainers: 'En Çok Yükselenler',
    topLosers: 'En Çok Düşenler',
    
    // Recent Signals
    recentSignals: 'Geçmiş Sinyaller',
    lastSignals: 'Son 5 Sinyal',
    buy: 'AL',
    sell: 'SAT',
    hold: 'BEKLE',
    high: 'Yüksek',
    medium: 'Orta',
    low: 'Düşük',
    successRate: 'Başarı Oranı',
    activeSignals: 'Aktif Sinyal',
    averageProfit: 'Ortalama Kar',
    
    // Sentiments
    extremelyPositive: 'Aşırı Olumlu',
    positive: 'Olumlu',
    neutral: 'Nötr',
    negative: 'Olumsuz',
    extremelyNegative: 'Aşırı Olumsuz',
    
    // Quick Actions
    quickActions: 'Hızlı Eylemler',
    startAnalysis: 'Analiz Başlat',
    aiAnalysis: 'AI Analiz',
    portfolio: 'Portföy',
    signals: 'Sinyaller',
    settings: 'Ayarlar',
    premium: 'Premium',
    pro: 'PRO'
  },
  en: {
    // Hero Section
    heroTitle: 'TomiGPT',
    heroSubtitle: 'Keep your finger on the pulse of the market with AI-powered crypto analysis platform',
    heroDescription: 'Professional Analysis • Real-time Data • Smart Signals',
    liveData: 'Live Data',
    aiPowered: 'AI Powered',
    proAnalysis: 'Pro Analysis',
    
    // Market Overview
    totalMarketCap: 'Total Market Cap',
    totalVolume: '24h Volume',
    btcDominance: 'BTC Dominance',
    activeCryptos: 'Active Cryptos',
    marketCapDesc: 'Total market value of all cryptocurrencies. Calculated as coin count x current price.',
    marketCapDetail: 'This value shows the overall size of the crypto market and is an indicator of investor interest.',
    volumeDesc: 'Total trading volume in the last 24 hours.',
    volumeDetail: 'High volume indicates that the market is active and liquidity is high.',
    dominanceDesc: 'Bitcoin\'s ratio to the total crypto market.',
    dominanceDetail: 'High BTC dominance may indicate that the altcoin season is ending.',
    activeDesc: 'Number of cryptocurrencies actively trading in the market.',
    activeDetail: 'This number shows the diversity and growth of the crypto ecosystem.',
    
    // User Profile
    welcomeTitle: 'Welcome to TomiGPT',
    welcomeDesc: 'Perform professional analysis on our AI-powered crypto analysis platform and keep your finger on the pulse of the market',
    login: 'Login',
    register: 'Register',
    proMember: 'Pro Member',
    active: 'Active',
    lastAnalysis: 'Last Analysis',
    minutesAgo: 'minutes ago',
    
    // Trending Coins
    trendingCoins: 'Trending Coins',
    live: 'Live',
    viewAll: 'View All',
    
    // Market Pulse
    marketPulse: 'Market Pulse',
    marketSentiment: 'Market Sentiment',
    generalSentiment: 'General Sentiment',
    lastUpdated: 'Last updated',
    
    // Top Movers
    topGainers: 'Top Gainers',
    topLosers: 'Top Losers',
    
    // Recent Signals
    recentSignals: 'Recent Signals',
    lastSignals: 'Last 5 Signals',
    buy: 'BUY',
    sell: 'SELL',
    hold: 'HOLD',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    successRate: 'Success Rate',
    activeSignals: 'Active Signals',
    averageProfit: 'Average Profit',
    
    // Sentiments
    extremelyPositive: 'Extremely Positive',
    positive: 'Positive',
    neutral: 'Neutral',
    negative: 'Negative',
    extremelyNegative: 'Extremely Negative',
    
    // Quick Actions
    quickActions: 'Quick Actions',
    startAnalysis: 'Start Analysis',
    aiAnalysis: 'AI Analysis',
    portfolio: 'Portfolio',
    signals: 'Signals',
    settings: 'Settings',
    premium: 'Premium',
    pro: 'PRO'
  }
};

// Types
interface GlobalMarketData {
  totalMarketCap: string;
  totalVolume: string;
  marketCapChange: string;
  volumeChange: string;
  btcDominance: string;
  ethDominance: string;
  activeCryptos: string;
  totalSupply: string;
  loading: boolean;
}

interface TrendingCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

interface MarketPulse {
  sentiment: string;
  fearGreedIndex: number;
  fearGreedText: string;
  lastUpdated: string;
  loading: boolean;
}

interface TopMover {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: number;
  volume: string;
  marketCap: string;
  icon?: string;
}

interface PortfolioStats {
  totalValue: string;
  totalGain: string;
  totalGainPercent: number;
  bestPerformer: string;
  worstPerformer: string;
}

// Advanced Fear & Greed Gauge with 3D Effect
const AdvancedFearGreedGauge = ({ value, text, language }: { value: number; text: string; language: string }) => {
  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  const getGaugeColor = (val: number) => {
    if (val <= 25) return { main: '#EF4444', glow: '#DC2626' };
    if (val <= 39) return { main: '#F97316', glow: '#EA580C' };
    if (val <= 59) return { main: '#EAB308', glow: '#D97706' };
    if (val <= 74) return { main: '#F97316', glow: '#EA580C' };
    return { main: '#EF4444', glow: '#DC2626' };
  };

  const getTextColor = (val: number) => {
    if (val <= 25) return 'text-red-400';
    if (val <= 39) return 'text-orange-400';
    if (val <= 59) return 'text-yellow-400';
    if (val <= 74) return 'text-orange-400';
    return 'text-red-400';
  };

  const colors = getGaugeColor(value);

  return (
    <div className="relative flex justify-center items-center">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-48 h-48 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative flex flex-col items-center space-y-4 p-8">
        <div className="relative w-44 h-44 flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full shadow-2xl"></div>
          <div className="absolute inset-2 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full shadow-inner"></div>
          <svg
            height={radius * 2}
            width={radius * 2}
            className="absolute transform -rotate-90"
            style={{ filter: `drop-shadow(0 0 20px ${colors.glow}40)` }}
          >
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: colors.main, stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: colors.glow, stopOpacity: 0.8 }} />
              </linearGradient>
            </defs>
            <circle
              stroke="rgba(255, 255, 255, 0.1)"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="url(#gaugeGradient)"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className="transition-all duration-2000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="text-center"
            >
              <span className={`text-4xl font-bold ${getTextColor(value)}`}>
                {value}
              </span>
              <div className="text-sm text-gray-400">/ 100</div>
            </motion.div>
          </div>
        </div>
        <div className="text-center">
          <div className={`text-lg font-semibold ${getTextColor(value)}`}>
            {text}
          </div>
          <div className="text-sm text-gray-400 mt-1">
            {translations[language]?.marketSentiment || 'Piyasa Duyarlılığı'}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Market Overview Component
const EnhancedMarketOverview = ({ data, language }: { data: GlobalMarketData; language: string }) => {
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);
  const t = translations[language];
  
  const stats = [
    {
      title: t.totalMarketCap,
      value: data.totalMarketCap,
      change: data.marketCapChange,
      icon: FiDollarSign,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      description: t.marketCapDesc,
      detailedDescription: t.marketCapDetail
    },
    {
      title: t.totalVolume,
      value: data.totalVolume,
      change: data.volumeChange,
      icon: FiBarChart,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      description: t.volumeDesc,
      detailedDescription: t.volumeDetail
    },
    {
      title: t.btcDominance,
      value: data.btcDominance,
      change: '',
      icon: FiPieChart,
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-500/10',
      description: t.dominanceDesc,
      detailedDescription: t.dominanceDetail
    },
    {
      title: t.activeCryptos,
      value: data.activeCryptos,
      change: '',
      icon: FiDatabase,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      description: t.activeDesc,
      detailedDescription: t.activeDetail
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative glass-card p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor} backdrop-blur-sm flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-white`} style={{
                  background: `linear-gradient(135deg, ${stat.color.split(' ')[1]} 0%, ${stat.color.split(' ')[3]} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }} />
              </div>
              <div className="flex items-center gap-2">
                {stat.change && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      stat.change.startsWith('+') 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {stat.change}
                  </motion.div>
                )}
                <div className="relative">
                  <motion.div
                    onMouseEnter={() => setTooltipIndex(index)}
                    onMouseLeave={() => setTooltipIndex(null)}
                    whileHover={{ scale: 1.1 }}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 cursor-help border border-white/20"
                  >
                    <FiInfo className="w-4 h-4 text-white" />
                  </motion.div>
                  <AnimatePresence>
                    {tooltipIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute top-full right-0 mt-2 w-80 z-[9999]"
                      >
                        <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl">
                          <div className="text-white font-semibold mb-2">{stat.title}</div>
                          <div className="text-gray-300 text-sm mb-2">{stat.description}</div>
                          <div className="text-gray-400 text-xs">{stat.detailedDescription}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">
                {data.loading ? (
                  <div className="animate-pulse flex space-x-1">
                    <div className="h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded w-16"></div>
                    <div className="h-8 bg-gradient-to-r from-gray-700 to-gray-600 rounded w-8"></div>
                  </div>
                ) : (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.span>
                )}
              </div>
              <div className="text-sm font-medium text-gray-200">{stat.title}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Premium Trending Coins Component
const PremiumTrendingCoins = ({ coins, language }: { coins: TrendingCoin[]; language: string }) => {
  const [selectedCoin, setSelectedCoin] = useState<TrendingCoin | null>(null);
  const t = translations[language];
  
  const getCoinIcon = (symbol: string) => {
    // USDT'siz halini dene
    const symbolUpper = symbol.toUpperCase();
    let iconFile = coinMap[symbolUpper as keyof typeof coinMap];
    
    // Eğer bulamazsa USDT'li halini dene
    if (!iconFile) {
      iconFile = coinMap[`${symbolUpper}USDT` as keyof typeof coinMap];
    }
    
    // Eğer hala bulamazsa, symbol'den / karakterini kaldır
    if (!iconFile && symbol.includes('/')) {
      const cleanSymbol = symbol.replace('/', '').toUpperCase();
      iconFile = coinMap[cleanSymbol as keyof typeof coinMap];
    }
    
    return iconFile ? `/images/coin_icons/${iconFile}` : null;
  };

  const generateMockSparkline = () => {
    return Array.from({ length: 20 }, (_, i) => Math.random() * 100 + 50);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl blur-2xl"></div>
      <div className="relative glass-card p-8 rounded-2xl border border-white/10 backdrop-blur-xl mb-8">
        <div className="flex items-center justify-between mb-8">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-white flex items-center gap-3"
          >
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <FiTrendingUp className="w-6 h-6 text-white" />
            </div>
            {t.trendingCoins}
            <div className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">
              {t.live}
            </div>
          </motion.h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-400 hover:text-white text-sm transition-colors px-4 py-2 rounded-lg bg-white/5 border border-white/10"
          >
            {t.viewAll}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coins.slice(0, 6).map((coin, index) => (
            <motion.div
              key={coin.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setSelectedCoin(coin)}
              className="relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center border-2 border-white/20">
                        {getCoinIcon(coin.symbol) ? (
                          <Image
                            src={getCoinIcon(coin.symbol)!}
                            alt={coin.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white font-bold text-lg">
                            {coin.symbol.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full text-xs text-white flex items-center justify-center font-bold">
                        {coin.market_cap_rank}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">{coin.symbol.toUpperCase()}</div>
                      <div className="text-sm text-gray-400 truncate max-w-24">{coin.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-lg">
                      ${coin.current_price.toLocaleString()}
                    </div>
                    <div className={`text-sm font-medium px-2 py-1 rounded-md ${
                      coin.price_change_percentage_24h > 0 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {coin.price_change_percentage_24h > 0 ? '+' : ''}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
                
                {/* Mini Chart */}
                <div className="h-12 flex items-end space-x-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  {generateMockSparkline().map((height, i) => (
                    <div
                      key={i}
                      className={`w-2 rounded-t ${
                        coin.price_change_percentage_24h > 0 
                          ? 'bg-gradient-to-t from-green-500 to-green-300' 
                          : 'bg-gradient-to-t from-red-500 to-red-300'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                  <div className="text-xs text-gray-400">
                    Market Cap: ${(coin.market_cap / 1e9).toFixed(1)}B
                  </div>
                  <div className="text-xs text-gray-400">
                    Vol: ${(coin.total_volume / 1e6).toFixed(1)}M
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Ultra Premium Quick Actions
const UltraPremiumQuickActions = ({ user, router }: { user: User | null; router: any }) => {
  const actions = [
    {
      title: 'AI Analiz',
      description: 'Yapay zeka destekli coin analizi',
      icon: FiZap,
      color: 'from-yellow-400 via-orange-500 to-red-500',
      glowColor: 'shadow-yellow-500/25',
      action: () => router.push('/analyze'),
      isPremium: false
    },
    {
      title: 'Sinyal Geçmişi',
      description: 'Geçmiş analizlerinizi görün',
      icon: FiClock,
      color: 'from-blue-400 via-blue-500 to-blue-600',
      glowColor: 'shadow-blue-500/25',
      action: () => router.push('/history'),
      isPremium: false
    },
    {
      title: 'Premium Paket',
      description: 'Gelişmiş özellikler ve sınırsız analiz',
      icon: FiAward,
      color: 'from-purple-400 via-pink-500 to-purple-600',
      glowColor: 'shadow-purple-500/25',
      action: () => router.push('/subscription'),
      isPremium: true
    },
    {
      title: 'Profil',
      description: 'Hesap ayarları ve istatistikler',
      icon: FiUser,
      color: 'from-green-400 via-emerald-500 to-green-600',
      glowColor: 'shadow-green-500/25',
      action: () => router.push('/profile'),
      isPremium: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {actions.map((action, index) => (
        <motion.div
          key={action.title}
          initial={{ opacity: 0, y: 50, rotateX: 45 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05, rotateY: 5 }}
          whileTap={{ scale: 0.95 }}
          className="relative group cursor-pointer"
          onClick={action.action}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${action.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500`}></div>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 group-hover:border-white/30 transition-all duration-300">
            <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-all duration-300`}></div>
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${action.color} shadow-2xl ${action.glowColor}`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                {action.isPremium && (
                  <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                    PRO
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{action.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{action.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex-1"></div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`p-2 rounded-full bg-gradient-to-r ${action.color}`}
                >
                  <FiArrowRight className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced Top Movers Component
const EnhancedTopMovers = ({ gainers, losers, language }: { gainers: TopMover[]; losers: TopMover[]; language: string }) => {
  const t = translations[language];
  
  const getCoinIcon = (symbol: string) => {
    // USDT'siz halini dene
    const symbolUpper = symbol.toUpperCase();
    let iconFile = coinMap[symbolUpper as keyof typeof coinMap];
    
    // Eğer bulamazsa USDT'li halini dene
    if (!iconFile) {
      iconFile = coinMap[`${symbolUpper}USDT` as keyof typeof coinMap];
    }
    
    // Eğer hala bulamazsa, symbol'den / karakterini kaldır
    if (!iconFile && symbol.includes('/')) {
      const cleanSymbol = symbol.replace('/', '').toUpperCase();
      iconFile = coinMap[cleanSymbol as keyof typeof coinMap];
    }
    
    return iconFile ? `/images/coin_icons/${iconFile}` : null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Top Gainers */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-2xl"></div>
        <div className="relative glass-card p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
              <FiTrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">{t.topGainers}</h3>
            <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
              +{gainers.length}
            </div>
          </div>
          <div className="space-y-4">
            {gainers.map((coin, index) => (
              <motion.div
                key={coin.symbol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5, scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer border border-transparent hover:border-green-500/30"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center border-2 border-green-500/50">
                    {getCoinIcon(coin.symbol) ? (
                      <Image
                        src={getCoinIcon(coin.symbol)!}
                        alt={coin.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-lg">
                        {coin.symbol.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <FiArrowUpCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white text-lg">{coin.symbol}</div>
                  <div className="text-sm text-gray-400">{coin.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-lg">{coin.price}</div>
                  <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-500/30">
                    +{coin.changePercent.toFixed(2)}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Losers */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-2xl blur-2xl"></div>
        <div className="relative glass-card p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl">
              <FiTrendingDown className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">{t.topLosers}</h3>
            <div className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm border border-red-500/30">
              -{losers.length}
            </div>
          </div>
          <div className="space-y-4">
            {losers.map((coin, index) => (
              <motion.div
                key={coin.symbol}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: -5, scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer border border-transparent hover:border-red-500/30"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center border-2 border-red-500/50">
                    {getCoinIcon(coin.symbol) ? (
                      <Image
                        src={getCoinIcon(coin.symbol)!}
                        alt={coin.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-lg">
                        {coin.symbol.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <FiArrowDownCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white text-lg">{coin.symbol}</div>
                  <div className="text-sm text-gray-400">{coin.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-lg">{coin.price}</div>
                  <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-bold border border-red-500/30">
                    {coin.changePercent.toFixed(2)}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced User Profile Component
const EnhancedUserProfile = ({ user, language }: { user: User | null; language: string }) => {
  const t = translations[language];
  
  if (!user) {
    return (
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-2xl"></div>
        <div className="relative glass-card p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
              <FiUser className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{t.welcomeTitle}</h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              {t.welcomeDesc}
            </p>
            <div className="flex gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
              >
                {t.login}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 text-white px-8 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                {t.register}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-2xl"></div>
      <div className="relative glass-card p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-white font-bold text-2xl">
                {user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-gray-900">
              <FiWifi className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-1">
              {user.user_metadata?.name || 'Pro Trader'}
            </h3>
            <p className="text-gray-300 mb-2">{user.email}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded-full text-sm border border-yellow-500/30">
                <FiAward className="w-4 h-4" />
                <span>{t.proMember}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
                <FiCircle className="w-2 h-2 bg-green-400 rounded-full" />
                <span>{t.active}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400 mb-2">{t.lastAnalysis}</div>
            <div className="text-white font-semibold">2 {t.minutesAgo}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<string>('tr');
  const [globalData, setGlobalData] = useState<GlobalMarketData>({
    totalMarketCap: '$0',
    totalVolume: '$0',
    marketCapChange: '0%',
    volumeChange: '0%',
    btcDominance: '0%',
    ethDominance: '0%',
    activeCryptos: '0',
    totalSupply: '$0',
    loading: true
  });
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [topGainers, setTopGainers] = useState<TopMover[]>([]);
  const [topLosers, setTopLosers] = useState<TopMover[]>([]);
  const [marketPulse, setMarketPulse] = useState<MarketPulse>({
    sentiment: 'Neutral',
    fearGreedIndex: 50,
    fearGreedText: 'Neutral',
    lastUpdated: '',
    loading: true
  });
  
  const router = useRouter();
  const t = translations[language];

  // Listen for language changes from Layout
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail.language);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    // Get initial language from localStorage
    const savedLanguage = localStorage.getItem('language') || 'tr';
    setLanguage(savedLanguage);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  // Fetch global market data
  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/global');
        const data = await response.json();
        
        setGlobalData({
          totalMarketCap: '$' + (data.data.total_market_cap.usd / 1e12).toFixed(2) + 'T',
          totalVolume: '$' + (data.data.total_volume.usd / 1e9).toFixed(1) + 'B',
          marketCapChange: (data.data.market_cap_change_percentage_24h_usd > 0 ? '+' : '') + 
                          data.data.market_cap_change_percentage_24h_usd.toFixed(2) + '%',
          volumeChange: '+2.5%',
          btcDominance: data.data.market_cap_percentage.btc.toFixed(1) + '%',
          ethDominance: data.data.market_cap_percentage.eth.toFixed(1) + '%',
          activeCryptos: data.data.active_cryptocurrencies.toLocaleString(),
          totalSupply: '$' + (data.data.total_market_cap.usd / 1e12).toFixed(2) + 'T',
          loading: false
        });
      } catch (error) {
        console.error('Global data fetch error:', error);
        setGlobalData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchGlobalData();
    const interval = setInterval(fetchGlobalData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Fetch trending coins
  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true');
        const data = await response.json();
        
        setTrendingCoins(data);
        
        // Create top movers
        const sortedByGain = [...data].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        const sortedByLoss = [...data].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
        
        setTopGainers(sortedByGain.slice(0, 5).map(coin => ({
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          price: '$' + coin.current_price.toLocaleString(),
          change: '+' + coin.price_change_percentage_24h.toFixed(2) + '%',
          changePercent: coin.price_change_percentage_24h,
          volume: '$' + (coin.total_volume / 1e6).toFixed(1) + 'M',
          marketCap: '$' + (coin.market_cap / 1e9).toFixed(1) + 'B'
        })));
        
        setTopLosers(sortedByLoss.slice(0, 5).map(coin => ({
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          price: '$' + coin.current_price.toLocaleString(),
          change: coin.price_change_percentage_24h.toFixed(2) + '%',
          changePercent: coin.price_change_percentage_24h,
          volume: '$' + (coin.total_volume / 1e6).toFixed(1) + 'M',
          marketCap: '$' + (coin.market_cap / 1e9).toFixed(1) + 'B'
        })));
      } catch (error) {
        console.error('Trending coins fetch error:', error);
      }
    };

    fetchTrendingCoins();
    const interval = setInterval(fetchTrendingCoins, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  // Fetch market pulse
  useEffect(() => {
    const fetchMarketPulse = async () => {
      try {
        const response = await fetch('https://api.alternative.me/fng/');
        const data = await response.json();
        
        const fngIndex = parseInt(data.data[0].value);
        const fngText = data.data[0].value_classification;
        
        let sentiment = t.neutral;
        if (fngIndex >= 75) sentiment = t.extremelyPositive;
        else if (fngIndex >= 60) sentiment = t.positive;
        else if (fngIndex >= 40) sentiment = t.neutral;
        else if (fngIndex >= 25) sentiment = t.negative;
        else sentiment = t.extremelyNegative;
        
        setMarketPulse({
          sentiment,
          fearGreedIndex: fngIndex,
          fearGreedText: fngText,
          lastUpdated: new Date().toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US'),
          loading: false
        });
      } catch (error) {
        console.error('Market pulse fetch error:', error);
        setMarketPulse(prev => ({ ...prev, loading: false }));
      }
    };

    fetchMarketPulse();
    const interval = setInterval(fetchMarketPulse, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, [language, t]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20"></div>
                <h1 className="relative text-6xl md:text-8xl font-black text-white mb-6">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {t.heroTitle}
                  </span>
                </h1>
              </div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                {t.heroSubtitle}
                <span className="block text-lg text-gray-400 mt-2">
                  {t.heroDescription}
                </span>
              </motion.p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
                <FiCircle className="w-2 h-2 bg-green-400 rounded-full" />
                <span>{t.liveData}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                <FiCpu className="w-4 h-4" />
                <span>{t.aiPowered}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">
                <FiAward className="w-4 h-4" />
                <span>{t.proAnalysis}</span>
              </div>
            </motion.div>
          </div>

          {/* Market Overview */}
          <EnhancedMarketOverview data={globalData} language={language} />

          {/* User Profile */}
          <EnhancedUserProfile user={user} language={language} />

          {/* Quick Actions */}
          <UltraPremiumQuickActions user={user} router={router} />

          {/* Market Pulse & Trending Coins */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            <div className="xl:col-span-2">
              <PremiumTrendingCoins coins={trendingCoins} language={language} />
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-2xl"></div>
              <div className="relative glass-card p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                    <FiActivity className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{t.marketPulse}</h3>
                  <div className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm border border-indigo-500/30">
                    {t.live}
                  </div>
                </div>
                <div className="flex justify-center">
                  <AdvancedFearGreedGauge 
                    value={marketPulse.fearGreedIndex} 
                    text={marketPulse.fearGreedText}
                    language={language}
                  />
                </div>
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-400">{t.generalSentiment}</span>
                    <span className={`font-bold ${
                      marketPulse.sentiment === t.extremelyPositive ? 'text-green-400' :
                      marketPulse.sentiment === t.positive ? 'text-green-400' :
                      marketPulse.sentiment === t.neutral ? 'text-yellow-400' :
                      marketPulse.sentiment === t.negative ? 'text-red-400' :
                      'text-red-400'
                    }`}>
                      {marketPulse.sentiment}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500">
                      {t.lastUpdated}: {marketPulse.lastUpdated}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Movers */}
          <EnhancedTopMovers gainers={topGainers} losers={topLosers} language={language} />

          {/* Recent Signals */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-2xl"></div>
            <div className="relative glass-card p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl">
                  <FiZap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{t.recentSignals}</h3>
                <div className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30">
                  {t.lastSignals}
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { 
                    pair: 'BTC/USDT', 
                    signal: t.buy,
                    price: '$94,250',
                    time: language === 'tr' ? '2 dk önce' : '2 min ago', 
                    status: 'success',
                    profit: '+2.4%',
                    confidence: t.high
                  },
                  { 
                    pair: 'ETH/USDT', 
                    signal: t.sell,
                    price: '$3,456',
                    time: language === 'tr' ? '8 dk önce' : '8 min ago', 
                    status: 'warning',
                    profit: '+1.8%',
                    confidence: t.medium
                  },
                  { 
                    pair: 'ADA/USDT', 
                    signal: t.buy,
                    price: '$0.89',
                    time: language === 'tr' ? '15 dk önce' : '15 min ago', 
                    status: 'success',
                    profit: '+5.2%',
                    confidence: t.high
                  },
                  { 
                    pair: 'DOT/USDT', 
                    signal: t.hold,
                    price: '$7.24',
                    time: language === 'tr' ? '22 dk önce' : '22 min ago', 
                    status: 'info',
                    profit: '0%',
                    confidence: t.low
                  },
                  { 
                    pair: 'SOL/USDT', 
                    signal: t.sell,
                    price: '$185.67',
                    time: language === 'tr' ? '28 dk önce' : '28 min ago', 
                    status: 'warning',
                    profit: '+3.1%',
                    confidence: t.medium
                  }
                ].map((signal, index) => {
                  const getSignalColors = (sig: string) => {
                    if (sig === t.buy || sig === 'AL') return {
                      bg: 'bg-green-500/20',
                      text: 'text-green-400',
                      border: 'border-green-500/30',
                      glow: 'shadow-green-500/25'
                    };
                    if (sig === t.sell || sig === 'SAT') return {
                      bg: 'bg-red-500/20',
                      text: 'text-red-400',
                      border: 'border-red-500/30',
                      glow: 'shadow-red-500/25'
                    };
                    if (sig === t.hold || sig === 'BEKLE') return {
                      bg: 'bg-yellow-500/20',
                      text: 'text-yellow-400',
                      border: 'border-yellow-500/30',
                      glow: 'shadow-yellow-500/25'
                    };
                    return {
                      bg: 'bg-blue-500/20',
                      text: 'text-blue-400',
                      border: 'border-blue-500/30',
                      glow: 'shadow-blue-500/25'
                    };
                  };

                  const colors = getSignalColors(signal.signal);

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                      <div className="relative flex items-center gap-4 p-6 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer border border-transparent hover:border-white/10">
                        {/* Coin Icon */}
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center border-2 border-cyan-500/50">
                            {(() => {
                              const coinSymbol = signal.pair.split('/')[0];
                              const symbolUpper = coinSymbol.toUpperCase();
                              let iconFile = coinMap[symbolUpper as keyof typeof coinMap];
                              
                              if (!iconFile) {
                                iconFile = coinMap[`${symbolUpper}USDT` as keyof typeof coinMap];
                              }
                              
                              return iconFile ? (
                                <Image
                                  src={`/images/coin_icons/${iconFile}`}
                                  alt={coinSymbol}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-white font-bold text-lg">
                                  {coinSymbol.charAt(0)}
                                </span>
                              );
                            })()}
                          </div>
                          <motion.div 
                            className={`absolute -top-1 -right-1 w-6 h-6 ${colors.bg} ${colors.border} border rounded-full flex items-center justify-center shadow-lg ${colors.glow}`}
                            whileHover={{ scale: 1.2 }}
                          >
                            <div className={`w-2 h-2 ${colors.text.replace('text-', 'bg-')} rounded-full`}></div>
                          </motion.div>
                        </div>

                        {/* Signal Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="font-bold text-white text-lg">{signal.pair}</div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className={`px-3 py-1 rounded-full text-sm font-bold ${colors.bg} ${colors.text} ${colors.border} border shadow-lg ${colors.glow}`}
                            >
                              {signal.signal}
                            </motion.div>
                            <div className={`px-2 py-1 rounded-md text-xs font-medium ${
                              signal.confidence === t.high ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                              signal.confidence === t.medium ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                              'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                            }`}>
                              {signal.confidence}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>{signal.time}</span>
                            <span>•</span>
                            <span>{signal.price}</span>
                            {signal.profit !== '0%' && (
                              <>
                                <span>•</span>
                                <span className={`font-medium ${
                                  signal.profit.startsWith('+') ? 'text-green-400' : 'text-red-400'
                                }`}>
                                  {signal.profit}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Signal Action Icon */}
                        <div className="text-right">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={`p-3 rounded-xl ${colors.bg} ${colors.border} border backdrop-blur-sm`}
                          >
                            {signal.signal === t.buy && <FiTrendingUp className={`w-5 h-5 ${colors.text}`} />}
                            {signal.signal === t.sell && <FiTrendingDown className={`w-5 h-5 ${colors.text}`} />}
                            {signal.signal === t.hold && <FiClock className={`w-5 h-5 ${colors.text}`} />}
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 