ALTER TABLE prayer_requests ADD COLUMN user_id TEXT;

-- Optional index for lookups by user
CREATE INDEX IF NOT EXISTS idx_prayer_requests_user_id ON prayer_requests(user_id);