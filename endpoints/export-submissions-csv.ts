import type { PayloadHandler, Where } from 'payload'

function csvEscape(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

export const exportSubmissionsCSV: PayloadHandler = async (req) => {
  const { payload, user } = req
  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const url = new URL(req.url || '', 'http://localhost')
  const formFilter = url.searchParams.get('form') || undefined
  const dateFrom = url.searchParams.get('from') || undefined
  const dateTo = url.searchParams.get('to') || undefined

  // Build where clause
  const where: Where = {}
  if (formFilter) {
    where.form = { equals: formFilter }
  }
  if (dateFrom || dateTo) {
    where.createdAt = {
      ...(dateFrom ? { greater_than_equal: dateFrom } : {}),
      ...(dateTo ? { less_than_equal: dateTo } : {}),
    }
  }

  // Fetch all matching submissions
  const allDocs: Array<Record<string, unknown>> = []
  let page = 1
  let hasMore = true
  while (hasMore) {
    const result = await payload.find({
      collection: 'form-submissions',
      where,
      depth: 1,
      limit: 100,
      page,
      sort: '-createdAt',
    })
    allDocs.push(...result.docs)
    hasMore = result.hasNextPage
    page++
  }

  // Collect all unique field names across submissions
  const fieldNames = new Set<string>()
  for (const doc of allDocs) {
    const submissionData = doc.submissionData as Array<{ field: string; value: string }> | undefined
    if (Array.isArray(submissionData)) {
      for (const item of submissionData) {
        fieldNames.add(item.field)
      }
    }
  }
  const sortedFields = Array.from(fieldNames).sort()

  // Build CSV
  const headers = ['ID', 'Form', 'Date', ...sortedFields]
  const rows = allDocs.map((doc) => {
    const form = doc.form as Record<string, unknown> | string | number
    const formName =
      form && typeof form === 'object' ? String(form.title || '') : `Form #${form}`
    const data: Record<string, string> = {}
    const submissionData = doc.submissionData as Array<{ field: string; value: string }> | undefined
    if (Array.isArray(submissionData)) {
      for (const item of submissionData) {
        data[item.field] = String(item.value || '')
      }
    }
    return [
      String(doc.id),
      csvEscape(formName),
      new Date(doc.createdAt as string).toISOString(),
      ...sortedFields.map((f) => csvEscape(data[f] || '')),
    ].join(',')
  })

  const csv = [headers.map(csvEscape).join(','), ...rows].join('\n')
  const datestamp = new Date().toISOString().slice(0, 10)

  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="form-submissions-${datestamp}.csv"`,
    },
  })
}
