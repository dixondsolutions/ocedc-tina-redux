"use client";
import Link from "next/link";
import { Icon } from "../icon";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Section } from "../layout/section";
import { RichText } from "@/components/rich-text";

export const Features = ({ data }: { data: any }) => {
  return (
    <Section background={data.style?.background || undefined} className="py-16 md:py-24" fullBleed>
      <div className="@container mx-auto w-full px-6 md:px-12">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold uppercase tracking-[0.18em] text-foreground md:text-4xl">
            {data.title}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base text-muted-foreground md:text-lg leading-relaxed">
            {data.description}
          </p>
        </div>
        <div className="mx-auto mt-8 grid w-full gap-6 md:grid-cols-3 md:mt-16">
          {data.items &&
            data.items.map(function (block: any, i: number) {
              return <Feature key={i} {...block!} />;
            })}
        </div>
      </div>
    </Section>
  )
}

export const Feature: React.FC<any> = (data) => {
  return (
    <Card className="group relative flex flex-col justify-between border-border/50 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 dark:bg-[#1b1f24]">
      {data.link && (
        <Link href={data.link} className="absolute inset-0 z-10" aria-label={data.title || undefined} />
      )}
      <CardHeader className="pb-3 pt-8 px-8">
        {data.icon && (
          <div
            className="mb-6 inline-flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-[#1b1f24]"
          >
            <Icon data={{ ...data.icon, size: 'xl' }} />
          </div>
        )}
        <h3
          className="text-xl font-bold uppercase tracking-wide text-foreground"
        >
          {data.title}
        </h3>
      </CardHeader>

      <CardContent className="text-sm leading-relaxed text-muted-foreground px-8 pb-8">
        <RichText data={data.text} />
      </CardContent>
    </Card>
  );
};
