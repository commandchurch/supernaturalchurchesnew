CREATE TABLE fund_balance (
  id BIGSERIAL PRIMARY KEY,
  total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  reserved_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  available_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE fund_needs (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  amount_needed DECIMAL(10,2) NOT NULL,
  amount_raised DECIMAL(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  urgency TEXT NOT NULL DEFAULT 'medium',
  category TEXT NOT NULL,
  deadline TIMESTAMP WITH TIME ZONE,
  created_by TEXT NOT NULL,
  approved_by TEXT,
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE fund_transactions (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  reference_id TEXT,
  status TEXT NOT NULL DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial fund balance
INSERT INTO fund_balance (total_amount, reserved_amount, available_amount) 
VALUES (847250.00, 200000.00, 647250.00);

-- Insert sample needs
INSERT INTO fund_needs (title, description, amount_needed, amount_raised, status, urgency, category, created_by, approved_by, approved_at)
VALUES 
  ('Global Mission Trip to Africa', 'Support our mission team traveling to Kenya and Uganda to plant churches and provide medical aid.', 25000.00, 8750.00, 'approved', 'high', 'missions', 'admin', 'admin', NOW()),
  ('Hurricane Relief Fund', 'Emergency supplies and shelter for families affected by recent hurricanes.', 15000.00, 12300.00, 'approved', 'urgent', 'relief', 'admin', 'admin', NOW()),
  ('Bible Translation Project', 'Fund translation of the New Testament into tribal language in Papua New Guinea.', 50000.00, 18500.00, 'approved', 'medium', 'translation', 'admin', 'admin', NOW());

-- Insert sample transactions
INSERT INTO fund_transactions (type, amount, description, reference_id)
VALUES 
  ('contribution', 5000.00, 'Monthly Partner Contribution', 'TXN001'),
  ('disbursement', -2500.00, 'Hurricane Relief Fund', 'TXN002'),
  ('contribution', 1200.00, 'Individual Donation', 'TXN003'),
  ('contribution', 750.00, 'Tithe Allocation', 'TXN004');
