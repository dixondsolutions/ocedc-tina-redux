/**
 * One-time seed: create a "Contact" form in the CMS forms collection
 * and swap the contact page's static contactForm block for a formBuilder block.
 *
 * Usage: with dev server running, hit:
 *   curl http://localhost:3000/api/seed-contact-form
 */

import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

function lexical(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', text, version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

export async function GET() {
  const logs: string[] = []
  const log = (msg: string) => {
    logs.push(msg)
    console.log(msg)
  }

  try {
    const payload = await getPayload({ config })

    // 1. Check if a "Contact" form already exists
    const existing = await payload.find({
      collection: 'forms',
      where: { title: { equals: 'Contact' } },
      limit: 1,
    })

    let formId: number

    if (existing.docs.length > 0) {
      formId = existing.docs[0].id as number
      log(`Contact form already exists (id: ${formId}), skipping creation.`)
    } else {
      // 2. Create the Contact form
      const form = await payload.create({
        collection: 'forms',
        data: {
          title: 'Contact',
          submitButtonLabel: 'Send Message',
          confirmationType: 'message',
          confirmationMessage: lexical(
            'Thank you for reaching out! Our team will respond within one business day.',
          ),
          fields: [
            {
              blockType: 'text',
              name: 'name',
              label: 'Name',
              required: true,
              width: 50,
            },
            {
              blockType: 'text',
              name: 'company',
              label: 'Company',
              required: false,
              width: 50,
            },
            {
              blockType: 'email',
              name: 'email',
              label: 'Email',
              required: true,
              width: 50,
            },
            {
              blockType: 'text',
              name: 'phone',
              label: 'Phone',
              required: false,
              width: 50,
            },
            {
              blockType: 'select',
              name: 'inquiryType',
              label: 'Inquiry Type',
              required: false,
              width: 50,
              options: [
                { label: 'General inquiry', value: 'general' },
                { label: 'Site selection', value: 'site-selection' },
                { label: 'Business expansion', value: 'business-expansion' },
                { label: 'Media inquiry', value: 'media' },
                { label: 'Membership', value: 'membership' },
              ],
            },
            {
              blockType: 'textarea',
              name: 'message',
              label: 'Message',
              required: false,
              width: 100,
            },
          ],
        } as any,
      })

      formId = form.id as number
      log(`Created Contact form (id: ${formId})`)
    }

    // 3. Create a Newsletter form (for footer subscribe)
    const existingNewsletter = await payload.find({
      collection: 'forms',
      where: { title: { equals: 'Newsletter' } },
      limit: 1,
    })

    if (existingNewsletter.docs.length > 0) {
      log(`Newsletter form already exists (id: ${existingNewsletter.docs[0].id}), skipping.`)
    } else {
      const newsletter = await payload.create({
        collection: 'forms',
        data: {
          title: 'Newsletter',
          submitButtonLabel: 'Subscribe',
          confirmationType: 'message',
          confirmationMessage: lexical('You have been subscribed. Thank you!'),
          fields: [
            {
              blockType: 'email',
              name: 'email',
              label: 'Email',
              required: true,
              width: 100,
            },
          ],
        } as any,
      })
      log(`Created Newsletter form (id: ${newsletter.id})`)
    }

    // 4. Find the contact page and swap the contactForm block for formBuilder
    const pages = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'contact' } },
      limit: 1,
      depth: 0,
    })

    if (pages.docs.length === 0) {
      log('No contact page found — nothing to update.')
      return NextResponse.json({ success: true, formId, logs })
    }

    const page = pages.docs[0] as any
    const blocks: any[] = page.blocks || []

    const hasFormBuilder = blocks.some(
      (b: any) => b.blockType === 'formBuilder' && b.form === formId,
    )

    if (hasFormBuilder) {
      log('Contact page already has a formBuilder block — no update needed.')
      return NextResponse.json({ success: true, formId, logs })
    }

    // Replace contactForm block(s) with a formBuilder block
    const updatedBlocks = blocks.map((block: any) => {
      if (block.blockType === 'contactForm') {
        log(`Replacing contactForm block with formBuilder (form: ${formId})`)
        return {
          blockType: 'formBuilder',
          form: formId,
          enableIntro: true,
          introTitle: block.title || 'Tell us about your inquiry',
          introText:
            'Choose inquiry type so we can route your message to the right OCEDC partner.',
          style: block.style || {},
        }
      }
      return block
    })

    await payload.update({
      collection: 'pages',
      id: page.id,
      data: { blocks: updatedBlocks },
    })

    log('Updated contact page blocks.')

    return NextResponse.json({ success: true, formId, logs })
  } catch (err: any) {
    log(`Error: ${err.message}`)
    return NextResponse.json(
      { success: false, error: err.message, logs },
      { status: 500 },
    )
  }
}
