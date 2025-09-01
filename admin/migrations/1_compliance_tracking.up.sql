CREATE TABLE compliance_categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE compliance_items (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT NOT NULL REFERENCES compliance_categories(id),
  name TEXT NOT NULL,
  description TEXT,
  is_required BOOLEAN NOT NULL DEFAULT true,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  completed_by TEXT,
  notes TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert compliance categories
INSERT INTO compliance_categories (name, description, icon, color, display_order) VALUES
('Child Safety', 'Child protection and safety requirements', 'Shield', 'blue', 1),
('Legal & Regulatory', 'Legal compliance and regulatory requirements', 'FileCheck', 'green', 2),
('Ministry Standards', 'Ministry and pastoral care standards', 'Users', 'purple', 3),
('Operational', 'Operational and safety procedures', 'Clock', 'orange', 4);

-- Insert compliance items for Child Safety
INSERT INTO compliance_items (category_id, name, description, is_required, display_order) VALUES
(1, 'Working with Children Check (Blue Card) - Queensland', 'Valid Blue Card for all staff and volunteers working with children', true, 1),
(1, 'Child Protection Policy Implementation', 'Comprehensive child protection policy in place and communicated', true, 2),
(1, 'Mandatory Reporter Training', 'Training for staff on mandatory reporting requirements', true, 3),
(1, 'Safe Ministry Training Certification', 'Certification in safe ministry practices', true, 4),
(1, 'Background Check Verification', 'Police background checks for all relevant personnel', true, 5);

-- Insert compliance items for Legal & Regulatory
INSERT INTO compliance_items (category_id, name, description, is_required, display_order) VALUES
(2, 'Public Liability Insurance', 'Current public liability insurance coverage', true, 1),
(2, 'Professional Indemnity Insurance', 'Professional indemnity insurance for ministry activities', true, 2),
(2, 'Charity Registration (ACNC)', 'Registration with Australian Charities and Not-for-profits Commission', true, 3),
(2, 'Tax-Exempt Status Compliance', 'Compliance with tax-exempt status requirements', true, 4),
(2, 'Privacy Policy Implementation', 'Privacy policy compliant with Australian Privacy Principles', true, 5);

-- Insert compliance items for Ministry Standards
INSERT INTO compliance_items (category_id, name, description, is_required, display_order) VALUES
(3, 'Pastoral Care Guidelines', 'Established guidelines for pastoral care and counseling', true, 1),
(3, 'Financial Transparency Reporting', 'Regular financial reporting and transparency measures', true, 2),
(3, 'Volunteer Screening Process', 'Comprehensive volunteer screening and onboarding process', true, 3),
(3, 'Emergency Response Procedures', 'Emergency response and crisis management procedures', true, 4),
(3, 'Incident Reporting System', 'System for reporting and managing incidents', true, 5);

-- Insert compliance items for Operational
INSERT INTO compliance_items (category_id, name, description, is_required, display_order) VALUES
(4, 'First Aid Certification', 'Current first aid certification for key personnel', true, 1),
(4, 'Venue Safety Compliance', 'Venue safety assessments and compliance certificates', true, 2),
(4, 'Data Protection Measures', 'Technical and administrative data protection measures', true, 3),
(4, 'Ministry Code of Conduct', 'Code of conduct for all ministry personnel', true, 4),
(4, 'Regular Compliance Audits', 'Schedule for regular compliance reviews and audits', true, 5);
