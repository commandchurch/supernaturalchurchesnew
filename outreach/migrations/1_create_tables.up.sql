CREATE TABLE affiliate_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  sponsor_id TEXT,
  level INTEGER NOT NULL DEFAULT 1,
  total_earnings DECIMAL(10,2) NOT NULL DEFAULT 0,
  weekly_earnings DECIMAL(10,2) NOT NULL DEFAULT 0,
  rank TEXT NOT NULL DEFAULT 'Bronze',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE affiliate_referrals (
  id BIGSERIAL PRIMARY KEY,
  referrer_id TEXT NOT NULL,
  referred_id TEXT NOT NULL,
  level INTEGER NOT NULL,
  commission_rate DECIMAL(5,4) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(referrer_id, referred_id)
);

CREATE TABLE commissions (
  id BIGSERIAL PRIMARY KEY,
  affiliate_id TEXT NOT NULL,
  referred_id TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  level INTEGER NOT NULL,
  transaction_type TEXT NOT NULL,
  week_start DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE withdrawal_requests (
  id BIGSERIAL PRIMARY KEY,
  affiliate_id TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  wallet_address TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample affiliate profiles with new rank system
INSERT INTO affiliate_profiles (user_id, referral_code, level, total_earnings, weekly_earnings, rank)
VALUES 
  ('user1', 'CMD123ABC', 1, 15750.00, 1250.00, 'Diamond'),
  ('user2', 'CMD456DEF', 2, 8500.00, 750.00, 'Gold'),
  ('user3', 'CMD789GHI', 1, 12300.00, 980.00, 'Double Diamond');

-- Insert sample referrals
INSERT INTO affiliate_referrals (referrer_id, referred_id, level, commission_rate)
VALUES 
  ('user1', 'user2', 1, 0.20),
  ('user1', 'user3', 1, 0.20),
  ('user2', 'user4', 2, 0.10);

-- Insert sample commissions
INSERT INTO commissions (affiliate_id, referred_id, amount, level, transaction_type, week_start, status)
VALUES 
  ('user1', 'user2', 1250.00, 1, 'subscription', '2024-12-01', 'completed'),
  ('user1', 'user3', 980.00, 1, 'subscription', '2024-11-24', 'completed'),
  ('user2', 'user4', 450.00, 2, 'subscription', '2024-12-01', 'pending');
