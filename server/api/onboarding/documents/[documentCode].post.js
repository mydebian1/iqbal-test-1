import { getApiConfig, upstreamMessage } from '~/server/utils/api-config'
import { getAccessToken } from '~/server/utils/auth-cookies'
import { normalizeDocumentCode } from '~/server/utils/document-status'

const textValue = (part) => part?.data ? Buffer.from(part.data).toString('utf8') : ''

export default defineEventHandler(async (event) => {
  try {
    const accessToken = getAccessToken(event)

    if (!accessToken) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not signed in',
      })
    }

    const documentCode = normalizeDocumentCode(getRouterParam(event, 'documentCode'))
    if (!documentCode) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Document type not found',
      })
    }

    const api = getApiConfig(useRuntimeConfig())
    if (!api.operations.driverDocumentUpload) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Document upload operation is not configured',
      })
    }

    const parts = await readMultipartFormData(event)
    const filePart = parts?.find((part) => part.name === 'file')
    const documentTypePart = parts?.find((part) => part.name === 'document_type_id')
    const submittedDocumentTypeId = Number(textValue(documentTypePart))

    if (!filePart?.data?.length) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Document file is required',
      })
    }

    const formData = new FormData()
    if (submittedDocumentTypeId) {
      formData.append('document_type_id', String(submittedDocumentTypeId))
    }
    formData.append('document_code', documentCode)

    for (const field of ['reference_number', 'issue_date', 'expiry_date']) {
      const part = parts.find((item) => item.name === field)
      const value = textValue(part)
      if (value) formData.append(field, value)
    }

    formData.append(
      'metadata',
      JSON.stringify({
        source: 'cabline-driver-onboarding',
        document_code: documentCode,
      }),
    )
    formData.append(
      'file',
      new File(
        [filePart.data],
        filePart.filename || `${documentCode}.jpg`,
        { type: filePart.type || 'application/octet-stream' },
      ),
    )

    return await $fetch(api.endpoints.privateOperation(api.operations.driverDocumentUpload), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
  } catch (error) {
    throw createError({
      statusCode: error?.statusCode || error?.response?.status || 502,
      statusMessage: upstreamMessage(error, 'Document upload failed'),
    })
  }
})
