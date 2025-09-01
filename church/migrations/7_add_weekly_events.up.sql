-- Add recurring weekly events for the near future.
-- Wednesday Live Stream
INSERT INTO events (title, description, event_type, start_date, end_date, location_name, virtual_link, is_published)
VALUES 
  ('Wednesday Night Live Stream', 'Join us for a powerful time of worship and teaching, live from anywhere in the world.', 'service', '2025-01-01 19:00:00+10', '2025-01-01 20:30:00+10', 'Online', 'https://youtube.com/live/commandchurch', true);

-- Sunday Service
INSERT INTO events (title, description, event_type, start_date, end_date, location_name, virtual_link, is_published)
VALUES 
  ('Sunday Evening Service', 'Experience the presence of God with our church family. A time of worship, community, and a powerful message.', 'service', '2025-01-05 18:00:00+10', '2025-01-05 19:30:00+10', 'Maroochydore, QLD', 'https://youtube.com/live/commandchurch', true);
