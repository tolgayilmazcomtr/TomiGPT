import { loadStripe } from '@stripe/stripe-js'

// Stripe public key
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

if (!stripePublicKey) {
  console.warn('🔶 Stripe public key not found - payments will be disabled')
}

// Initialize Stripe
export const getStripe = () => {
  if (!stripePublicKey) {
    return null
  }
  return loadStripe(stripePublicKey)
}

// Subscription plans
export const SUBSCRIPTION_PLANS = {
  starter: {
    name: 'Starter',
    price: 0,
    priceId: '',
    features: [
      'BTC ve ETH analizi',
      'Günlük 5 analiz hakkı',
      'Temel AL/SAT/BEKLE sinyali',
      'Temel teknik indikatörler'
    ],
    limits: {
      dailyAnalysis: 5,
      supportedCoins: ['BTC', 'ETH']
    }
  },
  pro: {
    name: 'Pro',
    price: 39,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || '',
    features: [
      'Tüm coinlerde analiz',
      'Günlük 20 analiz hakkı',
      'Sinyal geçmişi',
      'Gelişmiş açıklamalar',
      'Premium indikatörler'
    ],
    limits: {
      dailyAnalysis: 20,
      supportedCoins: 'all'
    }
  },
  gold: {
    name: 'Gold',
    price: 59,
    priceId: process.env.NEXT_PUBLIC_STRIPE_GOLD_PRICE_ID || '',
    features: [
      'Pro\'nun tüm özellikleri',
      'Günlük 40 analiz hakkı',
      'Özel strateji yorumları',
      'Premium destek',
      'Gelişmiş portföy analizi'
    ],
    limits: {
      dailyAnalysis: 40,
      supportedCoins: 'all'
    }
  }
} as const

export type SubscriptionPlan = keyof typeof SUBSCRIPTION_PLANS

// Helper function to get plan details
export const getPlanDetails = (planId: SubscriptionPlan) => {
  return SUBSCRIPTION_PLANS[planId]
}

// Helper function to format price
export const formatPrice = (price: number) => {
  if (price === 0) return 'Ücretsiz'
  return `$${price}/ay`
} 