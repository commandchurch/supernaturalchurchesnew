import emailjs from '@emailjs/browser';

// EmailJS Configuration from environment variables
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS
if (PUBLIC_KEY) {
  emailjs.init(PUBLIC_KEY);
}

export interface EmailData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  form_type?: string;
  additional_data?: Record<string, any>;
}

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  try {
    const templateParams = {
      from_name: data.from_name,
      from_email: data.from_email,
      to_email: 'contact@supernaturalchurches.org',
      subject: data.subject,
      message: data.message,
      form_type: data.form_type || 'General Inquiry',
      additional_data: JSON.stringify(data.additional_data || {}, null, 2),
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

// Specific functions for different form types
export const sendContactForm = async (name: string, email: string, message: string) => {
  return sendEmail({
    from_name: name,
    from_email: email,
    subject: 'New Contact Form Submission',
    message,
    form_type: 'Contact Form'
  });
};

export const sendPrayerRequest = async (name: string, email: string, request: string) => {
  return sendEmail({
    from_name: name,
    from_email: email,
    subject: 'New Prayer Request',
    message: request,
    form_type: 'Prayer Request'
  });
};

export const sendTestimony = async (name: string, email: string, testimony: string) => {
  return sendEmail({
    from_name: name,
    from_email: email,
    subject: 'New Testimony Submission',
    message: testimony,
    form_type: 'Testimony'
  });
};

export const sendFundingRequest = async (name: string, email: string, details: string) => {
  return sendEmail({
    from_name: name,
    from_email: email,
    subject: 'New Funding Request',
    message: details,
    form_type: 'Funding Request'
  });
};

export const sendPartnershipApplication = async (name: string, email: string, details: any) => {
  return sendEmail({
    from_name: name,
    from_email: email,
    subject: 'New Partnership Application',
    message: `Church partnership application received. Details: ${JSON.stringify(details, null, 2)}`,
    form_type: 'Partnership Application',
    additional_data: details
  });
};
