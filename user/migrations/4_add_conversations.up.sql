-- Add conversation system for support tickets and prayer requests
CREATE TABLE IF NOT EXISTS ticket_conversations (
    id SERIAL PRIMARY KEY,
    ticket_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    message TEXT NOT NULL,
    is_from_support BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prayer_conversations (
    id SERIAL PRIMARY KEY,
    prayer_request_id INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    message TEXT NOT NULL,
    is_from_prayer_team BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add ticket ratings and status updates
ALTER TABLE support_tickets
ADD COLUMN IF NOT EXISTS rating INTEGER CHECK (rating >= 1 AND rating <= 5),
ADD COLUMN IF NOT EXISTS resolved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS resolution_status VARCHAR(20) DEFAULT 'open' CHECK (resolution_status IN ('open', 'resolved', 'unresolved', 'closed'));

-- Add prayer request ratings and status updates
ALTER TABLE prayer_requests
ADD COLUMN IF NOT EXISTS rating INTEGER CHECK (rating >= 1 AND rating <= 5),
ADD COLUMN IF NOT EXISTS resolved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS resolution_status VARCHAR(20) DEFAULT 'open' CHECK (resolution_status IN ('open', 'resolved', 'unresolved', 'closed'));

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_ticket_conversations_ticket_id ON ticket_conversations(ticket_id);
CREATE INDEX IF NOT EXISTS idx_ticket_conversations_created_at ON ticket_conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_prayer_conversations_prayer_request_id ON prayer_conversations(prayer_request_id);
CREATE INDEX IF NOT EXISTS idx_prayer_conversations_created_at ON prayer_conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_support_tickets_resolution_status ON support_tickets(resolution_status);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_resolution_status ON prayer_requests(resolution_status);