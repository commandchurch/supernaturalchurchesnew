-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create plans table if it doesn't exist
CREATE TABLE IF NOT EXISTS subscription_plans (
  id BIGSERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL, -- e.g., RECRUIT, PRIVATE, CAPTAIN, COMMANDO
  name TEXT NOT NULL,
  price_monthly DECIMAL(10,2) NOT NULL,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table if it doesn't exist
CREATE TABLE IF NOT EXISTS subscriptions (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_code TEXT NOT NULL REFERENCES subscription_plans(code) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'active', -- active, canceled, past_due
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  renews_at TIMESTAMP WITH TIME ZONE,
  canceled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Clear existing plans first to avoid conflicts
DELETE FROM subscription_plans;

-- Seed membership plans with the exact names and pricing requested
INSERT INTO subscription_plans (code, name, price_monthly, features) VALUES
('RECRUIT', 'The Recruit', 27.00, '[
  "Access to all free courses",
  "Weekly community updates", 
  "Early announcements on events",
  "Basic prayer support"
]'),
('PRIVATE', 'The Private', 77.00, '[
  "Everything in The Recruit",
  "Access to all premium courses",
  "Monthly live group Q&A with leadership",
  "Priority prayer requests",
  "Exclusive member content"
]'),
('CAPTAIN', 'The Captain', 147.00, '[
  "Everything in The Private", 
  "Bi-weekly small-group mentoring calls",
  "Access to advanced ministry labs",
  "Direct messaging with leadership team",
  "Special event invitations"
]'),
('COMMANDO', 'The Commando', 347.00, '[
  "Everything in The Captain",
  "Quarterly 1-on-1 strategy session",
  "Free access to all paid events & summits",
  "Personal ministry consultation",
  "VIP access to all content and events"
]');
