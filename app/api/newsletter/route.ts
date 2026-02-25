import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    // Look up the Newsletter form by title
    const { docs } = await payload.find({
      collection: 'forms',
      where: { title: { equals: 'Newsletter' } },
      limit: 1,
    })

    if (docs.length === 0) {
      return NextResponse.json(
        { error: 'Newsletter form not configured.' },
        { status: 500 },
      )
    }

    const formId = docs[0].id

    await payload.create({
      collection: 'form-submissions',
      data: {
        form: formId,
        submissionData: [{ field: 'email', value: email }],
      } as any,
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Subscription failed.' },
      { status: 500 },
    )
  }
}
