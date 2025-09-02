-- Add user upgrades table to track membership upgrades (especially FREE to PAID)
CREATE TABLE IF NOT EXISTS user_upgrades (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    old_tier VARCHAR(20) NOT NULL,
    new_tier VARCHAR(20) NOT NULL,
    payment_received BOOLEAN DEFAULT FALSE,
    refund_period_passed BOOLEAN DEFAULT FALSE,
    upgrade_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_upgrades_user_id ON user_upgrades(user_id);
CREATE INDEX IF NOT EXISTS idx_user_upgrades_date ON user_upgrades(upgrade_date);

-- Add constraints
ALTER TABLE user_upgrades ADD CONSTRAINT check_old_tier
CHECK (old_tier IN ('FREE', 'BRONZE', 'SILVER', 'GOLD', 'DIAMOND'));

ALTER TABLE user_upgrades ADD CONSTRAINT check_new_tier
CHECK (new_tier IN ('BRONZE', 'SILVER', 'GOLD', 'DIAMOND'));

-- Update existing user_signups table to include upgrade tracking
ALTER TABLE user_signups
ADD COLUMN IF NOT EXISTS upgraded_from_free BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS upgrade_date TIMESTAMP WITH TIME ZONE;