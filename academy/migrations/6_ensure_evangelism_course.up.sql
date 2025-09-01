-- Ensures the "Evangelism Essentials" course exists and is free for Soul Outreach program eligibility.
INSERT INTO courses (title, description, category, duration_minutes, is_published, is_premium)
VALUES
('Evangelism Essentials', 
 'Practical training for sharing the Gospel with boldness and clarity. Covering testimony sharing, Gospel frameworks, and Spirit-led outreach.',
 'evangelism',
 150,
 true,
 false)
ON CONFLICT (title) DO UPDATE SET
  is_premium = false,
  is_published = true;
