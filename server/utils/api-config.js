const PRIVATE_API_V1 = '/api/private/v1'

const trimTrailingSlash = (value) => String(value || '').replace(/\/+$/, '')

export const getApiConfig = (config) => {
  const cablineBaseUrl = trimTrailingSlash(config.cablineBaseUrl)

  return {
    endpoints: {
      authLogin: `${cablineBaseUrl}/auth/login`,
      authMe: `${cablineBaseUrl}/auth/me`,
      authLogout: `${cablineBaseUrl}/auth/logout`,
      privateOperation: (operation) => `${cablineBaseUrl}${PRIVATE_API_V1}/${operation}`,
    },
    operations: {
      driverDocumentTypes: config.driverDocumentTypesOperation,
      driverDocuments: config.driverDocumentsOperation,
      driverDocumentUpload: config.driverDocumentUploadOperation,
    },
  }
}

export const upstreamMessage = (error, fallback = 'Request failed') => {
  return (
    error?.data?.detail?.message ||
    error?.data?.message ||
    error?.statusMessage ||
    error?.message ||
    fallback
  )
}
