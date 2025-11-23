"use client";
import {
  PageBlocksFeatures,
  PageBlocksFeaturesItems,
} from "../../tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Link from "next/link";
import { Icon } from "../icon";
import { iconSchema } from "../../tina/fields/icon";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';

export const Features = ({ data }: { data: PageBlocksFeatures }) => {
  return (
    <Section background={data.style?.background || undefined} className="py-16 md:py-24" fullBleed>
      <div className="@container mx-auto w-full px-6 md:px-12">
        <div className="text-center">
          <h2 data-tina-field={tinaField(data, 'title')} className="text-balance text-3xl font-bold uppercase tracking-[0.18em] text-foreground md:text-4xl">
            {data.title}
          </h2>
          <p data-tina-field={tinaField(data, 'description')} className="mx-auto mt-6 max-w-3xl text-base text-muted-foreground md:text-lg leading-relaxed">
            {data.description}
          </p>
        </div>
        <div className="mx-auto mt-8 grid w-full gap-6 md:grid-cols-3 md:mt-16">
          {data.items &&
            data.items.map(function (block, i) {
              return <Feature key={i} {...block!} />;
            })}
        </div>
      </div>
    </Section>
  )
}

export const Feature: React.FC<PageBlocksFeaturesItems> = (data) => {
  return (
    <Card className="group relative flex flex-col justify-between border-border/50 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 dark:bg-[#1b1f24]">
      {data.link && (
        <Link href={data.link} className="absolute inset-0 z-10" aria-label={data.title || undefined} />
      )}
      <CardHeader className="pb-3 pt-8 px-8">
        {data.icon && (
          <div
            data-tina-field={tinaField(data, 'icon')}
            className="mb-6 inline-flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-[#1b1f24]"
          >
            <Icon data={{ ...data.icon, size: 'xl' }} />
          </div>
        )}
        <h3
          data-tina-field={tinaField(data, "title")}
          className="text-xl font-bold uppercase tracking-wide text-foreground"
        >
          {data.title}
        </h3>
      </CardHeader>

      <CardContent className="text-sm leading-relaxed text-muted-foreground px-8 pb-8">
        <TinaMarkdown content={data.text} />
      </CardContent>
    </Card>
  );
};

const defaultFeature = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
  icon: {
    name: "Tina",
    color: "white",
    style: "float",
  }
};

export const featureBlockSchema: Template = {
  name: "features",
  label: "Features",
  ui: {
    previewSrc: '/blocks/features.svg',
    defaultItem: {
      title: 'Why Choose Ogle County?',
      description: 'We offer a strategic location, business-friendly environment, and robust support infrastructure.',
      items: [
        {
          title: "Site Selection",
          text: "Comprehensive database of available industrial and commercial properties.",
          icon: {
            name: "BiBuilding",
            color: "primary",
            style: "float",
          }
        },
        {
          title: "Incentives",
          text: "Guidance on local, state, and federal incentive programs for your business.",
          icon: {
            name: "BiDollarCircle",
            color: "primary",
            style: "float",
          }
        },
        {
          title: "Workforce",
          text: "Access to a skilled and dedicated workforce in the Ogle County region.",
          icon: {
            name: "BiGroup",
            color: "primary",
            style: "float",
          }
        }
      ],
    },
    itemProps: (item) => ({ label: item.title || 'Features' }),
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
    },
    {
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultFeature,
        },
      },
      fields: [
        iconSchema as any,
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Text",
          name: "text",
        },
        {
          type: "string",
          label: "Link",
          name: "link",
        },
      ],
    },
  ],
};
