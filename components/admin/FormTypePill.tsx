'use client'
import React from 'react'

interface FormTypePillProps {
  cellData?: string
}

export const FormTypePill: React.FC<FormTypePillProps> = ({ cellData }) => {
  const formTitle = cellData || ''
  if (!formTitle) return null

  const isNewsletter = formTitle.toLowerCase().includes('newsletter')
  const bgColor = isNewsletter ? '#dbeafe' : '#fef3c7'
  const textColor = isNewsletter ? '#1e40af' : '#92400e'

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 600,
        backgroundColor: bgColor,
        color: textColor,
        whiteSpace: 'nowrap',
      }}
    >
      {formTitle}
    </span>
  )
}
