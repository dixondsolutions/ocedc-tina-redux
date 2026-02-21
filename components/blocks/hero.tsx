'use client';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { Icon } from '../icon';
import { Section } from '../layout/section';
import { AnimatedGroup } from '../motion-primitives/animated-group';
import { TextEffect } from '../motion-primitives/text-effect';
import { Button } from '../ui/button';
import HeroVideoDialog from '../ui/hero-video-dialog';

const getMediaUrl = (media: any): string | null => {
  if (!media) return null;
  if (typeof media === 'string') return media;
  return media.url || null;
};

export const Hero = ({ data }: { data: any }) => {
  const videoSrc = data.image?.videoUrl;
  const imageSrc = getMediaUrl(data.image?.src);

  return (
    <Section
      background={data.style?.background || undefined}
      padding={data.style?.padding || undefined}
      width={data.style?.width || undefined}
      alignment={data.style?.alignment || undefined}
      className=""
      fullBleed={false}
    >
      <div className="relative isolate w-full overflow-hidden bg-background text-foreground min-h-[85vh] flex flex-col dark">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={data.image?.alt || data.headline || 'Ogle County'}
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
              <p className="text-xs uppercase tracking-[0.6em] text-primary/80">
                {data.tagline}
              </p>
            )}
            {data.headline && (
              <div>
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
              <p className="max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
                {data.subheadline}
              </p>
            )}

            <AnimatedGroup className="flex flex-wrap gap-3">
              {data.actions?.map(
                (action: any) =>
                  action?.label &&
                  action?.link && (
                    <div key={action.label}>
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
              {videoSrc && imageSrc && (
                <div className="w-full max-w-sm">
                  <HeroVideoDialog
                    videoSrc={videoSrc}
                    thumbnailSrc={imageSrc}
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
