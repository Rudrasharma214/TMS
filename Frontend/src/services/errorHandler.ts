import { logger } from './logger'

export interface AppError {
  message: string
  status?: number
}

/**
 * Global error normalizer
 * Use everywhere (API, services, hooks, UI)
 */
export function handleError(error: unknown, source?: string): AppError {
  // Axios / HTTP error
  if (isHttpError(error)) {
    const appError: AppError = {
      message: error.response?.data?.message || 'Something went wrong',
      status: error.response?.status,
    }

    logger.error(appError.message, error, source)
    return appError
  }

  // Standard JS error
  if (error instanceof Error) {
    logger.error(error.message, error, source)
    return { message: error.message }
  }

  // Fallback (unknown error)
  logger.error('Unknown error', error, source)
  return { message: 'Something went wrong' }
}

function isHttpError(error: any): error is {
  response?: {
    status?: number
    data?: {
      message?: string
    }
  }
} {
  return typeof error === 'object' && error !== null && 'response' in error
}
