export const useDriverAuth = () => {
  const user = useState('driver-auth-user', () => null)
  const loading = useState('driver-auth-loading', () => false)
  const error = useState('driver-auth-error', () => '')

  const login = async ({ tenantId, username, password }) => {
    loading.value = true
    error.value = ''

    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          tenant_id: Number(tenantId),
          username,
          password,
        },
      })

      user.value = response.user
      return { success: true, data: response.user }
    } catch (err) {
      error.value = err?.statusMessage || err?.data?.message || 'Login failed'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const loadMe = async () => {
    loading.value = true
    error.value = ''

    try {
      user.value = await $fetch('/api/auth/me')
      return { success: true, data: user.value }
    } catch (err) {
      user.value = null
      error.value = err?.statusMessage || err?.data?.message || 'Not signed in'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
  }

  return {
    user,
    loading,
    error,
    login,
    loadMe,
    logout,
  }
}
