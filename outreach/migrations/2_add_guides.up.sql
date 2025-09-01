CREATE TABLE outreach_guides (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert comprehensive outreach guides
INSERT INTO outreach_guides (title, content, category, display_order) VALUES
('Getting Started with Soul Outreach', 'Welcome to Soul Outreach! This comprehensive guide will help you understand how our affiliate program works and how you can start earning while spreading the Gospel.

**What is Soul Outreach?**
Soul Outreach is Command Church''s affiliate program that allows you to earn commissions by referring new members to our community. It''s designed as a 4-level deep network where you earn from your direct referrals and their referrals up to 4 levels.

**Commission Structure:**
- Level 1 (Direct Referrals): 20% commission
- Level 2: 10% commission  
- Level 3: 5% commission
- Level 4: 2% commission

**Getting Started:**
1. Sign up for your affiliate account
2. Get your unique referral code
3. Share your referral link with friends and family
4. Start earning as people join through your link

**Important Notes:**
- Maximum earnings cap: $5,000 USDT per week
- Payments are processed weekly
- All earnings are tracked in real-time in your dashboard', 'getting-started', 1),

('Understanding Commission Levels', 'Our 4-level commission structure is designed to reward you for building a strong network while maintaining sustainable growth.

**Level 1 - Direct Referrals (20%)**
These are people you personally invite to join Command Church. You earn 20% commission on their membership fees.

**Level 2 - Second Generation (10%)**
When your direct referrals invite others, you earn 10% on those new members.

**Level 3 - Third Generation (5%)**
You continue earning 5% on the third level of your network.

**Level 4 - Fourth Generation (2%)**
The final level provides 2% commission, completing your earning potential.

**Example Calculation:**
If someone joins at $77/month membership:
- Level 1: You earn $15.40
- Level 2: You earn $7.70
- Level 3: You earn $3.85
- Level 4: You earn $1.54

**Building Your Network:**
Focus on quality over quantity. Invite people who are genuinely interested in spiritual growth and community.', 'commissions', 2),

('Effective Sharing Strategies', 'Learn how to share your referral link effectively while maintaining authentic relationships and Gospel integrity.

**Personal Approach:**
- Share your testimony about how Command Church has impacted your life
- Invite friends to specific events or teachings first
- Let them experience the community before mentioning the affiliate opportunity

**Digital Sharing:**
- Post about teachings that have blessed you
- Share event announcements with your referral link
- Create content about your spiritual growth journey

**What NOT to Do:**
- Don''t spam people with your link
- Don''t focus only on the money aspect
- Don''t pressure people to join
- Don''t misrepresent the program or earnings

**Building Trust:**
- Be transparent about the affiliate program
- Focus on the spiritual benefits first
- Share genuine experiences and testimonies
- Provide value before asking for anything

**Follow-Up:**
- Check in with people you''ve invited
- Help them get connected to the community
- Answer questions about the church and programs
- Celebrate their spiritual growth', 'sharing', 3),

('Withdrawal Process & Requirements', 'Understanding how to withdraw your earnings and what requirements must be met.

**Minimum Withdrawal:**
- Minimum withdrawal amount: $50 USDT
- Withdrawals processed weekly on Fridays
- Funds typically arrive within 24-48 hours

**Withdrawal Methods:**
- USDT (TRC20) - Recommended
- Bitcoin (BTC)
- Ethereum (ETH)
- Bank transfer (for amounts over $500)

**Requirements:**
- Account must be active for at least 30 days
- Must have completed identity verification
- Wallet address must be verified
- No pending disputes or issues

**Processing Timeline:**
- Request submitted: Immediate confirmation
- Review period: 1-2 business days
- Processing: 1-2 business days
- Funds received: 24-48 hours after processing

**Important Notes:**
- Ensure your wallet address is correct
- Double-check the network (TRC20 for USDT)
- Keep records of all transactions
- Contact support for any issues

**Tax Considerations:**
- You are responsible for reporting earnings
- Keep detailed records of all commissions
- Consult with a tax professional if needed', 'withdrawals', 4),

('Building Long-term Success', 'Strategies for creating sustainable income through Soul Outreach while maintaining Gospel integrity.

**Focus on Relationships:**
Success in Soul Outreach comes from building genuine relationships, not just collecting referrals.

**Provide Value:**
- Share valuable content from Command Church
- Help people in their spiritual journey
- Be a connector and encourager
- Offer prayer and support

**Consistency is Key:**
- Regular engagement with your network
- Consistent sharing of church content
- Ongoing relationship building
- Continuous learning and growth

**Leadership Development:**
- Help your referrals become successful too
- Teach them the strategies that work
- Support their growth and development
- Create a culture of mutual success

**Avoiding Burnout:**
- Don''t make it all about the money
- Keep your spiritual life as the priority
- Take breaks when needed
- Celebrate small wins along the way

**Long-term Vision:**
Think of Soul Outreach as a ministry tool that helps fund your ability to serve God and others more effectively.

**Success Metrics:**
- Quality of relationships built
- Spiritual impact on others
- Sustainable income growth
- Personal spiritual development', 'success', 5),

('Compliance & Best Practices', 'Important guidelines to ensure you''re operating within our terms and maintaining Gospel integrity.

**Program Rules:**
- Only promote Command Church content and events
- Don''t make unrealistic income claims
- Be honest about your own results
- Follow all local laws and regulations

**Content Guidelines:**
- Keep all content family-friendly
- Maintain Christian values in all communications
- Don''t use manipulative tactics
- Focus on spiritual benefits over financial gains

**Prohibited Activities:**
- Spamming social media or email
- Creating fake accounts or profiles
- Misleading advertising or claims
- Competing with official church marketing

**Best Practices:**
- Always disclose your affiliate relationship
- Be transparent about potential earnings
- Focus on helping others first
- Maintain professional communication

**Reporting Issues:**
- Report any suspicious activity
- Contact support for guidance
- Ask questions when unsure
- Maintain open communication

**Account Maintenance:**
- Keep your information updated
- Respond to communications promptly
- Maintain active participation
- Follow all program updates

Remember: Soul Outreach is a ministry tool first, income opportunity second. Always prioritize relationships and spiritual growth over financial gain.', 'compliance', 6);
