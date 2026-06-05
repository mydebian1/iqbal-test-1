const statusLabels = {
  pending: 'Pending',
  pending_review: 'Pending',
  submitted: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  expired: 'Expired',
  superseded: 'Superseded',
}

const statusSeverity = {
  pending: 'warn',
  pending_review: 'warn',
  submitted: 'warn',
  approved: 'success',
  rejected: 'danger',
  expired: 'danger',
  superseded: 'secondary',
  required: 'secondary',
}

const formatDate = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export const normalizeDocumentCode = (value) => String(value || '').trim().toLowerCase().replace(/-/g, '_')

const typeMetadata = (documentType) => documentType?.metadata || documentType?.document_metadata || {}

const buildRequiredRow = (documentType) => {
  const metadata = typeMetadata(documentType)

  return {
    code: normalizeDocumentCode(documentType.code),
    documentTypeId: documentType.id,
    name: documentType.name,
    detail: documentType.description || '',
    requiresIssueDate: Boolean(documentType.requires_issue_date),
    requiresExpiryDate: Boolean(documentType.requires_expiry_date),
    requiresReferenceNumber: Boolean(documentType.requires_reference_number),
    requiresFile: Boolean(documentType.requires_file ?? true),
    referenceLabel: metadata.reference_label || 'Reference number',
    expiryLabel: metadata.expiry_label || 'Expiry date',
    uploadLabel: metadata.upload_label || 'Upload an image or PDF, or take a photo with your phone camera.',
    allowedFileTypes: Array.isArray(metadata.allowed_file_types) ? metadata.allowed_file_types : ['jpg', 'jpeg', 'png', 'pdf'],
    maxFileSizeMb: Number(metadata.max_file_size_mb || 15),
    sortOrder: Number(documentType.sort_order || 0),
  }
}

const latestCurrentDocument = (documents) => {
  return documents
    .filter((document) => document?.is_current !== false && document?.is_archived !== true)
    .sort((a, b) => new Date(b.submitted_at || b.created_at || 0) - new Date(a.submitted_at || a.created_at || 0))[0]
}

export const buildDocumentRows = (driverDocuments = [], documentTypes = []) => {
  return documentTypes
    .filter((documentType) => documentType?.is_active !== false)
    .sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0))
    .map((documentType) => {
      const required = buildRequiredRow(documentType)
      const uploaded = latestCurrentDocument(
        driverDocuments.filter((document) => Number(document?.document_type_id) === Number(required.documentTypeId)),
      )

      if (!uploaded) {
        return {
          ...required,
          uploaded: false,
          uploadedAt: '',
          status: 'Required',
          severity: statusSeverity.required,
        }
      }

      const status = String(uploaded.status || 'pending_review').toLowerCase()

      return {
        ...required,
        id: uploaded.id,
        uid: uploaded.uid,
        uploaded: true,
        uploadedAt: formatDate(uploaded.submitted_at || uploaded.created_at),
        status: statusLabels[status] || status,
        statusCode: status,
        severity: statusSeverity[status] || 'secondary',
        driverVisibleNote: uploaded.driver_visible_note || '',
        fileName: uploaded.file_name || '',
        expiryDate: uploaded.expiry_date || '',
      }
    })
}
