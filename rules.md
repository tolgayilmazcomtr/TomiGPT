# 💹 TomiGPT – Teknik İndikatör Destekli Kripto Analiz Platformu

TomiGPT, kullanıcıların kripto paralar için **teknik indikatörler üzerinden ağırlıklı puanlama** yöntemiyle AL / SAT / BEKLE sinyali alabileceği, Stripe ile abonelik tabanlı çalışan, sade ve hızlı bir analiz platformudur.

sistem 2 dilli olacak ingilizce ve türkçe

---

## 🚧 Kodlama Kuralları ve Geliştirme Notları

- 🧠 **Yazılım Dilleri**:
  - Frontend → `Next.js (TypeScript)`
  - Backend → `FastAPI (Python 3.11+)`
  - Veritabanı → `PostgreSQL (Supabase üzerinden)`
  
- 📁 **Dosya/Proje Yapısı Sabittir**  
  Bu klasör yapısı dışına çıkılmayacak ve dosya çoğaltılmayacaktır:
  - `frontend/pages/` sadece sayfaları içerecek.
  - `backend/routes/` sadece API uçlarını içerecek.
  - `backend/indicators/` sadece indikatör hesaplarını içerecek.
  
- 🧼 **Cursor, Copilot ve diğer araçlara not:**  
  Lütfen:
  - Mevcut dosyaları silme, yeniden oluşturma veya ikizini yapma.
  - `analyzer.py`, `calculator.py`, `cache.py`, `stripe_webhook.py` dosyalarını **tek ve sade** tut.
  - “app.py”, “server.py”, “main_copy.py” gibi dosyalar oluşturulmayacak.

- ✅ Her dosya yalnızca kendi görevini yapmalı.  
  `calculator.py` sadece teknik analiz hesaplar, `analyze.py` sadece HTTP endpoint taşır.

---

## ⚙️ Teknoloji Yığını

| Katman      | Teknoloji                        |
|-------------|----------------------------------|
| Frontend    | Next.js (TypeScript)             |
| Backend     | FastAPI                          |
| Auth        | Supabase Auth (Email + Google)  |
| DB          | Supabase (PostgreSQL)            |
| Ödeme       | Stripe                           |
| Veri Kaynağı| Binance API                      |
| Dağıtım     | Vercel (Frontend) + Railway      |

---

## 🔐 Kimlik Doğrulama

- Kullanıcılar **email** veya **Google hesabı** ile giriş yapabilir.
- Supabase Auth altyapısı kullanılır.

---

## 💳 Stripe Abonelik Planları

### 🟢 Starter — Ücretsiz
- BTC ve ETH için analiz
- AL / SAT / BEKLE sinyali ve temel yorum
- Günlük 5 analiz hakkı

### 🟡 Pro — $39/ay
- Tüm coinlerde analiz
- Günlük 20 analiz hakkı
- Sinyal geçmişi ve gelişmiş açıklamalar

### 🟠 Gold — $59/ay
- Pro’nun tüm özellikleri
- Günlük 40 analiz hakkı
- Özel strateji yorumları ve premium destek

---

## 📊 Analiz Süreci

1. Kullanıcı 2000+ coin’den birini seçip analiz başlatır.
2. Binance API üzerinden OHLCV verisi alınır.
3. Aşağıdaki indikatörler hesaplanır:
   - RSI, MACD, EMA, Bollinger Bands, Stochastic RSI, ADX, CCI, Volume Spike
4. Her indikatör kendi koşullarına göre puan üretir.
5. Puanlar ağırlıklı toplanır ve:
   - `AL` → Toplam skor ≥ +4
   - `SAT` → Toplam skor ≤ -4
   - `BEKLE` → Diğer durumlar

---

## 🧠 Ağırlıklı İndikatör Puanlama

| İndikatör | Koşul                             | Puan | Ağırlık | Skor |
|-----------|------------------------------------|------|---------|------|
| RSI       | <30 / >70                         | ±2   | 2x      | ±4   |
| MACD      | MACD > Signal                     | ±2   | 1.5x    | ±3   |
| EMA       | Price > EMA                       | +1   | 1x      | +1   |
| Bollinger | Fiyat alt/üst banda taşarsa       | ±2   | 1.2x    | ±2.4 |
| ADX       | ADX > 25                          | +1   | 1x      | +1   |
| CCI       | CCI < -100                        | +1   | 1x      | +1   |
| Volume    | Son hacim > ortalamanın 3 katı    | +1   | 1x      | +1   |

---

## 🕒 Zaman Filtresi

- Sistem yalnızca şu zaman dilimlerinde analiz yapar:
  - `4H` (4 saat)
  - `1D` (1 gün)
- Daha kısa periyotlarda analiz yapılmaz.

---

## 📉 Market Trend Filtresi

- BTC/USDT düşüşteyse (örneğin EMA26 altındaysa):
  - Tüm skorlar `total_score *= -1` ile ters çevrilir.
  - Bu sayede genel düşüşte “AL” sinyali verilmez.

---

## 🔒 Rate Limit & Cache

- Aynı kullanıcı aynı coin’i kısa sürede tekrar analiz ederse,
  önbelleğe alınmış sonuç döner.
- Binance API için cache süresi: **5 dakika**

---

## 🧱 Sayfa Yapısı

| Sayfa           | Açıklama                              |
|------------------|----------------------------------------|
| `/analyze`       | Coin seçimi ve analiz sonucu           |
| `/history`       | Kullanıcının geçmiş sinyalleri         |
| `/subscription`  | Stripe üzerinden plan yönetimi         |
| `/profile`       | Hesap bilgileri                        |
| `/settings`      | Bildirimler, dil, tema vs.             |

---

## 📁 Proje Dizini
TomiGPT/
├── frontend/
│ ├── pages/
│ │ ├── analyze.tsx
│ │ ├── history.tsx
│ │ ├── subscription.tsx
│ │ ├── profile.tsx
│ │ └── settings.tsx
│ └── lib/stripe.ts
├── backend/
│ ├── main.py
│ ├── routes/
│ │ ├── analyze.py
│ │ ├── auth.py
│ │ ├── stripe_webhook.py
│ ├── indicators/
│ │ └── calculator.py
│ ├── services/
│ │ └── cache.py
├── supabase/
│ └── schema.sql
├── README.md
├── rules.md
└── .env

---

## ✅ Özet

- 🚀 Hızlı çalışan, ML içermeyen analiz mimarisi
- 📊 Açıklanabilir, ağırlıklı indikatör puanlama sistemi
- 💳 Stripe ile kontrollü analiz erişimi
- 🔒 API ve sistem dostu rate-limit mimarisi

