-- Update Soul Outreach terms to include a disclaimer for nonprofit entities.
UPDATE legal_documents
SET
  content = content || '

9. For Nonprofit Entities
If you are participating as a registered nonprofit or church entity, you acknowledge that any commissions earned are considered ministry support grants. These funds are provided to support your ministry activities and are not personal income for any individual. You are responsible for ensuring compliance with all applicable laws and regulations regarding your tax-exempt status and the receipt of such funds.',
  version = version + 1,
  updated_at = NOW()
WHERE document_type = 'soul-outreach-terms';
