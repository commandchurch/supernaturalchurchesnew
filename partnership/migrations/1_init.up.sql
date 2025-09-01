CREATE TABLE church_partners (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  contact_email TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  user_id TEXT NOT NULL, -- The user who owns the partnership subscription
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_church_partners_status ON church_partners(status);
