'use client'
import React from 'react'
import { useField, FieldLabel } from '@payloadcms/ui'
import type { SelectFieldClientComponent } from 'payload'
import { BG_COLOR_HEX_MAP } from './color-map'

export const BackgroundColorField: SelectFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path })

  const options = (field.options || []).map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  )

  return (
    <div style={{ marginBottom: 16 }}>
      <FieldLabel label={field.label || field.name} path={path} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
          gap: 6,
          marginTop: 8,
        }}
      >
        {options.map((opt) => {
          const hex = BG_COLOR_HEX_MAP[opt.value] || 'transparent'
          const isSelected = value === opt.value
          const isDark = opt.value === 'bg-black/80'
          const isTransparent = opt.value === 'bg-default'

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setValue(isSelected ? '' : opt.value)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding: 4,
                borderRadius: 6,
                border: isSelected ? '2px solid #3b82f6' : '2px solid transparent',
                background: 'none',
                cursor: 'pointer',
                transition: 'border-color 0.15s ease',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: 28,
                  borderRadius: 4,
                  backgroundColor: hex,
                  border: isTransparent
                    ? '1px dashed #d1d5db'
                    : isDark
                      ? 'none'
                      : '1px solid #e5e7eb',
                  backgroundImage: isTransparent
                    ? 'linear-gradient(45deg, #f3f4f6 25%, transparent 25%, transparent 75%, #f3f4f6 75%), linear-gradient(45deg, #f3f4f6 25%, transparent 25%, transparent 75%, #f3f4f6 75%)'
                    : 'none',
                  backgroundSize: isTransparent ? '8px 8px' : 'auto',
                  backgroundPosition: isTransparent ? '0 0, 4px 4px' : 'auto',
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  color: '#6b7280',
                  lineHeight: 1.2,
                  textAlign: 'center',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%',
                }}
              >
                {typeof opt.label === 'string' ? opt.label : opt.value}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
