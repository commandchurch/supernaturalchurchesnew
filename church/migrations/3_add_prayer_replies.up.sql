CREATE TABLE IF NOT EXISTS prayer_request_replies (
  id BIGSERIAL PRIMARY KEY,
  request_id BIGINT NOT NULL REFERENCES prayer_requests(id) ON DELETE CASCADE,
  responder_name TEXT,
  responder_email TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional index for lookups by request
CREATE INDEX IF NOT EXISTS idx_prayer_replies_request_id ON prayer_request_replies(request_id);
