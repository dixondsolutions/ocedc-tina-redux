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
    <Section 
      background={data.style?.background || (data as any).background || undefined}
      padding={data.style?.padding || undefined}
      width={data.style?.width || undefined}
      alignment={data.style?.alignment || undefined}
      className="" 
      fullBleed={false}
    >
      <div className="relative isolate w-full overflow-hidden bg-background text-foreground min-h-[85vh] flex flex-col dark" data-tina-field={tinaField(data, 'image')}>
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
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="relative z-10 flex flex-grow flex-col justify-center gap-8 px-6 py-16 lg:px-14 lg:py-24">
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
                  className="text-pretty text-4xl font-semibold tracking-tight md:text-6xl xl:text-7xl leading-[1.1]"
                >
                  {data.headline}
                </TextEffect>
              </div>
            )}
            {data.subheadline && (
              <p data-tina-field={tinaField(data, 'subheadline')} className="max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
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
                        className={`rounded-full px-8 text-lg font-semibold ${
                          action.type === 'link'
                            ? 'bg-transparent text-foreground ring-1 ring-foreground/40 hover:bg-foreground/10'
                            : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 transition-transform shadow-lg shadow-primary/20'
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
    previewSrc: '/blocks/hero.svg',
    defaultItem: {
      tagline: "Welcome to Ogle County",
      headline: 'Building a Brighter Future',
      subheadline: 'Your partner for economic growth, business expansion, and community development in Northern Illinois.',
    },
    itemProps: (item) => ({ label: item.headline }),
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
