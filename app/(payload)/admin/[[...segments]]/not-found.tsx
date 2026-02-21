import type { GenerateViewMetadata } from '@payloadcms/next/views'
import { generatePageMetadata, NotFoundPage } from '@payloadcms/next/views'
import config from '@payload-config'

import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = async ({ params, searchParams }: Args) =>
  generatePageMetadata({ config, params, searchParams })

const NotFound = async ({ params, searchParams }: Args) =>
  NotFoundPage({ config, importMap, params, searchParams })

export default NotFound
