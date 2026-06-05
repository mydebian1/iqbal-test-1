const ACCESS_TOKEN_COOKIE = 'cabline_driver_access_token'
const REFRESH_TOKEN_COOKIE = 'cabline_driver_refresh_token'
const SESSION_COOKIE = 'cabline_driver_session'

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
}

export const getAccessToken = (event) => getCookie(event, ACCESS_TOKEN_COOKIE)

export const getDriverSession = (event) => {
  const value = getCookie(event, SESSION_COOKIE)
  if (!value) return null

  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export const setAuthCookies = (event, tokens, session) => {
  const maxAge = Number(tokens?.expires_in || 3600)

  setCookie(event, ACCESS_TOKEN_COOKIE, tokens.access_token, {
    ...cookieOptions,
    maxAge,
  })

  if (tokens.refresh_token) {
    setCookie(event, REFRESH_TOKEN_COOKIE, tokens.refresh_token, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 14,
    })
  }

  setCookie(event, SESSION_COOKIE, JSON.stringify(session), {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 14,
  })
}

export const clearAuthCookies = (event) => {
  deleteCookie(event, ACCESS_TOKEN_COOKIE, { path: '/' })
  deleteCookie(event, REFRESH_TOKEN_COOKIE, { path: '/' })
  deleteCookie(event, SESSION_COOKIE, { path: '/' })
}
