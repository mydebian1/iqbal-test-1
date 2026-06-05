import { getApiConfig } from '~/server/utils/api-config'
import { clearAuthCookies, getAccessToken } from '~/server/utils/auth-cookies'

export default defineEventHandler(async (event) => {
  const accessToken = getAccessToken(event)
  const api = getApiConfig(useRuntimeConfig())

  if (accessToken) {
    try {
      await $fetch(api.endpoints.authLogout, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    } catch {
      // Local session cleanup still happens if upstream logout is unavailable.
    }
  }

  clearAuthCookies(event)
  return { success: true }
})
