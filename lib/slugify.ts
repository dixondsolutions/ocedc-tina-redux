/**
 * Convert a string to a URL-safe slug.
 * e.g. "Hello World!" => "hello-world"
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
