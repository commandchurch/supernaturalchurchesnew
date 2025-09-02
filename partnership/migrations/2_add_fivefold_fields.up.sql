-- Add Five-Fold ministry type and additional fields to church_partners table
ALTER TABLE church_partners
ADD COLUMN IF NOT EXISTS ministry_type VARCHAR(20) DEFAULT 'pastor',
ADD COLUMN IF NOT EXISTS denomination VARCHAR(100),
ADD COLUMN IF NOT EXISTS city VARCHAR(100),
ADD COLUMN IF NOT EXISTS state VARCHAR(100),
ADD COLUMN IF NOT EXISTS country VARCHAR(100),
ADD COLUMN IF NOT EXISTS description TEXT;

-- Add constraint for valid ministry types
ALTER TABLE church_partners
ADD CONSTRAINT check_ministry_type 
CHECK (ministry_type IN ('apostle', 'prophet', 'evangelist', 'pastor', 'teacher'));