CREATE TABLE prayer_requests (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  request TEXT NOT NULL,
  is_urgent BOOLEAN NOT NULL DEFAULT false,
  is_private BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add some sample prayer requests
INSERT INTO prayer_requests (name, email, request, is_urgent, is_private, status)
VALUES 
  ('Sarah Johnson', 'sarah@email.com', 'Please pray for my mother who is in the hospital recovering from surgery. She needs God''s healing touch.', true, false, 'pending'),
  ('Michael Chen', 'michael@email.com', 'Seeking God''s direction for my career. I have a big decision to make and need His wisdom.', false, false, 'pending'),
  ('Anonymous', null, 'Please pray for my marriage. We are going through a difficult time and need God''s intervention.', false, true, 'pending'),
  ('David Rodriguez', 'david@email.com', 'My teenage son is struggling with addiction. Please pray for his deliverance and our family.', true, false, 'praying'),
  ('Lisa Thompson', 'lisa@email.com', 'Thank you for praying for my job interview last week. I got the position! Praise God!', false, false, 'answered');
