-- Add premium flag for membership-gated content
ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_premium BOOLEAN NOT NULL DEFAULT false;

-- Certificates for completed courses
CREATE TABLE IF NOT EXISTS certificates (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  course_id BIGINT NOT NULL REFERENCES courses(id),
  issued_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  certificate_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Seed a free foundational course for new believers
INSERT INTO courses (title, description, category, duration_minutes, is_published, is_premium)
VALUES
('New Life in Jesus: Foundations', 
 'A practical start for new believers: understanding the finished work of Jesus, the power of His blood and body, healthy rhythms, what to embrace and what to avoid, and how to guard your heart, mind, and lifestyle as you grow.',
 'discipleship',
 120,
 true,
 false);

-- Mark some existing courses as premium to demonstrate gating (idempotent updates best-effort)
UPDATE courses SET is_premium = true WHERE LOWER(title) LIKE '%authority%' OR LOWER(title) LIKE '%discipleship%';
