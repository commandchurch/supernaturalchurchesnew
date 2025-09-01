CREATE TABLE IF NOT EXISTS legal_documents (
  id BIGSERIAL PRIMARY KEY,
  document_type TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO legal_documents (document_type, content)
VALUES ('soul-outreach-terms', '## Soul Outreach Program - Terms & Conditions

**1. Introduction**
Welcome to the Soul Outreach Program ("Program"). This Program is designed to reward individuals ("Affiliates") for spreading the Gospel by referring new members to Command Church. By participating in the Program, you agree to these Terms & Conditions ("Terms").

**2. Eligibility**
- You must be at least 18 years old.
- You must complete the "Evangelism Essentials" training course.
- You must agree to these Terms and our Statement of Faith.

**3. Commission Structure**
- Level 1: 20%
- Level 2: 10%
- Level 3: 5%
- Level 4: 2%

**4. Payouts**
- Payouts are made weekly.
- Maximum weekly payout is $5,000 USDT.
- A valid USDT (TRC20) wallet address must be provided.

**5. Conduct**
- Affiliates must represent Command Church with integrity and honor.
- No spamming or unsolicited marketing is permitted.
- Do not make income guarantees.

**6. Termination**
Command Church reserves the right to terminate your participation in the Program at any time for violation of these Terms.

By clicking "Agree & Join", you acknowledge that you have read, understood, and agree to be bound by these Terms.')
ON CONFLICT (document_type) DO NOTHING;
