export const useDriverDocuments = () => {
  const documents = useState('driver-documents', () => [])
  const summary = useState('driver-documents-summary', () => ({
    uploaded_count: 0,
    approved_count: 0,
    rejected_count: 0,
    pending_count: 0,
    required_count: 0,
    action_required_count: 0,
    total_count: 0,
  }))
  const loading = useState('driver-documents-loading', () => false)
  const error = useState('driver-documents-error', () => '')

  const loadDocuments = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await $fetch('/api/onboarding/documents')
      documents.value = response.documents || []
      summary.value = {
        uploaded_count: response.uploaded_count || 0,
        approved_count: response.approved_count || 0,
        rejected_count: response.rejected_count || 0,
        pending_count: response.pending_count || 0,
        required_count: response.required_count || 0,
        action_required_count: response.action_required_count || 0,
        total_count: response.total_count || documents.value.length,
      }
      return { success: true, data: response }
    } catch (err) {
      documents.value = []
      summary.value = {
        uploaded_count: 0,
        approved_count: 0,
        rejected_count: 0,
        pending_count: 0,
        required_count: 0,
        action_required_count: 0,
        total_count: 0,
      }
      error.value = err?.statusMessage || err?.data?.message || 'Failed to load documents'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  return {
    documents,
    summary,
    loading,
    error,
    loadDocuments,
  }
}
