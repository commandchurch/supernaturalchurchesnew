ALTER TABLE events ADD COLUMN IF NOT EXISTS location_name TEXT;
ALTER TABLE events DROP COLUMN IF EXISTS location_id;
ALTER TABLE events DROP COLUMN IF EXISTS max_attendees;
ALTER TABLE events DROP COLUMN IF EXISTS current_attendees;
ALTER TABLE events ALTER COLUMN end_date DROP NOT NULL;

-- Update existing events with a location name
UPDATE events SET location_name = 'Online' WHERE virtual_link IS NOT NULL AND location_name IS NULL;

-- Insert a new sample event as requested
INSERT INTO events (title, description, event_type, start_date, end_date, location_name, virtual_link, is_published)
SELECT 'Sunday Service Live Stream', 'Join us for worship, teaching, and fellowship as we gather to honor God and build community.', 'service', '2024-12-22 18:00:00+10', '2024-12-22 19:30:00+10', 'Maroochydore, QLD', 'https://youtube.com/live/commandchurch', true
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title = 'Sunday Service Live Stream');
