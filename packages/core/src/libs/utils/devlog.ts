const IS_DEV = process.env.NODE_ENV !== 'production'

export const warnDev = (...params: unknown[]): void => {
  if (IS_DEV) {
    console.warn(...params)
  }
}

export const errorDev = (...params: unknown[]): void => {
  if (IS_DEV) {
    console.error(...params)
  }
}
