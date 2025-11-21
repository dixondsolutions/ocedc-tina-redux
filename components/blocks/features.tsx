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
    <Section background={data.background!}>
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 data-tina-field={tinaField(data, 'title')} className="text-balance text-4xl font-bold uppercase tracking-[0.18em] text-foreground lg:text-5xl">
            {data.title}
          </h2>
          <p data-tina-field={tinaField(data, 'description')} className="mt-4 text-base text-muted-foreground lg:text-lg">
            {data.description}
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-sm gap-6 md:max-w-full md:grid-cols-3 md:mt-16">
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
    <Card className="group relative flex flex-col justify-between border-border/50 bg-background shadow-none transition-all hover:border-primary/50 hover:shadow-md dark:bg-[#1b1f24]">
      {data.link && (
        <Link href={data.link} className="absolute inset-0 z-10" aria-label={data.title} />
      )}
      <CardHeader className="pb-3 pt-8 px-8">
        {data.icon && (
          <div
            data-tina-field={tinaField(data, 'icon')}
            className="mb-4 inline-flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-[#1b1f24]"
          >
            <Icon data={{ ...data.icon, size: 'large' }} />
          </div>
        )}
        <h3
          data-tina-field={tinaField(data, "title")}
          className="text-xl font-bold uppercase tracking-wide text-foreground"
        >
          {data.title}
        </h3>
      </CardHeader>

      <CardContent className="text-base leading-relaxed text-muted-foreground px-8 pb-8">
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
    previewSrc: "/blocks/features.png",
    defaultItem: {
      title: 'Built to cover your needs',
      description: 'We have a lot of features to cover your needs',
      items: [defaultFeature, defaultFeature, defaultFeature],
    },
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
