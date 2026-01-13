/**
 * Typed error interfaces for consistent error handling
 */

export interface APIErrorResponse {
  error: string
  code?: string
  details?: Record<string, string[]>
  timestamp?: string
}

export interface ValidationError {
  field: string
  message: string
}

export interface APISuccessResponse<T = unknown> {
  data: T
  message?: string
}

export type APIResponse<T = unknown> = APISuccessResponse<T> | APIErrorResponse

/**
 * Type guard to check if response is an error
 */
export function isAPIError(response: APIResponse): response is APIErrorResponse {
  return 'error' in response
}

/**
 * Type guard to check if response is successful
 */
export function isAPISuccess<T>(response: APIResponse<T>): response is APISuccessResponse<T> {
  return 'data' in response
}

/**
 * HTTP status codes for common scenarios
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const

export type HTTPStatus = typeof HTTP_STATUS[keyof typeof HTTP_STATUS]

/**
 * Error codes for specific scenarios
 */
export const ERROR_CODES = {
  // Authentication
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  AUTH_INVALID: 'AUTH_INVALID',
  AUTH_EXPIRED: 'AUTH_EXPIRED',

  // Authorization
  FORBIDDEN: 'FORBIDDEN',
  SUBSCRIPTION_REQUIRED: 'SUBSCRIPTION_REQUIRED',

  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',

  // Resources
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',

  // Rate limiting
  RATE_LIMITED: 'RATE_LIMITED',

  // Server
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  DATABASE_ERROR: 'DATABASE_ERROR',
} as const

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES]

/**
 * Create a standardized API error response
 */
export function createErrorResponse(
  error: string,
  code?: ErrorCode,
  details?: Record<string, string[]>
): APIErrorResponse {
  return {
    error,
    code,
    details,
    timestamp: new Date().toISOString(),
  }
}

/**
 * Create a standardized API success response
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string
): APISuccessResponse<T> {
  return {
    data,
    message,
  }
}

/**
 * Safe error message extraction for unknown errors
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'An unexpected error occurred'
}

/**
 * Safe error logging that filters PII
 */
export function safeLogError(error: unknown, context?: string): void {
  const message = getErrorMessage(error)

  // Filter potential PII from error messages
  const sanitizedMessage = message
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]')
    .replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[PHONE]')
    .replace(/\b\d{5}(-\d{4})?\b/g, '[ZIP]')

  if (context) {
    console.error(`[${context}] ${sanitizedMessage}`)
  } else {
    console.error(sanitizedMessage)
  }
}
