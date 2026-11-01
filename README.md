# 🚀 MEXC Trade — Complete Platform Handover

> **Status:** ✅ PRODUCTION READY  
> **Version:** 1.0.0  
> **Last Updated:** Project Delivery  
> **Type:** Full-Stack Crypto Trading Platform

---

## 📌 PROJECT OVERVIEW

**Project Name:** MEXC Trade  
**Tagline:** Global Crypto Exchange  
**Type:** Full-Stack Crypto Trading Platform with Admin Panel  
**Architecture:** Next.js 16 + PostgreSQL + Prisma 7 + Cloudinary  
**Design:** Premium dark theme (inspired by MEXC exchange)

---

## ✨ COMPLETE FEATURES

### 👤 User Features
- ✅ Email/Phone signup + login with JWT auth
- ✅ Live Markets (12 coins, Binance WebSocket)
- ✅ Real-time Trading (Buy/Sell with 1x-100x leverage)
- ✅ Trade positions with live P&L calculation
- ✅ Deposits (TRC20 USDT with screenshot upload)
- ✅ Withdrawals (6 methods: TRC20, BEP20, ERC20, Bank, UPI, PayPal)
- ✅ KYC Verification (multi-step with document + selfie upload)
- ✅ Live Chat Support with image attachments
- ✅ Real-time in-app notifications with sound
- ✅ Referral system with unique codes
- ✅ Wallet with equity breakdown
- ✅ Transaction records (Deposits/Withdrawals/Trades tabs)
- ✅ Security Center (change password + set withdrawal password)
- ✅ 3 themes (Deep Space, Cyberpunk, Light)
- ✅ Fully mobile responsive

### 🛠️ Admin Panel Features
- ✅ Separate admin login (`/admin/login`)
- ✅ Dashboard with real-time platform stats
- ✅ User Management (list, filter, suspend, promote, delete)
- ✅ Balance Management (add/deduct with audit trail)
- ✅ Deposit Approval (auto-credits balance)
- ✅ Withdrawal Approval (with auto-refund on reject)
- ✅ KYC Review (document viewer with zoom)
- ✅ Live Chat Management (reply to users)
- ✅ Trade Monitoring (force-close positions)
- ✅ Platform Settings (wallet address, limits, referral %)
- ✅ Complete Audit Logs (every admin action tracked)
- ✅ Search + filter + pagination across all lists
- ✅ Isolated theme system (admin theme separate from user)

---

## 🛠️ TECH STACK

| Category | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.9 |
| Frontend | React | 19.2.4 |
| Styling | Tailwind CSS v4 | ^4 |
| Database | PostgreSQL | - |
| ORM | Prisma with adapter-pg | ^7.8.0 |
| Auth | JWT + bcrypt | - |
| File Storage | Cloudinary | ^2.10.0 |
| State | Zustand + persist | ^5.0.14 |
| Animations | Framer Motion | ^12.40.0 |
| Charts | TradingView lightweight-charts | latest |
| Real-time | Binance WebSocket | - |
| Icons | Lucide React | ^1.21.0 |
| TypeScript | Strict mode | ^5 |

---

## 🗄️ DATABASE SCHEMA (10 Models)

1. **User** — Core user profile with balance, role, KYC status
2. **Session** — JWT session tracking with IP/user agent
3. **Deposit** — Deposit requests with screenshot proof
4. **Withdrawal** — Withdrawal requests (6 methods, JSON for non-crypto details)
5. **BankAccount** — Saved bank accounts
6. **KYCSubmission** — Identity verification with document uploads
7. **ChatMessage** — Support chat (USER/ADMIN messages)
8. **PlatformSetting** — Admin-configurable key/value settings
9. **Trade** — Trading positions with P&L, leverage, status
10. **AdminAction** — Complete audit trail for admin operations
11. **Notification** — In-app notifications for users

---

## 🔐 SECURITY

- ✅ Passwords hashed with bcrypt (12 rounds)
- ✅ JWT tokens signed with server-side secret (7-day expiry)
- ✅ httpOnly cookies (XSS protection)
- ✅ Separate cookies for admin/user (no session conflicts)
- ✅ Route-level protection via `proxy.ts`
- ✅ Role-based access control (USER vs ADMIN)
- ✅ Cascade deletes for user data
- ✅ Complete audit trail for admin actions
- ✅ CSRF protection via SameSite cookies
- ✅ SQL injection protection via Prisma parameterized queries
- ✅ File upload validation (type + size limits)
- ✅ Rate limiting via Vercel/hosting platform

---

## 💰 BUSINESS LOGIC

### Balance System (Virtual)
- Admin has complete control over all balances
- Every action logged in audit trail
- No blockchain settlement required
- Users see real-time balance updates

### Deposit Flow
1. User submits deposit with TRC20 hash + screenshot
2. Admin reviews in `/admin/deposits`
3. On approve: Balance auto-credited + user notified
4. On reject: Reason recorded + user notified

### Withdrawal Flow
1. User submits withdrawal (KYC required)
2. Balance deducted immediately (atomic transaction)
3. Admin reviews and processes
4. On complete: Marked with TxID + user notified
5. On reject: Balance auto-refunded + user notified

### Trading Flow
1. User opens position with margin + leverage
2. Fee deducted (0.1%), trade recorded
3. Live P&L calculated using WebSocket prices
4. On close: Margin + P&L - fee returned to balance
5. Liquidation protection prevents negative balance

