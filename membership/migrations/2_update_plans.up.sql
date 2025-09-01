-- Update membership plan pricing, names, and features to latest spec.

-- RECRUIT
UPDATE subscription_plans
SET
  name = 'THE RECRUIT',
  price_monthly = 19.00,
  features = '[
    "Private Telegram group access",
    "Access to school (free) courses",
    "Weekly community updates",
    "Early announcements on events"
  ]'::jsonb
WHERE code = 'RECRUIT';

-- PRIVATE
UPDATE subscription_plans
SET
  name = 'THE PRIVATE',
  price_monthly = 33.00,
  features = '[
    "Private Telegram group access",
    "Access to all school (premium) courses",
    "Weekly group calls",
    "Monthly live group Q&A with leadership",
    "Exclusive member content"
  ]'::jsonb
WHERE code = 'PRIVATE';

-- CAPTAIN
UPDATE subscription_plans
SET
  name = 'THE CAPTAIN',
  price_monthly = 149.00,
  features = '[
    "Private Telegram group access",
    "Access to all school (premium) courses",
    "Weekly group calls",
    "Bi-weekly small-group mentoring calls",
    "Access to advanced ministry labs",
    "Affiliate commission up to 5 levels (20%, 10%, 5%, 2%, 1%)"
  ]'::jsonb
WHERE code = 'CAPTAIN';

-- COMMANDO
UPDATE subscription_plans
SET
  name = 'THE COMMANDO',
  price_monthly = 499.00,
  features = '[
    "Private Telegram group access",
    "Access to all school (premium) courses",
    "Weekly group calls",
    "Quarterly 1-on-1 strategy session",
    "Free access to all paid events & summits",
    "Personal ministry consultation",
    "Affiliate commission up to 7 levels (20%, 10%, 5%, 2%, 1%, 1%, 1%)",
    "Affiliate earnings cap: $10,000 USDT per month"
  ]'::jsonb
WHERE code = 'COMMANDO';
