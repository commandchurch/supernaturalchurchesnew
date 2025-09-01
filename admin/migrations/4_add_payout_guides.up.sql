CREATE TABLE IF NOT EXISTS admin_guides (
  id BIGSERIAL PRIMARY KEY,
  guide_key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO admin_guides (guide_key, title, category, content) VALUES
('payouts-australia', 'Payouts Guide: Australia (BSB/ACC)', 'Payouts', '
## Payouts Guide for Australian Affiliates (BSB/ACC)

This guide outlines the process for handling payout requests for affiliates based in Australia who have provided BSB and Account Number details.

**Current Process: Manual Bank Transfer**

Until full automation with Stripe Connect is complete, this is a manual process.

**Step 1: Review Withdrawal Request**
- Go to the "Soul Outreach" tab in the admin dashboard.
- Navigate to the "Withdrawals" section.
- Identify pending requests from Australian affiliates. Their payout details (BSB/ACC) will be visible in their user profile.

**Step 2: Verify Affiliate Details**
- Cross-reference the User ID with the `user_profiles` table or the User Management section to get their full name and saved BSB/Account Number.
- Ensure the amount requested is available in their commission balance.

**Step 3: Perform Manual Bank Transfer**
- Log in to the ministry''s business bank account.
- Create a new payment to the affiliate''s BSB and Account Number.
- Use a clear reference, such as "CMD Payout [User ID] [Date]".
- **CRITICAL:** Double-check all details before submitting the transfer.

**Step 4: Approve the Withdrawal in Admin Dashboard**
- Once the bank transfer is successfully submitted, return to the "Withdrawals" section.
- Click the "Approve" button next to the corresponding request.
- This will mark the request as "completed" and record the transaction time. This is a crucial step for record-keeping.

**Future Automation (Stripe Connect)**
- We are working on integrating Stripe Connect, which will automate this entire process.
- Affiliates will onboard directly with Stripe, and payouts will be triggered via an API call, handling compliance and transfers automatically.
'),
('payouts-international', 'Payouts Guide: International (USDT)', 'Payouts', '
## Payouts Guide for International Affiliates (USDT)

This guide outlines the process for handling payout requests for international affiliates who have provided a USDT (TRC20) wallet address.

**Current Process: Manual Crypto Transfer**

**Step 1: Review Withdrawal Request**
- Go to the "Soul Outreach" tab in the admin dashboard.
- Navigate to the "Withdrawals" section.
- Identify pending requests. The affiliate''s USDT (TRC20) wallet address will be listed.

**Step 2: Verify Affiliate Details**
- Cross-reference the User ID to ensure the request is legitimate.
- Check their commission balance to ensure funds are available.

**Step 3: Perform Manual USDT Transfer**
- Log in to the ministry''s cryptocurrency exchange or wallet (e.g., Binance, KuCoin, hardware wallet).
- Initiate a withdrawal/transfer of USDT.
- **CRITICAL:** Ensure you are sending on the **TRC20 (Tron) network**. Sending on the wrong network will result in permanent loss of funds.
- Copy and paste the affiliate''s wallet address from the admin dashboard. **TRIPLE-CHECK THE ADDRESS.**
- Enter the requested amount and complete the transfer. Note any transaction fees.

**Step 4: Approve the Withdrawal in Admin Dashboard**
- Once the crypto transfer is confirmed on the blockchain, return to the "Withdrawals" section.
- Click the "Approve" button next to the corresponding request.
- This marks the request as "completed" and serves as our internal record that the payment has been sent.
');
