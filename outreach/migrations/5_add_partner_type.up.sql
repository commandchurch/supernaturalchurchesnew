-- Add a profile type to distinguish between individual and church affiliates
ALTER TABLE affiliate_profiles ADD COLUMN IF NOT EXISTS profile_type TEXT NOT NULL DEFAULT 'individual';
