CREATE TABLE events (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_type TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location_id BIGINT,
  virtual_link TEXT,
  max_attendees INTEGER,
  current_attendees INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE locations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL,
  postal_code TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  phone TEXT,
  email TEXT,
  website TEXT,
  service_times JSONB,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE teachings (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL,
  featured_image_url TEXT,
  author_id TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample locations
INSERT INTO locations (name, address, city, state, country, postal_code, latitude, longitude, phone, email, service_times, is_active)
VALUES 
  ('Command Church Main Campus', '123 Faith Street', 'Los Angeles', 'CA', 'United States', '90210', 34.0522, -118.2437, '+1 (555) 123-4567', 'info@commandchurch.com', '{"sunday": ["9:00 AM", "11:00 AM", "6:00 PM"], "wednesday": ["7:00 PM"]}', true);

-- Insert sample events
INSERT INTO events (title, description, event_type, start_date, end_date, location_id, virtual_link, max_attendees, is_published)
VALUES 
  ('Sunday Service', 'Join us for worship, teaching, and fellowship as we gather to honor God and build community.', 'service', '2024-12-15 15:00:00+00', '2024-12-15 17:00:00+00', 1, 'https://youtube.com/live/commandchurch', 500, true),
  ('Healing & Miracles Conference', 'A powerful three-day conference focused on divine healing, supernatural miracles, and breakthrough. Experience God''s power in a fresh way.', 'conference', '2024-12-15 19:00:00+00', '2024-12-17 21:00:00+00', NULL, 'https://youtube.com/live/commandchurch-conference', 1000, true);

-- Insert sample teachings
INSERT INTO teachings (title, slug, content, excerpt, category, author_id, is_published, published_at)
VALUES 
  ('The Power of Healing', 'power-of-healing', 'In this teaching, we explore the biblical foundation of divine healing. The stripes bring healing resulting in the constant state of health to the physical mortal body supernaturally. Through Christ''s sacrifice, we have access to complete wholeness - spirit, soul, and body.', 'Discover the biblical foundation of divine healing and how Christ''s sacrifice provides supernatural health.', 'healing', 'admin', true, NOW()),
  ('Foundations of Discipleship', 'foundations-of-discipleship', 'True discipleship goes beyond mere church attendance. It requires a complete surrender to Christ and a commitment to following His teachings in every aspect of our lives. This teaching explores the essential elements of biblical discipleship.', 'Learn the essential elements of biblical discipleship and what it means to truly follow Christ.', 'discipleship', 'admin', true, NOW()),
  ('Evangelism in the Modern World', 'evangelism-modern-world', 'The Great Commission remains as relevant today as it was 2000 years ago. In this teaching, we explore effective methods of evangelism in our modern, digital world while maintaining the timeless truth of the Gospel.', 'Discover effective methods of evangelism for reaching people in today''s digital world.', 'evangelism', 'admin', true, NOW());
