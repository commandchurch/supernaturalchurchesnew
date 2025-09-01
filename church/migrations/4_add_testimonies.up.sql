CREATE TABLE IF NOT EXISTS testimonies (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  content_text TEXT,
  video_url TEXT,
  consent_public BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewer_id TEXT
);

CREATE INDEX IF NOT EXISTS idx_testimonies_status ON testimonies(status);
