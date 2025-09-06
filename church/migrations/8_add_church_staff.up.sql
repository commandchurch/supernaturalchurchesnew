-- Create church staff table
CREATE TABLE IF NOT EXISTS church_staff (
  id TEXT PRIMARY KEY,
  church_id TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  mobile TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  invited_at TIMESTAMP NOT NULL,
  signed_up_at TIMESTAMP,
  courses_access JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

  FOREIGN KEY (church_id) REFERENCES churches(id) ON DELETE CASCADE
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_church_staff_church_id ON church_staff(church_id);
CREATE INDEX IF NOT EXISTS idx_church_staff_email ON church_staff(email);
CREATE INDEX IF NOT EXISTS idx_church_staff_status ON church_staff(status);

-- Create church members table to link users to churches
CREATE TABLE IF NOT EXISTS church_members (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  church_id TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  joined_at TIMESTAMP NOT NULL DEFAULT NOW(),

  FOREIGN KEY (church_id) REFERENCES churches(id) ON DELETE CASCADE,
  UNIQUE(user_id, church_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_church_members_user_id ON church_members(user_id);
CREATE INDEX IF NOT EXISTS idx_church_members_church_id ON church_members(church_id);

