/**
 * Audit logging utilities for security monitoring and compliance
 * Implements comprehensive audit logging as recommended by AI2 architectural review
 */

import { getAuthData } from "~encore/auth";

export interface AuditEvent {
  timestamp: string;
  userId?: string;
  userEmail?: string;
  action: string;
  resource: string;
  resourceId?: string;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  outcome: 'success' | 'failure' | 'denied';
}

/**
 * Logs security and audit events to monitoring system
 */
export async function logAuditEvent(event: Omit<AuditEvent, 'timestamp' | 'userId' | 'userEmail'>): Promise<void> {
  try {
    const auth = getAuthData();
    const auditEvent: AuditEvent = {
      ...event,
      timestamp: new Date().toISOString(),
      userId: auth?.userID,
      userEmail: auth?.email
    };

    // In a production system, this would send to a logging service like:
    // - CloudWatch Logs
    // - DataDog
    // - Elasticsearch
    // - Custom audit database

    // For now, we'll log to console with structured format
    console.log('[AUDIT]', JSON.stringify(auditEvent, null, 2));

    // TODO: Implement actual logging service integration
    // await sendToAuditService(auditEvent);

  } catch (error) {
    // Don't let audit logging failures break the main application flow
    console.error('[AUDIT_LOG_ERROR]', error);
  }
}

/**
 * Logs API access events
 */
export async function logApiAccess(
  method: string,
  path: string,
  statusCode: number,
  responseTime: number,
  details?: Record<string, any>
): Promise<void> {
  const severity = statusCode >= 400 ? 'medium' : 'low';
  const outcome = statusCode >= 200 && statusCode < 300 ? 'success' : 'failure';

  await logAuditEvent({
    action: 'api_access',
    resource: 'api_endpoint',
    resourceId: path,
    details: {
      method,
      statusCode,
      responseTime,
      ...details
    },
    severity,
    outcome
  });
}

/**
 * Logs authentication events
 */
export async function logAuthEvent(
  action: 'login' | 'logout' | 'password_change' | 'password_reset' | 'account_lockout',
  outcome: 'success' | 'failure',
  details?: Record<string, any>
): Promise<void> {
  const severity = outcome === 'failure' ? 'high' : 'low';

  await logAuditEvent({
    action: `auth_${action}`,
    resource: 'user_account',
    details,
    severity,
    outcome
  });
}

/**
 * Logs data modification events
 */
export async function logDataModification(
  action: 'create' | 'update' | 'delete',
  resource: string,
  resourceId: string,
  changes?: Record<string, any>,
  outcome: 'success' | 'failure' = 'success'
): Promise<void> {
  const severity = action === 'delete' ? 'high' : 'medium';

  await logAuditEvent({
    action: `data_${action}`,
    resource,
    resourceId,
    details: changes,
    severity,
    outcome
  });
}

/**
 * Logs security events
 */
export async function logSecurityEvent(
  event: 'suspicious_activity' | 'rate_limit_exceeded' | 'invalid_input' | 'sql_injection_attempt' | 'xss_attempt',
  details: Record<string, any>
): Promise<void> {
  await logAuditEvent({
    action: `security_${event}`,
    resource: 'security_system',
    details,
    severity: 'high',
    outcome: 'denied'
  });
}

/**
 * Logs admin actions
 */
export async function logAdminAction(
  action: string,
  resource: string,
  resourceId?: string,
  details?: Record<string, any>
): Promise<void> {
  await logAuditEvent({
    action: `admin_${action}`,
    resource,
    resourceId,
    details,
    severity: 'high',
    outcome: 'success'
  });
}

/**
 * Middleware function for automatic API audit logging
 */
export function withAuditLogging<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  action: string,
  resource: string,
  resourceIdFn?: (args: T, result?: R) => string
) {
  return async (...args: T): Promise<R> => {
    const startTime = Date.now();

    try {
      const result = await fn(...args);
      const responseTime = Date.now() - startTime;

      // Log successful operation
      await logAuditEvent({
        action,
        resource,
        resourceId: resourceIdFn ? resourceIdFn(args, result) : undefined,
        details: { responseTime },
        severity: 'low',
        outcome: 'success'
      });

      return result;
    } catch (error) {
      const responseTime = Date.now() - startTime;

      // Log failed operation
      await logAuditEvent({
        action,
        resource,
        details: {
          responseTime,
          error: error instanceof Error ? error.message : 'Unknown error'
        },
        severity: 'medium',
        outcome: 'failure'
      });

      throw error;
    }
  };
}
