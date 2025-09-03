/**
 * Input validation utilities for frontend and API security
 * Implements comprehensive validation patterns as recommended by AI2 architectural review
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ValidationRule {
  field: string;
  type: 'string' | 'email' | 'number' | 'boolean' | 'date' | 'url';
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (value: any) => boolean;
  customError?: string;
}

/**
 * Validates input data against a set of validation rules
 */
export function validateInput(data: Record<string, any>, rules: ValidationRule[]): ValidationResult {
  const errors: string[] = [];

  for (const rule of rules) {
    const value = data[rule.field];
    const fieldName = rule.field.replace(/([A-Z])/g, ' $1').toLowerCase();

    // Check required fields
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors.push(`${fieldName} is required`);
      continue;
    }

    // Skip validation if field is not required and empty
    if (!rule.required && (value === undefined || value === null || value === '')) {
      continue;
    }

    // Type validation
    switch (rule.type) {
      case 'string':
        if (typeof value !== 'string') {
          errors.push(`${fieldName} must be a string`);
        } else {
          if (rule.minLength && value.length < rule.minLength) {
            errors.push(`${fieldName} must be at least ${rule.minLength} characters long`);
          }
          if (rule.maxLength && value.length > rule.maxLength) {
            errors.push(`${fieldName} must be no more than ${rule.maxLength} characters long`);
          }
          if (rule.pattern && !rule.pattern.test(value)) {
            errors.push(rule.customError || `${fieldName} format is invalid`);
          }
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof value !== 'string' || !emailRegex.test(value)) {
          errors.push(`${fieldName} must be a valid email address`);
        }
        break;

      case 'number':
        if (typeof value !== 'number' && isNaN(Number(value))) {
          errors.push(`${fieldName} must be a valid number`);
        }
        break;

      case 'boolean':
        if (typeof value !== 'boolean') {
          errors.push(`${fieldName} must be true or false`);
        }
        break;

      case 'date':
        if (isNaN(Date.parse(value))) {
          errors.push(`${fieldName} must be a valid date`);
        }
        break;

      case 'url':
        try {
          new URL(value);
        } catch {
          errors.push(`${fieldName} must be a valid URL`);
        }
        break;
    }

    // Custom validation
    if (rule.customValidator && !rule.customValidator(value)) {
      errors.push(rule.customError || `${fieldName} failed custom validation`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Sanitizes input data by trimming strings and removing potentially dangerous content
 */
export function sanitizeInput(data: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Trim whitespace and remove potential XSS vectors
      sanitized[key] = value.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Common validation rules for different data types
 */
export const commonValidationRules = {
  email: (field: string, required = true): ValidationRule => ({
    field,
    type: 'email',
    required
  }),

  password: (field: string, minLength = 8): ValidationRule => ({
    field,
    type: 'string',
    required: true,
    minLength,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    customError: `${field} must contain at least one lowercase letter, one uppercase letter, and one number`
  }),

  name: (field: string, maxLength = 100): ValidationRule => ({
    field,
    type: 'string',
    required: true,
    maxLength,
    pattern: /^[a-zA-Z\s\-']+$/,
    customError: `${field} can only contain letters, spaces, hyphens, and apostrophes`
  }),

  description: (field: string, maxLength = 1000): ValidationRule => ({
    field,
    type: 'string',
    required: false,
    maxLength
  }),

  url: (field: string, required = false): ValidationRule => ({
    field,
    type: 'url',
    required
  }),

  slug: (field: string): ValidationRule => ({
    field,
    type: 'string',
    required: true,
    pattern: /^[a-z0-9-]+$/,
    customError: `${field} can only contain lowercase letters, numbers, and hyphens`
  })
};
