'use client'
import React, { useState, useEffect } from 'react'

export const ExportSubmissions: React.FC = () => {
  const [forms, setForms] = useState<{ id: string; title: string }[]>([])
  const [selectedForm, setSelectedForm] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  useEffect(() => {
    fetch('/api/forms?limit=100&depth=0')
      .then((r) => r.json())
      .then((data) => {
        if (data.docs) {
          setForms(
            data.docs.map((d: Record<string, unknown>) => ({
              id: String(d.id),
              title: String(d.title || ''),
            })),
          )
        }
      })
      .catch(() => {})
  }, [])

  const handleExport = () => {
    const params = new URLSearchParams()
    if (selectedForm) params.set('form', selectedForm)
    if (dateFrom) params.set('from', dateFrom)
    if (dateTo) params.set('to', dateTo)
    const qs = params.toString()
    window.open(`/api/form-submissions/export-csv${qs ? `?${qs}` : ''}`, '_blank')
  }

  const inputStyle: React.CSSProperties = {
    padding: '6px 8px',
    borderRadius: 4,
    border: '1px solid var(--theme-elevation-250)',
    background: 'var(--theme-elevation-50)',
    color: 'var(--theme-elevation-800)',
    fontSize: 13,
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 12,
        padding: '12px 0',
        flexWrap: 'wrap',
        borderBottom: '1px solid var(--theme-elevation-150)',
        marginBottom: 16,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label style={{ fontSize: 12, color: 'var(--theme-elevation-600)' }}>Form</label>
        <select
          value={selectedForm}
          onChange={(e) => setSelectedForm(e.target.value)}
          style={{ ...inputStyle, minWidth: 140 }}
        >
          <option value="">All Forms</option>
          {forms.map((f) => (
            <option key={f.id} value={f.id}>
              {f.title}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label style={{ fontSize: 12, color: 'var(--theme-elevation-600)' }}>From</label>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label style={{ fontSize: 12, color: 'var(--theme-elevation-600)' }}>To</label>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          style={inputStyle}
        />
      </div>

      <button
        onClick={handleExport}
        type="button"
        style={{
          padding: '6px 16px',
          borderRadius: 4,
          border: 'none',
          background: 'var(--theme-elevation-900)',
          color: 'var(--theme-elevation-50)',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        Export CSV
      </button>
    </div>
  )
}
