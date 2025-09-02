-- Add comprehensive downline tracking system
CREATE TABLE IF NOT EXISTS user_downline (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    downline_user_id TEXT NOT NULL,
    membership_tier VARCHAR(20) NOT NULL,
    level INTEGER NOT NULL, -- 1-7 levels deep
    points_earned INTEGER DEFAULT 0,
    commission_rate DECIMAL(5,4) DEFAULT 0, -- e.g., 0.50 for 50%
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add downline summary table for performance
CREATE TABLE IF NOT EXISTS user_downline_summary (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    membership_tier VARCHAR(20) NOT NULL,
    total_points INTEGER DEFAULT 0,
    total_members INTEGER DEFAULT 0,
    total_commission DECIMAL(10,2) DEFAULT 0,
    next_payout_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add level breakdown table for detailed tracking
CREATE TABLE IF NOT EXISTS user_downline_levels (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    membership_tier VARCHAR(20) NOT NULL,
    level INTEGER NOT NULL, -- 1-7
    points_at_level INTEGER DEFAULT 0,
    members_at_level INTEGER DEFAULT 0,
    commission_at_level DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_downline_user_id ON user_downline(user_id);
CREATE INDEX IF NOT EXISTS idx_user_downline_level ON user_downline(level);
CREATE INDEX IF NOT EXISTS idx_user_downline_membership_tier ON user_downline(membership_tier);
CREATE INDEX IF NOT EXISTS idx_user_downline_summary_user_id ON user_downline_summary(user_id);
CREATE INDEX IF NOT EXISTS idx_user_downline_levels_user_id ON user_downline_levels(user_id);
CREATE INDEX IF NOT EXISTS idx_user_downline_levels_tier_level ON user_downline_levels(membership_tier, level);

-- Update user_points table to include membership tier categorization
ALTER TABLE user_points
ADD COLUMN IF NOT EXISTS membership_tier VARCHAR(20) DEFAULT 'BRONZE',
ADD COLUMN IF NOT EXISTS downline_level INTEGER DEFAULT 0;

-- Create function to calculate next payout date (28 days from now)
CREATE OR REPLACE FUNCTION calculate_next_payout_date()
RETURNS TIMESTAMP WITH TIME ZONE AS $$
BEGIN
    RETURN NOW() + INTERVAL '28 days';
END;
$$ LANGUAGE plpgsql;