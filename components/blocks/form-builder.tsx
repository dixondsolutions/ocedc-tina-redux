'use client'

import React, { useState } from 'react'
import { Section } from '../layout/section'
import { RichText } from '../rich-text'

const inputClasses =
  'w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground'

const labelClasses =
  'mb-2 block text-xs font-bold uppercase tracking-widest text-primary'

function TextField({ field }: { field: any }) {
  return (
    <div>
      <label htmlFor={field.name} className={labelClasses}>
        {field.label}
        {field.required && '*'}
      </label>
      <input
        type="text"
        id={field.name}
        name={field.name}
        required={field.required}
        defaultValue={field.defaultValue || ''}
        className={inputClasses}
      />
    </div>
  )
}

function TextareaField({ field }: { field: any }) {
  return (
    <div>
      <label htmlFor={field.name} className={labelClasses}>
        {field.label}
        {field.required && '*'}
      </label>
      <textarea
        id={field.name}
        name={field.name}
        required={field.required}
        rows={6}
        defaultValue={field.defaultValue || ''}
        className={inputClasses}
      />
    </div>
  )
}

function EmailField({ field }: { field: any }) {
  return (
    <div>
      <label htmlFor={field.name} className={labelClasses}>
        {field.label}
        {field.required && '*'}
      </label>
      <input
        type="email"
        id={field.name}
        name={field.name}
        required={field.required}
        className={inputClasses}
      />
    </div>
  )
}

function SelectField({ field }: { field: any }) {
  return (
    <div>
      <label htmlFor={field.name} className={labelClasses}>
        {field.label}
        {field.required && '*'}
      </label>
      <select
        id={field.name}
        name={field.name}
        required={field.required}
        defaultValue={field.defaultValue || ''}
        className={inputClasses}
      >
        <option value="">Select...</option>
        {field.options?.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function CheckboxField({ field }: { field: any }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={field.name}
        name={field.name}
        required={field.required}
        defaultChecked={field.defaultValue || false}
        className="h-4 w-4 rounded border-border text-primary focus:ring-primary/30"
      />
      <label htmlFor={field.name} className="text-sm text-foreground">
        {field.label}
        {field.required && '*'}
      </label>
    </div>
  )
}

function NumberField({ field }: { field: any }) {
  return (
    <div>
      <label htmlFor={field.name} className={labelClasses}>
        {field.label}
        {field.required && '*'}
      </label>
      <input
        type="number"
        id={field.name}
        name={field.name}
        required={field.required}
        className={inputClasses}
      />
    </div>
  )
}

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
]

function StateField({ field }: { field: any }) {
  return (
    <div>
      <label htmlFor={field.name} className={labelClasses}>
        {field.label}
        {field.required && '*'}
      </label>
      <select
        id={field.name}
        name={field.name}
        required={field.required}
        defaultValue=""
        className={inputClasses}
      >
        <option value="">Select state...</option>
        {US_STATES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  )
}

const fieldComponents: Record<string, React.FC<{ field: any }>> = {
  text: TextField,
  textarea: TextareaField,
  email: EmailField,
  select: SelectField,
  checkbox: CheckboxField,
  number: NumberField,
  state: StateField,
}

/** Fields that default to full-width when no explicit width is set */
const fullWidthByDefault = new Set(['textarea', 'checkbox', 'message'])

function isFullWidth(field: any): boolean {
  if (field.width != null) return field.width >= 100
  return fullWidthByDefault.has(field.blockType)
}

export const FormBuilder = ({ data }: { data: any }) => {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const form = data.form
  if (!form || typeof form !== 'object') return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const submissionData = form.fields
      ?.filter((field: any) => field.blockType !== 'message')
      .map((field: any) => ({
        field: field.name,
        value: field.blockType === 'checkbox'
          ? String(formData.has(field.name))
          : (formData.get(field.name) ?? ''),
      }))

    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: form.id,
          submissionData,
        }),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.errors?.[0]?.message || 'Submission failed')
      }

      setSubmitted(true)

      if (form.confirmationType === 'redirect' && form.redirect?.url) {
        window.location.href = form.redirect.url
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section background={data.style?.background || undefined}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {data.enableIntro && !submitted && (
          <div className="mb-12 text-center">
            {data.introTitle && (
              <h2 className="text-3xl font-bold uppercase tracking-wide text-foreground">
                {data.introTitle}
              </h2>
            )}
            {data.introText && (
              <p className="mt-4 text-lg text-muted-foreground">
                {data.introText}
              </p>
            )}
          </div>
        )}

        {submitted && form.confirmationType !== 'redirect' ? (
          <div className="rounded-3xl bg-card p-8 text-center shadow-xl ring-1 ring-border/50 md:p-12">
            {form.confirmationMessage ? (
              <RichText
                data={form.confirmationMessage}
                className="prose prose-sm mx-auto text-foreground"
              />
            ) : (
              <>
                <h3 className="text-2xl font-bold text-foreground">Thank you!</h3>
                <p className="mt-4 text-muted-foreground">
                  Your submission has been received.
                </p>
              </>
            )}
          </div>
        ) : !submitted ? (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-card p-8 shadow-xl ring-1 ring-border/50 md:p-12"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {form.fields?.map((field: any, index: number) => {
                if (field.blockType === 'message') {
                  return (
                    <div
                      key={index}
                      className="col-span-full text-sm text-muted-foreground"
                    >
                      {field.message && (
                        <RichText data={field.message} />
                      )}
                    </div>
                  )
                }
                const FieldComponent = fieldComponents[field.blockType]
                if (!FieldComponent) return null
                return (
                  <div
                    key={index}
                    className={isFullWidth(field) ? 'col-span-full' : undefined}
                  >
                    <FieldComponent field={field} />
                  </div>
                )
              })}
            </div>

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

            <div className="mt-10 text-center">
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-primary px-10 py-4 text-base font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50"
              >
                {loading ? 'Sending...' : form.submitButtonLabel || 'Submit'}
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </Section>
  )
}
