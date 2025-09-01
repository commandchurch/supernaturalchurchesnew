-- Add the Church Partnership plan
INSERT INTO subscription_plans (code, name, price_monthly, features)
VALUES
('PARTNER', 'Church Partnership', 800.00, '[
  "Monthly strategic pastor meetings",
  "Full access to Pastors Academy courses",
  "Bi-annual Command Audit for your ministry",
  "Spiritual eldership and discipleship for leadership",
  "3-Level Affiliate Network (20%/10%/5%)",
  "Max $10,000/mo affiliate payout",
  "Featured on our website as a partner church",
  "Niche Ministry Growth Package"
]')
ON CONFLICT (code) DO UPDATE SET
  features = '[
  "Monthly strategic pastor meetings",
  "Full access to Pastors Academy courses",
  "Bi-annual Command Audit for your ministry",
  "Spiritual eldership and discipleship for leadership",
  "3-Level Affiliate Network (20%/10%/5%)",
  "Max $10,000/mo affiliate payout",
  "Featured on our website as a partner church",
  "Niche Ministry Growth Package"
  ]';
