-- Update membership plan features to latest spec.

-- RECRUIT
UPDATE subscription_plans
SET
  features = '[
    "Private Telegram group access",
    "Access to all school (premium) courses",
    "Weekly community updates",
    "5% Promo discount on merch"
  ]'::jsonb
WHERE code = 'RECRUIT';

-- PRIVATE
UPDATE subscription_plans
SET
  features = '[
    "Private Telegram group access",
    "Access to all school (premium) courses",
    "Fortnightly Q&A Meetings",
    "Monthly live group Q&A with leadership",
    "Exclusive member content"
  ]'::jsonb
WHERE code = 'PRIVATE';

-- CAPTAIN
UPDATE subscription_plans
SET
  features = '[
    "Private Telegram group access",
    "Access to all school (premium) courses",
    "Fortnightly live group Q&A with leadership",
    "Affiliate commission up to 5 levels (20%, 10%, 5%, 2%, 1%)"
  ]'::jsonb
WHERE code = 'CAPTAIN';

-- COMMANDO
UPDATE subscription_plans
SET
  features = '[
    "Private Telegram group access",
    "Access to all school (premium) courses",
    "Quarterly 1-on-1 strategy session with Apostle Samuel Waterhouse",
    "Free access to all paid events & summits",
    "Affiliate commission up to 7 levels (20%, 10%, 5%, 2%, 1%, 1%, 1%)",
    "Affiliate earnings cap: $10,000 USDT per month (normally capped at $5,000 USDT per month)"
  ]'::jsonb
WHERE code = 'COMMANDO';
