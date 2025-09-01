ALTER TABLE fund_needs ADD COLUMN IF NOT EXISTS contact_name TEXT;
ALTER TABLE fund_needs ADD COLUMN IF NOT EXISTS contact_email TEXT;
ALTER TABLE fund_needs ADD COLUMN IF NOT EXISTS contact_phone TEXT;
ALTER TABLE fund_needs ADD COLUMN IF NOT EXISTS organization_name TEXT;
ALTER TABLE fund_needs ADD COLUMN IF NOT EXISTS justification TEXT;

-- Update existing records with default values
UPDATE fund_needs SET 
  contact_name = 'Admin Team',
  contact_email = 'admin@commandchurch.com',
  justification = 'Ministry approved funding need'
WHERE contact_name IS NULL;
