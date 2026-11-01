# 🚀 MEXC Trade — Complete Deployment Guide

> Complete step-by-step guide to set up and deploy MEXC Trade platform.
> Follow each section carefully. Total setup time: ~30 minutes.

---

## 📋 TABLE OF CONTENTS

1. [Prerequisites](#1-prerequisites)
2. [Quick Start — Local Development](#2-quick-start--local-development)
3. [Understanding the Project](#3-understanding-the-project)
4. [Production Deployment](#4-production-deployment)
5. [Environment Variables Reference](#5-environment-variables-reference)
6. [Admin Account Setup](#6-admin-account-setup)
7. [Common Issues & Solutions](#7-common-issues--solutions)
8. [Security Recommendations](#8-security-recommendations)
9. [Post-Deployment Checklist](#9-post-deployment-checklist)

---

## 1. PREREQUISITES

Before you begin, ensure you have the following installed:

### Required Software:

| Software | Version | Download Link |
|---|---|---|
| **Node.js** | 20.x or higher | https://nodejs.org |
| **Git** | Latest | https://git-scm.com |
| **VS Code** (recommended) | Latest | https://code.visualstudio.com |

### Required Accounts:

You'll need accounts on these services. All have free tiers:

| Service | Purpose | Free Tier |
|---|---|---|
| **Neon** | PostgreSQL database | 10 GB storage |
| **Cloudinary** | Image/file uploads | 25 GB storage |
| **Vercel** | Hosting | Unlimited for personal |
| **GitHub** | Code repository | Unlimited public repos |

### Verify Installation:

Open terminal/command prompt and run:

```bash
node --version    # Should show v20.x.x or higher
npm --version     # Should show 10.x.x or higher
git --version     # Should show git version 2.x.x
2. QUICK START — LOCAL DEVELOPMENT
Get the platform running on your local machine in 5 minutes.

Step 1: Extract the Project
Extract the ZIP file to a folder (e.g., Desktop/mexc-trade)
Open the folder in VS Code (recommended)
Step 2: Install Dependencies
Open terminal in the project folder and run:

Bash

npm install
This will install all required packages (~2-3 minutes).

Step 3: Set Up Environment Variables
Create a .env file in the project root (same folder as package.json):

Option A: Use Provided Credentials (Fastest)

Copy the credentials from credentials.txt (provided separately) into your .env file.

Option B: Set Up Your Own Services

Copy .env.example to .env and fill in your credentials (see Section 5).

Step 4: Generate Prisma Client
Bash

npx prisma generate
Step 5: Verify Database Connection
Bash

npx prisma migrate deploy
Expected output:

text

✔ Generated Prisma Client
Applied migration `xxxx_init_postgres_setup`
Applied migration `xxxx_add_trade_model`
Applied migration `xxxx_add_admin_action_model`
Applied migration `xxxx_add_notification_model`
If migrations are already applied, you'll see: No pending migrations to apply. — this is fine!

Step 6: Create Admin Account
Bash

npm run seed:admin
This creates an admin account using credentials from your .env file.

Expected output:

text

🚀 MEXC Trade — Admin Seed Script
═══════════════════════════════════════
✅ Admin created successfully!
   Email: admin@yourdomain.com
   Password: [your password from .env]
   Role: ADMIN
═══════════════════════════════════════
Step 7: Start Development Server
Bash

npm run dev
Expected output:

text

▲ Next.js 16.2.9 (Turbopack)
- Local: http://localhost:3000
✓ Ready in 1500ms
Step 8: Test the Application
Open your browser and visit:

User Site: http://localhost:3000
Admin Panel: http://localhost:3000/admin/login
Login with:

Admin Email: (from your .env)
Admin Password: (from your .env)
🎉 You're all set! The platform is running locally.

3. UNDERSTANDING THE PROJECT
Project Structure:
text

mexc-trade/
├── prisma/                    # Database schema & migrations
│   ├── migrations/            # SQL migration files
│   └── schema.prisma          # Data models
├── public/                    # Static assets
├── scripts/                   # Utility scripts
│   └── seed-admin.ts          # Creates admin account
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/            # Login, signup pages
│   │   ├── admin/             # Admin panel
│   │   ├── api/               # Backend API routes
│   │   └── ...                # User-facing pages
│   ├── components/            # Reusable UI components
│   ├── config/                # Configuration files
│   ├── hooks/                 # React hooks
│   ├── lib/                   # Utility libraries
│   ├── store/                 # Zustand state stores
│   └── proxy.ts               # Route protection
├── .env                       # Your credentials (NEVER commit)
├── .env.example               # Template for credentials
├── package.json               # Dependencies
├── README.md                  # Project overview
└── DEPLOYMENT_GUIDE.md        # This file
Key Concepts:
Virtual Balance System:

User balances are managed entirely by admin
No blockchain settlement required
Admin approves deposits → auto-credits balance
Admin approves withdrawals → processes manually
Real-Time Data:

Cryptocurrency prices from Binance WebSocket
12 supported coins with live updates
No API keys needed
Two Separate Auth Systems:

User authentication (cookie: pe-session)
Admin authentication (cookie: pe-admin-session)
Both use JWT tokens, isolated sessions
File Uploads:

All uploads go to Cloudinary
Folders: mexc-trade/{deposits, kyc, chat}/
Automatic image optimization
4. PRODUCTION DEPLOYMENT
Deploy your platform to Vercel for public access.

Step 1: Create GitHub Repository
Go to https://github.com/new

Create a new repository:

Name: mexc-trade (or any name)
Private (recommended)
Don't initialize with README
Push your code to GitHub:

Bash

cd mexc-trade
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/mexc-trade.git
git push -u origin main
Step 2: Deploy to Vercel
Go to https://vercel.com/new
Sign in with GitHub
Click "Import Project"
Select your mexc-trade repository
Configure Project:
Framework Preset: Next.js (auto-detected)
Root Directory: ./ (default)
Build Command: prisma generate && prisma migrate deploy && next build
Install Command: npm install
Step 3: Add Environment Variables
Before clicking "Deploy", add all environment variables:

Click "Environment Variables" section and add each one:

Variable	Value
DATABASE_URL	Your Neon connection string
JWT_SECRET	Your random 64+ character secret
JWT_EXPIRES_IN	7d
ADMIN_EMAIL	Your admin email
ADMIN_PASSWORD	Your admin password
NEXT_PUBLIC_APP_URL	Will update after deployment
CLOUDINARY_CLOUD_NAME	Your Cloudinary cloud name
CLOUDINARY_API_KEY	Your Cloudinary API key
CLOUDINARY_API_SECRET	Your Cloudinary API secret
⚠️ IMPORTANT: Check all three environments (Production, Preview, Development) for each variable!

Step 4: Deploy
Click "Deploy"
Wait 2-3 minutes for build to complete
Step 5: Update APP_URL
Once deployed:

Copy your Vercel URL (e.g., mexc-trade-xxx.vercel.app)
Go to Project → Settings → Environment Variables
Update NEXT_PUBLIC_APP_URL to your Vercel URL
Redeploy: Deployments tab → Latest → ⋯ → Redeploy
Step 6: Create Admin on Production
Option A: Local Seed (Recommended)

Ensure DATABASE_URL in your local .env matches production
Run: npm run seed:admin
Admin created in production database
Option B: Vercel CLI

Bash

npm i -g vercel
vercel env pull
npm run seed:admin
Step 7: Test Live Deployment
Visit your Vercel URL:

Main site: https://your-project.vercel.app
Admin panel: https://your-project.vercel.app/admin/login
Login with admin credentials → Verify everything works.

5. ENVIRONMENT VARIABLES REFERENCE
Setting Up Neon Database
Go to https://neon.tech
Sign up (free)
Create a new project:
Name: mexc-trade-prod
Region: Choose closest to your users
Copy Pooled connection string from dashboard
Format: postgresql://user:pass@host/db?sslmode=require
Setting Up Cloudinary
Go to https://cloudinary.com/users/register/free
Sign up (free — 25 GB)
Verify email
Dashboard → Product Environment Credentials
Copy: Cloud Name, API Key, API Secret
Generating JWT Secret
Generate a strong random string:

Option 1: Online

Visit: https://randomkeygen.com
Copy "CodeIgniter Encryption Keys" (64 chars)
Option 2: Terminal

Bash

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
⚠️ NEVER share your JWT_SECRET publicly.

Complete .env Template
env

# Database
DATABASE_URL="postgresql://user:pass@host.neon.tech/db?sslmode=require"

# Authentication
JWT_SECRET="your-64-character-random-secret-here"
JWT_EXPIRES_IN="7d"

# Admin Account (Used by seed:admin script)
ADMIN_EMAIL="admin@yourdomain.com"
ADMIN_PASSWORD="YourStrong@Password2026!"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
6. ADMIN ACCOUNT SETUP
Creating First Admin
The seed script creates an admin from .env variables:

Bash

npm run seed:admin
Creating Additional Admins
Method 1: Via Admin Panel (Recommended)

Login as existing admin
Go to Users page
Find the user you want to promote
Click Actions → Promote to Admin
Type user's email to confirm
Method 2: Via Seed Script (Change .env, Re-run)

Update .env with new admin details
Run: npm run seed:admin
Script updates password if email exists, or creates new admin
Changing Admin Password
Login to admin panel
Go to Security Center
Update password
Or update .env and run npm run seed:admin again
7. COMMON ISSUES & SOLUTIONS
Issue: npm install fails
Solution:

Bash

# Delete node_modules and try again
rm -rf node_modules package-lock.json
npm install
Issue: Prisma migration fails
Solution:

Bash

# Reset and regenerate
npx prisma generate
npx prisma migrate deploy
Issue: "401 Unauthorized" errors in console
Solution:

Clear browser cookies for localhost:3000
Login again
If problem persists, run npm run seed:admin
Issue: Cloudinary upload fails
Solution:

Verify credentials in .env are correct
Check Cloudinary dashboard for usage limits
Ensure all three env vars are set: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
Issue: Real-time prices not showing
Solution:

Binance WebSocket may be blocked by firewall/VPN
Try disabling VPN
Check browser console for WebSocket errors
Test in different browser
Issue: Admin login not working
Solution:

Verify .env has correct ADMIN_EMAIL and ADMIN_PASSWORD
Run npm run seed:admin to reset admin account
Clear browser cookies
Try /admin/login (NOT /login)
Issue: Vercel deployment build fails
Common causes:

Missing env variables → Add all in Vercel dashboard
Prisma generate not in build command → Update build command
Missing npm install → Vercel usually handles this
Update build command in Vercel:

text

prisma generate && prisma migrate deploy && next build
Issue: Deployment works but database errors
Solution:

Verify DATABASE_URL in Vercel matches Neon
Run migrations on production DB (from local):
Bash

npx prisma migrate deploy
Check Neon dashboard for connection issues
Issue: Cookie propagation issues on Vercel
Solution: Already handled in code with window.location.href for redirects.

8. SECURITY RECOMMENDATIONS
Immediate Actions After Deployment:
Change Admin Password

Login → Security Center → Change Password
Use a unique, strong password
Update JWT_SECRET

Generate new random string
Update in .env and Vercel
Redeploy
Rotate Cloudinary Keys

Cloudinary Dashboard → Settings → Security
Regenerate API Secret
Update everywhere
Change Neon Database Password

Neon Dashboard → Settings → Reset Password
Update DATABASE_URL everywhere
Enable 2FA

GitHub account
Vercel account
Cloudinary account
Ongoing Security:
Regular backups: Export Neon database monthly
Monitor audit logs: Admin Panel → Audit Logs
Review admin actions: Watch for unusual activity
Update dependencies: npm audit fix monthly
Rotate secrets: Every 90 days
Environment Variable Security:
✅ Never commit .env to Git
✅ Use .env.example for templates
✅ Store production secrets in Vercel only
✅ Use strong passwords (16+ characters)
❌ Never share credentials in chat/email screenshots
9. POST-DEPLOYMENT CHECKLIST
Functionality Testing:
 User can sign up
 User can log in
 User can submit deposit request
 Admin can approve deposit → user balance updates
 User can submit KYC
 Admin can approve KYC
 KYC-approved user can submit withdrawal
 Admin can approve/reject withdrawal
 User can open trade position
 User can close trade position
 Real-time market prices loading
 Chat messages send/receive properly
 Notifications appear with sound
 All 3 themes work (Deep Space, Cyberpunk, Light)
 Mobile view is responsive
 Admin dashboard shows real stats
Configuration:
 Admin password changed from default
 Platform settings configured (Admin → Settings)
 TRC20 wallet address set
 Deposit/withdrawal limits configured
 Referral bonus configured
Security:
 JWT_SECRET is unique and strong
 All accounts have unique passwords
 2FA enabled where possible
 .env is in .gitignore
 No credentials in code
Optional Enhancements:
 Custom domain configured on Vercel
 Google Analytics added
 Email service integrated (SendGrid, etc.)
 Backup schedule set up
 Uptime monitoring (UptimeRobot, etc.)
🎯 QUICK REFERENCE COMMANDS
Bash

# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Run production build locally
npm run lint             # Check code quality

# Database
npx prisma studio        # Open database GUI
npx prisma migrate deploy # Apply migrations
npx prisma generate      # Regenerate Prisma client
npx prisma migrate dev --name description  # Create new migration

# Admin
npm run seed:admin       # Create/update admin from .env

# Deployment
git add .
git commit -m "message"
git push                 # Triggers auto-deploy on Vercel
📞 SUPPORT
Where to Find Help:
Next.js Documentation: https://nextjs.org/docs
Prisma Documentation: https://prisma.io/docs
Vercel Documentation: https://vercel.com/docs
Neon Documentation: https://neon.tech/docs
Cloudinary Documentation: https://cloudinary.com/documentation
Reporting Issues:
If you encounter bugs or need enhancements:

Check README.md for feature documentation
Review this deployment guide's troubleshooting section
Review admin panel audit logs for system errors
🎉 CONGRATULATIONS!
You now have a fully functional cryptocurrency trading platform with:

✅ Complete user features (trading, deposits, withdrawals, KYC)
✅ Powerful admin panel with full control
✅ Real-time market data
✅ Secure authentication system
✅ Complete audit trail
✅ Mobile-responsive design
✅ Three beautiful themes

Happy Trading! 🚀

© MEXC Trade — All Rights Reserved