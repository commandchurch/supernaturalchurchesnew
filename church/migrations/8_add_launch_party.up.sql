-- Add a launch party event
INSERT INTO events (title, description, event_type, start_date, end_date, location_name, virtual_link, is_published)
VALUES 
  ('Command Church Launch Party & Outreach!', 'Join us as we officially launch Command Church! A night of powerful worship, vision casting, and outreach to the community. Come celebrate what God is doing!', 'gathering', '2025-02-01 18:00:00+10', '2025-02-01 21:00:00+10', 'Maroochydore, QLD', 'https://youtube.com/live/commandchurch-launch', true);

-- Add a new teaching with a video URL
INSERT INTO teachings (title, slug, content, excerpt, category, author_id, is_published, published_at)
VALUES 
  ('Walking in Supernatural Power', 'walking-in-power', 'This teaching unpacks the believer''s authority and how to walk in the supernatural power that Jesus promised. Learn to move beyond theory and into active demonstration of God''s kingdom.', 'Learn to move beyond theory and into active demonstration of God''s kingdom.', 'discipleship', 'admin', true, NOW());
