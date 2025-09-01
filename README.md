# 🏛️ SUPERNATURAL INSTITUTE - Command Church Platform

## 🎉 **OPERATION: NUKE CONVEX - COMPLETE!**

**✅ SUCCESSFULLY CONVERTED TO ENCORE.DEV BACKEND**

A modern church management and outreach platform built with React, Encore.dev, and Clerk.

## Features

- 🛐 **Church Management**: Teachings, events, prayer requests, testimonies
- 🎓 **Academy**: Courses, quizzes, certifications
- 💰 **Fund Management**: Donations, funding requests, financial tracking
- 👥 **Outreach Program**: Affiliate network, referral system
- 🔐 **Membership Tiers**: Bronze, Silver, Gold, Diamond plans
- 👨‍💼 **Admin Dashboard**: Comprehensive management tools
- 📱 **Responsive Design**: Works on all devices

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Encore.dev (PostgreSQL + microservices)
- **Authentication**: Clerk
- **Payments**: Stripe
- **Deployment**: Vercel (frontend), Encore Cloud (backend)

## 🚀 **CURRENT STATUS:**
- ✅ **Backend**: Encore.dev (PostgreSQL)
- ✅ **Frontend**: Vercel deployment
- ✅ **Authentication**: Clerk integration
- ✅ **Payments**: Stripe integration
- ✅ **Database**: Real-time PostgreSQL
- ❌ **Convex**: COMPLETELY REMOVED

### 🎯 **DEPLOYMENT URLs:**
- **Frontend**: https://frontend-3la1qy5vr-commandchurchs-projects.vercel.app
- **Backend API**: https://supernatural-institute-backend-z4n2.encr.app
- **Admin Panel**: `/admin` route

## Quick Start

### Prerequisites

- Node.js 18+
- Bun or npm
- Encore CLI: `curl -L https://encore.dev/install.sh | bash`

### Installation

1. Clone the repository:
```bash
git clone https://github.com/commandchurch/supernaturalinstitute.git
cd supernaturalinstitute
```

2. Install dependencies:
```bash
cd frontend
bun install
```

3. Set up environment variables:
```bash
# Frontend (.env.local)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_aW1tdW5lLW9wb3NzdW0tNDQuY2xlcmsuYWNjb3VudHMuZGV2JA
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51RrEeWCcmcORuWflzSQTjDNoaRQSD0fXXerjSrXbnxdEthESi0V9E16CRQzqW0vNpRKB17xKODs2nB5AqPm1knjp00DSNNjhIh
VITE_CLIENT_TARGET=https://supernatural-institute-backend-z4n2.encr.app
```

4. Encore backend is already deployed:
```bash
# Backend is live at: https://supernatural-institute-backend-z4n2.encr.app
# All API endpoints are active
```

5. Deploy frontend to Vercel:
```bash
npm run deploy  # Deploys frontend, checks Encore status
```

6. Test the system:
```bash
# Visit your deployed site
# Submit prayer requests, funding requests, etc.
# Check admin panel - submissions appear immediately!
```

## Project Structure

```
supernaturalinstitute/
├── backend/               # Encore.dev backend (PostgreSQL)
│   ├── academy/          # Course management microservice
│   ├── church/           # Church services & prayer requests
│   ├── fund/             # Financial operations & donations
│   ├── membership/       # Subscription plans & billing
│   ├── outreach/         # Affiliate network & commissions
│   ├── payment/          # Stripe integration & webhooks
│   ├── partnership/      # Church partnerships
│   └── user/             # User management
├── frontend/             # React frontend (TypeScript)
│   ├── components/       # Reusable UI components
│   ├── pages/           # Route components
│   ├── hooks/           # Custom hooks
│   └── client.ts        # Encore API client
└── convex/              # REMOVED - No longer used
```

## Deployment

### ✅ **CURRENT DEPLOYMENT STATUS:**
- **Backend**: Encore.dev ✅ LIVE at https://supernatural-institute-backend-z4n2.encr.app
- **Frontend**: Vercel ✅ LIVE at https://frontend-3la1qy5vr-commandchurchs-projects.vercel.app

### Automatic Deployment

Both frontend and backend are configured for continuous deployment:

- **Backend**: Encore.dev Cloud (auto-deploys on push)
- **Frontend**: Vercel (auto-deploys on push to main branch)

### Manual Deployment

```bash
# Deploy everything (frontend + check backend)
npm run deploy

# Or deploy individually:
# Frontend only
cd frontend
bun run build
bunx vercel deploy --prod

# Backend status check
encore auth whoami
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@supernaturalinstitute.org or join our Discord community.
