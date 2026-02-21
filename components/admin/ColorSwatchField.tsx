'use client'
import React from 'react'
import { useField, FieldLabel } from '@payloadcms/ui'
import type { SelectFieldClientComponent } from 'payload'
import { COLOR_HEX_MAP } from './color-map'

function labelToString(label: unknown, fallback: string): string {
  if (typeof label === 'string') return label
  if (label && typeof label === 'object') return Object.values(label)[0] || fallback
  return fallback
}

export const ColorSwatchField: SelectFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path })

  const options = (field.options || []).map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  )

  return (
    <div style={{ marginBottom: 16 }}>
      <FieldLabel label={field.label || field.name} path={path} />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
        {options.map((opt) => {
          const hex = COLOR_HEX_MAP[opt.value] || '#ccc'
          const isSelected = value === opt.value
          const isWhite = opt.value === 'white'

          return (
            <button
              key={opt.value}
              type="button"
              title={labelToString(opt.label, opt.value)}
              onClick={() => setValue(isSelected ? '' : opt.value)}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: hex,
                border: isWhite ? '2px solid #d1d5db' : '2px solid transparent',
                outline: isSelected ? `3px solid #3b82f6` : 'none',
                outlineOffset: 2,
                cursor: 'pointer',
                transition: 'outline 0.15s ease',
                padding: 0,
              }}
            />
          )
        })}
      </div>
      {value && (
        <div style={{ marginTop: 6, fontSize: 13, color: '#6b7280' }}>
          Selected: {labelToString(options.find((o) => o.value === value)?.label || value, value)}
        </div>
      )}
    </div>
  )
}
