import type { CollectionBeforeChangeHook } from 'payload'
import { slugify } from '@/lib/slugify'

/**
 * Factory that creates a beforeChange hook to auto-populate
 * the 'slug' field from a source field (e.g. 'title' or 'name').
 *
 * Only sets the slug when it is empty — manual slugs are preserved.
 */
export function autoSlugHook(sourceField: string): CollectionBeforeChangeHook {
  return async ({ data }) => {
    if (!data.slug && data[sourceField]) {
      data.slug = slugify(data[sourceField])
    }
    return data
  }
}
