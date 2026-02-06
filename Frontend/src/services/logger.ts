type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogPayload {
  message: string
  data?: unknown
  source?: string
}

const isDev = import.meta.env.MODE === 'development'

function log(level: LogLevel, payload: LogPayload) {
  if (!isDev && level === 'debug') return

  const prefix = `[${level.toUpperCase()}]`
  const source = payload.source ? `[${payload.source}]` : ''

  console[level](
    `${prefix}${source} ${payload.message}`,
    payload.data ?? ''
  )
}

export const logger = {
  debug: (message: string, data?: unknown, source?: string) =>
    log('debug', { message, data, source }),

  info: (message: string, data?: unknown, source?: string) =>
    log('info', { message, data, source }),

  warn: (message: string, data?: unknown, source?: string) =>
    log('warn', { message, data, source }),

  error: (message: string, data?: unknown, source?: string) =>
    log('error', { message, data, source }),
}
