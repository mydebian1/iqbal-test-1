import { getApiConfig, upstreamMessage } from '~/server/utils/api-config'
import { setAuthCookies } from '~/server/utils/auth-cookies'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const tenantId = Number(body?.tenant_id)
  const username = String(body?.username || '').trim()
  const password = String(body?.password || '')

  if (!tenantId || !username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Company code, email and password are required',
    })
  }

  const api = getApiConfig(useRuntimeConfig())

  try {
    const tokens = await $fetch(api.endpoints.authLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        tenant_id: tenantId,
        username,
        password,
      },
    })

    if (!tokens?.access_token) {
      throw createError({
        statusCode: 502,
        statusMessage: 'Login response did not include an access token',
      })
    }

    setAuthCookies(event, tokens, {
      tenant_id: tenantId,
      username,
      logged_in_at: new Date().toISOString(),
    })

    return {
      user: {
        tenant_id: tenantId,
        username,
      },
    }
  } catch (error) {
    throw createError({
      statusCode: error?.statusCode || error?.response?.status || 401,
      statusMessage: upstreamMessage(error, 'Login failed'),
    })
  }
})
