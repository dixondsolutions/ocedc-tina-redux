import type { CollectionAfterReadHook } from 'payload'

export const populateSubmissionFields: CollectionAfterReadHook = async ({ doc, req }) => {
  // Extract values from submissionData array
  const data: Record<string, string> = {}
  if (Array.isArray(doc.submissionData)) {
    for (const item of doc.submissionData) {
      if (item.field && item.value) {
        data[item.field] = String(item.value)
      }
    }
  }

  doc.submitterName = data.name || ''
  doc.submitterEmail = data.email || ''

  // Resolve form title from the relationship
  if (doc.form && typeof doc.form === 'object' && doc.form.title) {
    doc.formTitle = doc.form.title
  } else if (doc.form && typeof doc.form !== 'object' && req?.payload) {
    try {
      const formDoc = await req.payload.findByID({
        collection: 'forms',
        id: doc.form,
        depth: 0,
        req,
      })
      doc.formTitle = formDoc?.title || `Form #${doc.form}`
    } catch {
      doc.formTitle = `Form #${doc.form}`
    }
  } else {
    doc.formTitle = ''
  }

  return doc
}
