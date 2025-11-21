'use client';
import { iconSchema } from '@/tina/fields/icon';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksHero } from '../../tina/__generated__/types';
import { Icon } from '../icon';
import { Section, sectionBlockSchemaField } from '../layout/section';
import { AnimatedGroup } from '../motion-primitives/animated-group';
import { TextEffect } from '../motion-primitives/text-effect';
import { Button } from '../ui/button';
import HeroVideoDialog from '../ui/hero-video-dialog';

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  const videoSrc = data.image?.videoUrl;

  return (
    <Section background={data.background!} className="py-0 px-0" fullBleed>
      <div className="relative isolate min-h-[85vh] overflow-hidden bg-[#111418] text-white" data-tina-field={tinaField(data, 'image')}>
        {data.image?.src && (
          <Image
            src={data.image.src}
            alt={data.image.alt || data.headline || 'Ogle County'}
            fill
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d11] via-[#0b0d11]/80 to-[#0b0d11]/20" />
        <div className="relative z-10 flex min-h-[85vh] flex-col justify-center gap-8 px-6 pt-24 pb-16 lg:px-14 lg:pt-32 lg:pb-20">
          <div className="space-y-8 text-left max-w-5xl">
            {data.tagline && (
              <p data-tina-field={tinaField(data, 'tagline')} className="text-xs uppercase tracking-[0.6em] text-primary/80">
                {data.tagline}
              </p>
            )}
            {data.headline && (
              <div data-tina-field={tinaField(data, 'headline')}>
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="text-pretty text-4xl font-semibold tracking-tight md:text-6xl xl:text-[4.25rem]"
                >
                  {data.headline}
                </TextEffect>
              </div>
            )}
            {data.subheadline && (
              <p data-tina-field={tinaField(data, 'subheadline')} className="max-w-2xl text-lg text-white/80">
                {data.subheadline}
              </p>
            )}

            <AnimatedGroup className="flex flex-wrap gap-3">
              {data.actions?.map(
                (action) =>
                  action?.label &&
                  action?.link && (
                    <div key={action.label} data-tina-field={tinaField(action)}>
                      <Button
                        asChild
                        size="lg"
                        variant={action.type === 'link' ? 'secondary' : 'default'}
                        className={`rounded-full px-6 text-base ${
                          action.type === 'link'
                            ? 'bg-transparent text-white ring-1 ring-white/40 hover:bg-white/10'
                            : 'bg-primary text-[#1b1f24] hover:bg-primary/90'
                        }`}
                      >
                        <Link href={action.link}>
                          {action?.icon && <Icon data={action.icon} />}
                          <span className="text-nowrap">{action.label}</span>
                        </Link>
                      </Button>
                    </div>
                  ),
              )}
              {videoSrc && data.image?.src && (
                <div className="w-full max-w-sm">
                  <HeroVideoDialog
                    videoSrc={videoSrc}
                    thumbnailSrc={data.image.src}
                    thumbnailAlt={data.image?.alt || data.headline || 'Watch overview'}
                  />
                </div>
              )}
            </AnimatedGroup>
          </div>
        </div>
      </div>
    </Section>
  );
};

export const heroBlockSchema: Template = {
  name: 'hero',
  label: 'Hero',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: 'This Big Text is Totally Awesome',
      subheadline: 'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Tagline',
      name: 'tagline',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'string',
      label: 'Headline',
      name: 'headline',
    },
    {
      type: 'string',
      label: 'Subheadline',
      name: 'subheadline',
    },
    {
      label: 'Actions',
      name: 'actions',
      type: 'object',
      list: true,
      ui: {
        defaultItem: {
          label: 'Action Label',
          type: 'button',
          icon: {
            name: "Tina",
            color: "white",
            style: "float",
          },
          link: '/',
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: 'Label',
          name: 'label',
          type: 'string',
        },
        {
          label: 'Type',
          name: 'type',
          type: 'string',
          options: [
            { label: 'Button', value: 'button' },
            { label: 'Link', value: 'link' },
          ],
        },
        iconSchema as any,
        {
          label: 'Link',
          name: 'link',
          type: 'string',
        },
      ],
    },
    {
      type: 'object',
      label: 'Image',
      name: 'image',
      fields: [
        {
          name: 'src',
          label: 'Image Source',
          type: 'image',
        },
        {
          name: 'alt',
          label: 'Alt Text',
          type: 'string',
        },
        {
          name: 'videoUrl',
          label: 'Video URL',
          type: 'string',
          description: 'If using a YouTube video, make sure to use the embed version of the video URL',
        },
      ],
    },
  ],
};
