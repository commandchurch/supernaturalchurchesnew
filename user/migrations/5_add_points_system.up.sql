-- Add points-based bonus system
CREATE TABLE IF NOT EXISTS user_points (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    total_points INTEGER DEFAULT 0,
    earned_points INTEGER DEFAULT 0,
    source_type VARCHAR(50) NOT NULL, -- 'direct_signup', 'multi_level'
    source_id TEXT, -- ID of the signup or user that generated the points
    level INTEGER DEFAULT 0, -- Multi-level depth (0 for direct)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_points_user_id ON user_points(user_id);
CREATE INDEX IF NOT EXISTS idx_user_points_source ON user_points(source_type, source_id);
CREATE INDEX IF NOT EXISTS idx_user_points_level ON user_points(level);

-- Add source_level to user_bonuses for multi-level tracking
ALTER TABLE user_bonuses
ADD COLUMN IF NOT EXISTS source_level INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS payout_date TIMESTAMP WITH TIME ZONE;

-- Update user_bonuses to support 28-day arrears payment
ALTER TABLE user_bonuses
ADD COLUMN IF NOT EXISTS payment_cycle_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS payment_scheduled_for TIMESTAMP WITH TIME ZONE;

-- Create function to calculate payout dates (28 days in arrears)
CREATE OR REPLACE FUNCTION calculate_payout_date(bonus_date TIMESTAMP WITH TIME ZONE)
RETURNS TIMESTAMP WITH TIME ZONE AS $$
BEGIN
    -- Find the next 28-day cycle after bonus_date
    -- Bonuses are paid on the 28th of each month, 28 days after earning
    RETURN bonus_date + INTERVAL '28 days';
END;
$$ LANGUAGE plpgsql;

-- Update existing bonuses to have payout dates
UPDATE user_bonuses
SET payment_scheduled_for = calculate_payout_date(earned_at)
WHERE payment_scheduled_for IS NULL;

-- Create trigger to automatically set payout dates for new bonuses
CREATE OR REPLACE FUNCTION set_bonus_payout_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.payment_scheduled_for := calculate_payout_date(NEW.earned_at);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_bonus_payout_date
    BEFORE INSERT ON user_bonuses
    FOR EACH ROW
    EXECUTE FUNCTION set_bonus_payout_date();