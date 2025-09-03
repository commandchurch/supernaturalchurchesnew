import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";
import { validateInput, sanitizeInput, commonValidationRules } from "../auth/validation";
import { logAuditEvent, logDataModification, logSecurityEvent } from "../auth/audit";

interface SubmitPrayerRequestParams {
  name: string;
  email?: string;
  phone?: string;
  request: string;
  isUrgent: boolean;
  isPrivate: boolean;
  userId?: string;
}

interface SubmitPrayerRequestResponse {
  id: number;
  message: string;
}

// Validation rules for prayer request submission
const prayerRequestValidationRules = [
  commonValidationRules.name('name', 200),
  {
    field: 'email',
    type: 'email' as const,
    required: false
  },
  {
    field: 'phone',
    type: 'string' as const,
    required: false,
    pattern: /^[\+]?[\d\s\-\(\)]+$/,
    customError: 'phone must be a valid phone number format'
  },
  {
    field: 'request',
    type: 'string' as const,
    required: true,
    minLength: 10,
    maxLength: 2000
  },
  {
    field: 'isUrgent',
    type: 'boolean' as const,
    required: true
  },
  {
    field: 'isPrivate',
    type: 'boolean' as const,
    required: true
  }
];

// Submits a prayer request to the church
export const submitPrayerRequest = api<SubmitPrayerRequestParams, SubmitPrayerRequestResponse>(
  { expose: true, method: "POST", path: "/church/prayer-requests" },
  async ({ name, email, phone, request, isUrgent, isPrivate, userId }) => {
    // Sanitize input data
    const sanitizedData = sanitizeInput({
      name,
      email,
      phone,
      request,
      isUrgent,
      isPrivate,
      userId
    });

    // Validate input data
    const validation = validateInput(sanitizedData, prayerRequestValidationRules);
    if (!validation.isValid) {
      // Log validation failure for security monitoring
      await logSecurityEvent('invalid_input', {
        endpoint: '/church/prayer-requests',
        errors: validation.errors,
        inputData: sanitizedData
      });
      throw APIError.invalidArgument(`Validation failed: ${validation.errors.join(', ')}`);
    }
    const result = await churchDB.queryRow<{ id: number }>`
      INSERT INTO prayer_requests (name, email, phone, request, is_urgent, is_private, user_id)
      VALUES (${sanitizedData.name}, ${sanitizedData.email || null}, ${sanitizedData.phone || null}, ${sanitizedData.request}, ${sanitizedData.isUrgent}, ${sanitizedData.isPrivate}, ${sanitizedData.userId || null})
      RETURNING id
    `;

    // Log successful prayer request submission
    await logDataModification('create', 'prayer_request', result!.id.toString(), {
      name: sanitizedData.name,
      isUrgent: sanitizedData.isUrgent,
      isPrivate: sanitizedData.isPrivate
    });

    return {
      id: result!.id,
      message: "Your prayer request has been submitted. Our team will be praying for you.",
    };
  }
);
