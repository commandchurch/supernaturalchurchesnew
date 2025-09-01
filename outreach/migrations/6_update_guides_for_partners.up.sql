-- Update Soul Outreach guides to mention the Church Partnership program
UPDATE outreach_guides
SET content = content || '

**For Churches and Ministries:**
We offer a dedicated Ministry Partnership Program for churches looking for spiritual eldership and growth tools. This includes a unique 3-tier affiliate structure (20%/10%/5%) designed to provide financial support for your ministry. Visit our Partnership page to learn more.'
WHERE category = 'getting-started';
