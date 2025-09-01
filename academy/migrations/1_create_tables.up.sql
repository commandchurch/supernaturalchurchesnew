CREATE TABLE courses (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  thumbnail_url TEXT,
  video_url TEXT,
  pdf_url TEXT,
  duration_minutes INTEGER,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE course_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  course_id BIGINT NOT NULL REFERENCES courses(id),
  progress_percentage INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Insert sample courses
INSERT INTO courses (title, description, category, duration_minutes, is_published)
VALUES 
  ('Healing 101: Divine Health', 'This foundational course explores God''s will for divine healing and living in health daily. In this course we emphasize the finished work of Christ and the believer''s authority. The stripes bring healing resulting in the constant state of health to the physical mortal body supernaturally. Expect clear scripture study, testimonies, and practical activation steps.', 'healing', 180, true),
  ('Discipleship Foundations', 'A comprehensive introduction to biblical discipleship: identity in Christ, spiritual disciplines, community, and mission. Learn how to follow Jesus closely and multiply disciples.', 'discipleship', 240, true),
  ('Evangelism Essentials', 'Practical training for sharing the Gospel with boldness and clarity. Covering testimony sharing, Gospel frameworks, and Spirit-led outreach.', 'evangelism', 150, true),
  ('Authority & Healing', 'Deep dive into the believer''s authority in Christ and how to minister healing to others. Includes practical activation and the Jesus the Healer Challenge methodology.', 'healing', 200, true);
