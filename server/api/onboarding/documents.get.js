import { getApiConfig } from '~/server/utils/api-config'
import { getAccessToken } from '~/server/utils/auth-cookies'
import { buildDocumentRows } from '~/server/utils/document-status'

export default defineEventHandler(async (event) => {
  const accessToken = getAccessToken(event)

  if (!accessToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not signed in',
    })
  }

  const api = getApiConfig(useRuntimeConfig())
  let driverDocuments = []
  let documentTypes = []

  if (api.operations.driverDocumentTypes) {
    try {
      documentTypes = await $fetch(api.endpoints.privateOperation(api.operations.driverDocumentTypes), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    } catch {
      documentTypes = []
    }
  }

  if (api.operations.driverDocuments) {
    try {
      driverDocuments = await $fetch(api.endpoints.privateOperation(api.operations.driverDocuments), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    } catch {
      driverDocuments = []
    }
  }

  const documents = buildDocumentRows(
    Array.isArray(driverDocuments) ? driverDocuments : [],
    Array.isArray(documentTypes) ? documentTypes : [],
  )
  const uploadedCount = documents.filter((document) => document.uploaded).length
  const approvedCount = documents.filter((document) => document.statusCode === 'approved').length
  const rejectedCount = documents.filter((document) => document.statusCode === 'rejected').length
  const pendingCount = documents.filter((document) => ['pending', 'pending_review', 'submitted'].includes(document.statusCode)).length
  const requiredCount = documents.filter((document) => !document.uploaded).length

  return {
    documents,
    uploaded_count: uploadedCount,
    approved_count: approvedCount,
    rejected_count: rejectedCount,
    pending_count: pendingCount,
    required_count: requiredCount,
    action_required_count: rejectedCount + requiredCount,
    total_count: documents.length,
  }
})
