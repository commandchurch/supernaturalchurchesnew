-- Add user bonuses table for tracking MLM bonus requirements and payouts
CREATE TABLE IF NOT EXISTS user_bonuses (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    bonus_type VARCHAR(50) NOT NULL, -- silver_upgrade, bonus_500, bonus_1000, bonus_2000
    amount DECIMAL(10,2) DEFAULT 0,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    paid_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'pending', -- pending, paid, cancelled
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add signup tracking table
CREATE TABLE IF NOT EXISTS user_signups (
    id SERIAL PRIMARY KEY,
    referrer_id TEXT NOT NULL,
    new_user_id TEXT NOT NULL,
    membership_tier VARCHAR(20) NOT NULL,
    signup_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    payment_received BOOLEAN DEFAULT FALSE,
    refund_period_passed BOOLEAN DEFAULT FALSE,
    commission_eligible BOOLEAN DEFAULT FALSE,
    commission_paid BOOLEAN DEFAULT FALSE,
    commission_amount DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_bonuses_user_id ON user_bonuses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_bonuses_status ON user_bonuses(status);
CREATE INDEX IF NOT EXISTS idx_user_signups_referrer_id ON user_signups(referrer_id);
CREATE INDEX IF NOT EXISTS idx_user_signups_eligible ON user_signups(commission_eligible);

-- Add constraints
ALTER TABLE user_bonuses ADD CONSTRAINT check_bonus_type
CHECK (bonus_type IN ('silver_upgrade', 'bonus_500', 'bonus_1000', 'bonus_2000'));

ALTER TABLE user_bonuses ADD CONSTRAINT check_bonus_status
CHECK (status IN ('pending', 'paid', 'cancelled'));

ALTER TABLE user_signups ADD CONSTRAINT check_membership_tier
CHECK (membership_tier IN ('BRONZE', 'SILVER', 'GOLD', 'DIAMOND'));