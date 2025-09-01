CREATE TABLE IF NOT EXISTS staff_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT,
  mobile TEXT,
  paid BOOLEAN NOT NULL DEFAULT FALSE,
  avatar_url TEXT,
  drivers_license_front_url TEXT,
  wants_children_work BOOLEAN NOT NULL DEFAULT FALSE,
  wants_ministry_team BOOLEAN NOT NULL DEFAULT FALSE,
  blue_card_number TEXT,
  blue_card_expiry DATE,
  policy_acknowledged BOOLEAN NOT NULL DEFAULT FALSE,
  background_check_completed BOOLEAN NOT NULL DEFAULT FALSE,
  police_check_completed BOOLEAN NOT NULL DEFAULT FALSE,
  training_completed_manual BOOLEAN NOT NULL DEFAULT FALSE,
  documents JSONB NOT NULL DEFAULT '{}'::jsonb,
  forms_last_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_staff_paid ON staff_profiles(paid);
CREATE INDEX IF NOT EXISTS idx_staff_wants_children ON staff_profiles(wants_children_work);
CREATE INDEX IF NOT EXISTS idx_staff_wants_ministry ON staff_profiles(wants_ministry_team);
