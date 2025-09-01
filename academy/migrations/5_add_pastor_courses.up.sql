-- Add new courses specifically for pastors in the partnership program
INSERT INTO courses (title, description, category, duration_minutes, is_published, is_premium)
VALUES
('How to Heal Your Congregation',
 'A practical guide for pastors on creating a church culture where healing is normal. Covers teaching, ministering, and handling difficult cases with wisdom and faith.',
 'pastoral',
 180,
 true,
 true),
('Teaching Healing Effectively',
 'Learn how to teach on divine healing in a way that builds faith and activates your congregation. This course provides sermon outlines, key scriptures, and practical examples.',
 'pastoral',
 150,
 true,
 true),
('The Command Audit: Aligning with God''s Word',
 'This course walks leaders through a self-audit process to identify areas of ministry that may have drifted from biblical standards, and provides a roadmap for realignment.',
 'pastoral',
 240,
 true,
 true)
ON CONFLICT (title) DO NOTHING;
