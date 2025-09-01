# Supernatural Institute

A modern church management and outreach platform built with React, Convex, and Clerk.

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
- **Backend**: Convex (real-time database and serverless functions)
- **Authentication**: Clerk
- **Payments**: Stripe
- **Deployment**: Vercel (frontend), Convex Cloud (backend)

## Quick Start

### Prerequisites

- Node.js 18+
- Bun or npm
- Convex CLI: `npm install -g convex`

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
VITE_CONVEX_URL=your_convex_deployment_url
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. Deploy Convex backend:
```bash
cd .. # Back to project root
npx convex deploy
```

5. Set backend environment variables:
```bash
npx convex env set CLERK_SECRET_KEY your_clerk_secret_key
npx convex env set STRIPE_SECRET_KEY your_stripe_secret_key
```

6. Seed the database:
```bash
npx convex run seed:seedDatabase
```

7. Start the development server:
```bash
cd frontend
bun run dev
```

## Project Structure

```
supernaturalinstitute/
├── convex/                 # Backend (Convex functions)
│   ├── academy.ts         # Course management
│   ├── church.ts          # Church services
│   ├── fund.ts            # Financial operations
│   ├── membership.ts      # Subscription plans
│   ├── outreach.ts        # Affiliate system
│   ├── payments.ts        # Stripe integration
│   └── schema.ts          # Database schema
├── frontend/              # React frontend
│   ├── components/        # Reusable components
│   ├── pages/            # Route components
│   └── hooks/            # Custom hooks
└── backend_legacy/       # Old Encore backend (quarantined)
```

## Deployment

### Automatic Deployment

Both frontend and backend are configured for automatic deployment:

- **Backend**: Deploys to Convex Cloud on push
- **Frontend**: Deploys to Vercel on push

### Manual Deployment

```bash
# Deploy backend
npx convex deploy

# Deploy frontend
cd frontend
bun run build
bunx vercel deploy --prod
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
