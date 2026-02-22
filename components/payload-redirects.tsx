import type React from 'react'
import { getCachedRedirects } from '@/lib/get-redirects'
import { notFound, redirect } from 'next/navigation'

interface Props {
  disableNotFound?: boolean
  url: string
}

export const PayloadRedirects: React.FC<Props> = async ({
  disableNotFound,
  url,
}) => {
  const redirects = await getCachedRedirects()()
  const normalizedUrl = url.replace(/\/$/, '') || '/'

  const redirectItem = redirects.find((r: any) => {
    const from = (r.from as string)?.replace(/\/$/, '') || '/'
    return from === normalizedUrl
  })

  if (redirectItem) {
    const to = redirectItem.to as any

    // Direct URL redirect
    if (to?.url) {
      redirect(to.url)
    }

    // Document reference redirect
    const ref = to?.reference
    if (ref?.value) {
      const slug =
        typeof ref.value === 'string'
          ? ref.value
          : (ref.value as any)?.slug

      if (slug) {
        const prefixes: Record<string, string> = {
          pages: '',
          posts: '/news',
          properties: '/properties',
          communities: '/communities',
        }
        const prefix = prefixes[ref.relationTo as string] ?? ''
        redirect(`${prefix}/${slug}`)
      }
    }
  }

  if (disableNotFound) return null
  notFound()
}
