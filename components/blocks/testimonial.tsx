import React from "react";
import { Section } from "../layout/section";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";

const getMediaUrl = (media: any): string | null => {
  if (!media) return null;
  if (typeof media === 'string') return media;
  return media.url || null;
};

export const Testimonial = ({ data }: { data: any }) => {
  return (
    <Section background={data.style?.background || undefined}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold uppercase tracking-wide text-foreground">{data.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{data.description}</p>
        </div>
        <div className="[column-width:350px] [column-gap:1.5rem]">
          {data.testimonials?.map((testimonial: any, index: number) => (
            <TestimonialCard key={index} testimonial={testimonial!} />
          ))}
        </div>
      </div>
    </Section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: any }) => {
  const avatarUrl = getMediaUrl(testimonial.avatar);
  return (
    <Card className="mb-6 break-inside-avoid rounded-2xl border-border/60 bg-white/80 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:bg-[#1b1f24]">
      <CardContent className="p-6">
        <blockquote className="mb-6">
          <p className="text-lg leading-relaxed text-foreground italic">&ldquo;{testimonial.quote}&rdquo;</p>
        </blockquote>

        <div className="flex items-center gap-4 border-t border-border/40 pt-4">
          <Avatar className="size-12 ring-2 ring-primary/20">
            {avatarUrl && (
              <AvatarImage alt={testimonial.author!} src={avatarUrl} loading="lazy" width="120" height="120" />
            )}
            <AvatarFallback className="bg-primary/10 text-primary font-bold">{testimonial.author!.split(" ").map((word: string) => word[0]).join("")}</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-bold text-foreground">{testimonial.author}</h3>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">{testimonial.role}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
