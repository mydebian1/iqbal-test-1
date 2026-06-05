import { getApiConfig, upstreamMessage } from '~/server/utils/api-config'
import { clearAuthCookies, getAccessToken, getDriverSession } from '~/server/utils/auth-cookies'

export default defineEventHandler(async (event) => {
  const accessToken = getAccessToken(event)
  const session = getDriverSession(event)

  if (!accessToken || !session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not signed in',
    })
  }

  const api = getApiConfig(useRuntimeConfig())

  try {
    const user = await $fetch(api.endpoints.authMe, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return {
      ...user,
      tenant_id: user?.tenant_id || session.tenant_id,
      username: user?.username || session.username,
    }
  } catch (error) {
    clearAuthCookies(event)
    throw createError({
      statusCode: error?.statusCode || error?.response?.status || 401,
      statusMessage: upstreamMessage(error, 'Session expired. Please sign in again.'),
    })
  }
})
