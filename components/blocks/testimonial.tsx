import React from "react";
import type { Template } from "tinacms";
import { PageBlocksTestimonial, PageBlocksTestimonialTestimonials } from "../../tina/__generated__/types";
import { Section } from "../layout/section";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { tinaField } from "tinacms/dist/react";
import { sectionBlockSchemaField } from '../layout/section';

export const Testimonial = ({ data }: { data: PageBlocksTestimonial }) => {
  return (
    <Section background={data.style?.background || undefined}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold uppercase tracking-wide text-foreground" data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground" data-tina-field={tinaField(data, 'description')}>{data.description}</p>
        </div>
        <div className="[column-width:350px] [column-gap:1.5rem]">
          {data.testimonials?.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial!} />
          ))}
        </div>
      </div>
    </Section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: PageBlocksTestimonialTestimonials }) => {
  return (
    <Card className="mb-6 break-inside-avoid rounded-2xl border-border/60 bg-white/80 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:bg-[#1b1f24]">
      <CardContent className="p-6">
        <blockquote className="mb-6" data-tina-field={tinaField(testimonial, 'quote')}>
          <p className="text-lg leading-relaxed text-foreground italic">&ldquo;{testimonial.quote}&rdquo;</p>
        </blockquote>

        <div className="flex items-center gap-4 border-t border-border/40 pt-4">
          <Avatar className="size-12 ring-2 ring-primary/20" data-tina-field={tinaField(testimonial, 'avatar')}>
            {testimonial.avatar && (
              <AvatarImage alt={testimonial.author!} src={testimonial.avatar} loading="lazy" width="120" height="120" />
            )}
            <AvatarFallback className="bg-primary/10 text-primary font-bold">{testimonial.author!.split(" ").map((word) => word[0]).join("")}</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-bold text-foreground" data-tina-field={tinaField(testimonial, 'author')}>{testimonial.author}</h3>
            <span className="text-xs font-bold uppercase tracking-widest text-primary" data-tina-field={tinaField(testimonial, 'role')}>{testimonial.role}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const testimonialBlockSchema: Template = {
  name: "testimonial",
  label: "Testimonial",
  ui: {
    previewSrc: '/blocks/testimonial.svg',
    defaultItem: {
      testimonials: [
        {
          quote:
            "OCEDC has been an invaluable partner in our expansion. Their support made the process seamless.",
          author: "Local Business Owner",
        },
      ],
    },
    itemProps: (item) => ({ label: item.title || 'Testimonials' }),
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
      ui: {
        component: "textarea",
      },
    },
    {
      type: "object",
      list: true,
      label: "Testimonials",
      name: "testimonials",
      ui: {
        defaultItem: {
          quote: "There are only two hard things in Computer Science: cache invalidation and naming things.",
          author: "Phil Karlton",
        },
        itemProps: (item) => {
          return {
            label: `${item.quote} - ${item.author}`,
          };
        },
      },
      fields: [
        {
          type: "string",
          ui: {
            component: "textarea",
          },
          label: "Quote",
          name: "quote",
        },
        {
          type: "string",
          label: "Author",
          name: "author",
        },
        {
          type: "string",
          label: "Role",
          name: "role",
        },
        {
          type: "image",
          label: "Avatar",
          name: "avatar",
        }
      ],
    },
  ],
};
