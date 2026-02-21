'use client'
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { useField, FieldLabel } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import { ALL_ICONS, ALL_ICON_KEYS, COMMON_ICON_KEYS, SOCIAL_ICONS } from './icon-list'

const ICONS_PER_PAGE = 80
const SOCIAL_ICON_KEYS = Object.keys(SOCIAL_ICONS)

type Tab = 'common' | 'all' | 'social'

export const IconPickerField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path })
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<Tab>('common')
  const [visibleCount, setVisibleCount] = useState(ICONS_PER_PAGE)
  const panelRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  // Close panel on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Focus search when opening
  useEffect(() => {
    if (open) {
      searchRef.current?.focus()
      setVisibleCount(ICONS_PER_PAGE)
      setSearch('')
    }
  }, [open])

  // Get filtered icon keys based on tab and search
  const filteredKeys = useMemo(() => {
    let keys: string[]
    switch (tab) {
      case 'common':
        keys = COMMON_ICON_KEYS
        break
      case 'social':
        keys = SOCIAL_ICON_KEYS
        break
      default:
        keys = ALL_ICON_KEYS
    }

    if (search) {
      const q = search.toLowerCase()
      keys = keys.filter((k) => k.toLowerCase().includes(q))
    }

    return keys
  }, [tab, search])

  const visibleKeys = useMemo(
    () => filteredKeys.slice(0, visibleCount),
    [filteredKeys, visibleCount]
  )

  const hasMore = filteredKeys.length > visibleCount

  const handleSelect = useCallback(
    (iconKey: string) => {
      setValue(iconKey)
      setOpen(false)
    },
    [setValue]
  )

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setValue('')
    },
    [setValue]
  )

  // Render the selected icon preview
  const SelectedIcon = value ? ALL_ICONS[value] : null

  return (
    <div style={{ marginBottom: 16, position: 'relative' }}>
      <FieldLabel label={field.label || field.name} path={path} />

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 12px',
          border: '1px solid #d1d5db',
          borderRadius: 6,
          background: '#fff',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left',
          fontSize: 14,
          color: value ? '#111827' : '#9ca3af',
          marginTop: 6,
        }}
      >
        {SelectedIcon ? (
          <>
            <SelectedIcon style={{ width: 20, height: 20, flexShrink: 0 }} />
            <span style={{ flex: 1 }}>{value}</span>
            <span
              onClick={handleClear}
              style={{
                fontSize: 16,
                color: '#9ca3af',
                padding: '0 4px',
                lineHeight: 1,
              }}
            >
              &times;
            </span>
          </>
        ) : (
          <span>Click to select an icon...</span>
        )}
      </button>

      {/* Icon picker panel */}
      {open && (
        <div
          ref={panelRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 100,
            background: '#fff',
            border: '1px solid #d1d5db',
            borderRadius: 8,
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            marginTop: 4,
            maxHeight: 420,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Search bar */}
          <div style={{ padding: '10px 12px 6px', borderBottom: '1px solid #e5e7eb' }}>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search icons..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setVisibleCount(ICONS_PER_PAGE)
              }}
              style={{
                width: '100%',
                padding: '6px 10px',
                border: '1px solid #d1d5db',
                borderRadius: 4,
                fontSize: 13,
                outline: 'none',
              }}
            />
          </div>

          {/* Tabs */}
          <div
            style={{
              display: 'flex',
              gap: 0,
              borderBottom: '1px solid #e5e7eb',
              padding: '0 12px',
            }}
          >
            {(['common', 'all', 'social'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTab(t)
                  setVisibleCount(ICONS_PER_PAGE)
                }}
                style={{
                  padding: '8px 14px',
                  fontSize: 12,
                  fontWeight: tab === t ? 600 : 400,
                  color: tab === t ? '#3b82f6' : '#6b7280',
                  background: 'none',
                  border: 'none',
                  borderBottom: tab === t ? '2px solid #3b82f6' : '2px solid transparent',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {t}
              </button>
            ))}
            <span
              style={{
                marginLeft: 'auto',
                fontSize: 11,
                color: '#9ca3af',
                alignSelf: 'center',
              }}
            >
              {filteredKeys.length} icons
            </span>
          </div>

          {/* Icon grid */}
          <div
            style={{
              overflowY: 'auto',
              padding: 10,
              flex: 1,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
                gap: 4,
              }}
            >
              {visibleKeys.map((key) => {
                const IconComp = ALL_ICONS[key]
                if (!IconComp) return null
                const isSelected = value === key

                return (
                  <button
                    key={key}
                    type="button"
                    title={key}
                    onClick={() => handleSelect(key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 38,
                      height: 38,
                      borderRadius: 6,
                      border: 'none',
                      background: isSelected ? '#dbeafe' : 'transparent',
                      outline: isSelected ? '2px solid #3b82f6' : 'none',
                      cursor: 'pointer',
                      padding: 0,
                      color: '#374151',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.background = '#f3f4f6'
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <IconComp style={{ width: 20, height: 20 }} />
                  </button>
                )
              })}
            </div>

            {filteredKeys.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  padding: 20,
                  color: '#9ca3af',
                  fontSize: 13,
                }}
              >
                No icons match &ldquo;{search}&rdquo;
              </div>
            )}

            {hasMore && (
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + ICONS_PER_PAGE)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px 0',
                  marginTop: 8,
                  fontSize: 13,
                  color: '#3b82f6',
                  background: 'none',
                  border: '1px solid #e5e7eb',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              >
                Show more ({filteredKeys.length - visibleCount} remaining)
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
