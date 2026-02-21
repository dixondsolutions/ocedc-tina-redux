import type { Metadata } from 'next'

interface MetaFields {
  title?: string | null
  description?: string | null
  image?: { url?: string | null } | string | null
}

interface DocWithMeta {
  title?: string | null
  name?: string | null
  slug?: string | null
  meta?: MetaFields | null
  heroImg?: { url?: string | null } | string | null
  gallery?: Array<{ image?: { url?: string | null } | string | null }> | null
}

/**
 * Builds Next.js Metadata from a Payload document with SEO plugin fields.
 * Falls back to the document's own title/name and images when SEO fields are empty.
 */
export function generatePageMetadata(doc: DocWithMeta | null | undefined): Metadata {
  if (!doc) return {}

  const title = doc.meta?.title || doc.title || doc.name || undefined
  const description = doc.meta?.description || undefined

  // Resolve OG image: meta.image > heroImg > first gallery image
  const metaImageUrl = typeof doc.meta?.image === 'object' ? doc.meta.image?.url : null
  const heroImgUrl = typeof doc.heroImg === 'object' ? doc.heroImg?.url : null
  const galleryImgUrl =
    doc.gallery?.[0]?.image && typeof doc.gallery[0].image === 'object'
      ? doc.gallery[0].image.url
      : null
  const imageUrl = metaImageUrl || heroImgUrl || galleryImgUrl || undefined

  return {
    title: title || undefined,
    description,
    openGraph: {
      title: title || undefined,
      description,
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: title || undefined,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  }
}