### KYC Flow
1. User submits document + selfie
2. Admin reviews with full-screen viewer
3. On approve: Withdrawals unlocked
4. On reject: Reason shown, re-submission allowed

---

## 📊 REAL-TIME DATA

- **Binance WebSocket:** Live prices for 12 coins (1-2s updates)
- **CoinGecko REST:** Coin metadata (5-minute refresh)
- **Binance REST:** Historical candlestick data + order book
- **Polling:** Notifications (30s), Chat (3s), Admin chat list (5s)

### Supported Coins
BTC, ETH, USDT, BNB, SOL, XRP, ADA, DOGE, AVAX, TRX, DOT, LINK

---

## 🌐 API ROUTES

### User-Facing APIs
- `/api/auth/*` — register, login, logout, me
- `/api/deposits` — Create/list deposits
- `/api/withdrawals` — Create/list withdrawals
- `/api/kyc` — Submit/check KYC
- `/api/chat` — User chat messages
- `/api/trades` — Open/list trades
- `/api/trades/close` — Close position
- `/api/markets` — Coin data
- `/api/markets/chart` — Chart data
- `/api/security/change-password`
- `/api/security/withdrawal-password`
- `/api/referrals` — Referral stats
- `/api/notifications` — User notifications
- `/api/notifications/[id]/read`
- `/api/notifications/read-all`
- `/api/settings` — Public platform settings

### Admin APIs (require role=ADMIN)
- `/api/admin/login`, `/api/admin/logout`, `/api/admin/me`
- `/api/admin/stats` — Dashboard stats
- `/api/admin/users` — User CRUD
- `/api/admin/users/[id]` — User detail + update
- `/api/admin/users/[id]/balance` — Add/deduct balance
- `/api/admin/deposits` + `/[id]` — Approve/reject
- `/api/admin/withdrawals` + `/[id]` — Approve/reject/complete
- `/api/admin/kyc` + `/[id]` — Review submissions
- `/api/admin/chat/conversations` — All chats
- `/api/admin/chat/[userId]` — Get/send messages
- `/api/admin/chat/[userId]/read` — Mark as read
- `/api/admin/trades` — All trades
- `/api/admin/trades/[id]/close` — Force close
- `/api/admin/settings` — Platform config
- `/api/admin/logs` — Audit trail

---

## 🎨 DESIGN SYSTEM

### 3 Themes
- **Deep Space** (Default): OLED dark + electric blue accents
- **Cyberpunk**: High contrast + neon green
- **Light**: Minimal white + indigo

### CSS Variables (per theme)
- `--background`, `--foreground`, `--card`, `--accent`, `--border`, `--muted`

### Utility Classes
- `.glass-panel` — Glassmorphism cards
- `.premium-card` — Hover-lift effect
- `.gradient-text` — Multi-color text
- `.mesh-bg` — Radial gradient backgrounds
- `.neon-glow`, `.shimmer`, `.skeleton`
- `.flash-up`, `.flash-down` — Price update animations

---

## 📁 DIRECTORY STRUCTURE
mexc-trade/
├── prisma/
│ ├── migrations/
│ └── schema.prisma (11 models)
├── public/
├── scripts/
│ └── seed-admin.ts (creates admin from .env)
├── src/
│ ├── app/
│ │ ├── (auth)/ # Login, signup, forgot-password
│ │ ├── admin/ # Complete admin panel
│ │ ├── api/ # All API routes
│ │ └── [user pages] # Home, markets, trade, wallet, etc.
│ ├── components/
│ │ ├── admin/ # Admin-specific components
│ │ ├── funds/ # Deposit/Withdraw panels
│ │ ├── markets/ # Price components
│ │ ├── trade/ # Trading components
│ │ └── [shared] # Navbar, Sidebar, etc.
│ ├── config/
│ ├── hooks/
│ ├── lib/
│ ├── store/
│ └── proxy.ts # Route protection
├── .env
├── package.json
├── prisma.config.ts
├── tailwind.config.ts
└── tsconfig.json

text


---

## 🚀 GETTING STARTED

See `DEPLOYMENT_GUIDE.md` for complete deployment instructions.

### Quick Local Setup
```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your credentials

# 3. Setup database
npx prisma migrate deploy
npx prisma generate

# 4. Create admin account
npm run seed:admin

# 5. Start development server
npm run dev
Visit http://localhost:3000 for the app, http://localhost:3000/admin/login for admin.

📝 STANDARD COMMANDS
Bash

npm run dev              # Development server
npm run build            # Production build
npm start                # Production server
npm run lint             # Lint code

# Database
npx prisma studio        # Database GUI
npx prisma migrate deploy # Apply migrations
npx prisma generate      # Regenerate client
npx prisma migrate dev   # Create + apply migration (dev)

# Admin
npm run seed:admin       # Create/update admin from .env
🔧 CONFIGURATION
All configurable settings are in the Platform Settings admin page:

TRC20 deposit wallet address
Deposit/withdrawal min/max limits
Daily withdrawal cap
Referral bonus percentage
Referral system enable/disable
No code changes needed for these — everything managed via admin UI.

📞 SUPPORT
Complete API documentation in code comments
Test flows documented in this file
Deployment guide in DEPLOYMENT_GUIDE.md
Database schema self-documenting via Prisma
© MEXC Trade — All Rights Reserved