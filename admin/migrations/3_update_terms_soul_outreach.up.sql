-- Update Soul Outreach terms to reflect new levels, caps, and requirements.

UPDATE legal_documents
SET
  content = '## Soul Outreach Program - Terms & Conditions

1. Introduction
Welcome to the Soul Outreach Program ("Program"). This Program is designed to reward individuals ("Affiliates") for spreading the Gospel by referring new members to Command Church. By participating in the Program, you agree to these Terms & Conditions ("Terms").

2. Eligibility
- You must be at least 18 years old.
- You must complete the "Evangelism Essentials" training course.
- You must agree to these Terms and our Statement of Faith.

3. Commission Structure
- Base structure for all tiers starts at:
  - Level 1 (Direct): 20%
  - Level 2: 10%
  - Level 3: 5%
  - Level 4: 2%
- THE CAPTAIN tier extends your network to 5 levels total:
  - Levels 1–4 as above, plus Level 5: 1%
- THE COMMANDO tier extends your network to 7 levels total:
  - Levels 1–4 as above, plus Levels 5–7: 1% each

4. Payouts & Caps
- Payouts are tracked and processed on a periodic basis.
- THE COMMANDO tier has an earnings cap of $10,000 USDT per calendar month.
- Other tiers are subject to program rules and risk controls that may be updated.
- A valid USDT (TRC20) wallet address must be provided for payouts.

5. Ongoing Activity Requirement
- To maintain eligibility for receiving commissions, every affiliate must win a minimum of one (1) soul per month (documented decision for Christ).
- Failure to meet this requirement may pause commission eligibility for the next payout period until activity is restored.

6. Conduct
- Affiliates must represent Command Church with integrity and honor.
- No spamming or unsolicited marketing is permitted.
- Do not make income guarantees or misleading claims.
- Always disclose your affiliate relationship where applicable.

7. Training Prerequisite
- Completion of the free "Evangelism Essentials" training is required prior to joining the Program.

8. Termination
Command Church reserves the right to terminate or suspend your participation in the Program at any time for violation of these Terms or for behavior inconsistent with our values.

By clicking "Agree & Join", you acknowledge that you have read, understood, and agree to be bound by these Terms.',
  version = version + 1,
  updated_at = NOW()
WHERE document_type = 'soul-outreach-terms';
