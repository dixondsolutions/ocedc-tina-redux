import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends React.HTMLProps<HTMLElement> {
  background?: string;
  children: ReactNode;
  fullBleed?: boolean;
  padding?: string;
  width?: string;
  alignment?: string;
}

export const Section: React.FC<SectionProps> = ({
  className,
  children,
  background,
  fullBleed = false,
  padding = "py-12",
  width = "max-w-7xl",
  alignment = "text-left",
  ...props
}) => {
  const sectionWidth = fullBleed || width === "w-full" ? "w-full" : `mx-auto ${width} px-6`;
  
  return (
    <div className={background || "bg-default"}>
      <section
        className={cn(padding, sectionWidth, alignment, className)}
        {...props}
      >
        {children}
      </section>
    </div>
  );
};

export const tailwindBackgroundOptions = [
  { label: "Default", value: "bg-default" },
  { label: "White", value: "bg-white/80" },
  { label: "Gray", value: "bg-gray-50/80" },
  { label: "Zinc", value: "bg-zinc-50" },
  { label: "Black", value: "bg-black/80" },
  { label: "Red", value: "bg-red-50/80" },
  { label: "Orange", value: "bg-orange-50/80" },
  { label: "Yellow", value: "bg-yellow-50/80" },
  { label: "Green", value: "bg-green-50/80" },
  { label: "Lime", value: "bg-lime-50/80" },
  { label: "Emerald", value: "bg-emerald-50/80" },
  { label: "Teal", value: "bg-teal-50/80" },
  { label: "Cyan", value: "bg-cyan-50/80" },
  { label: "Blue", value: "bg-blue-50/80" },
  { label: "Sky", value: "bg-sky-50/80" },
  { label: "Indigo", value: "bg-indigo-50/80" },
  { label: "Violet", value: "bg-violet-50/80" },
  { label: "Purple", value: "bg-purple-50/80" },
  { label: "Fuchsia", value: "bg-fuchsia-50/80" },
  { label: "Pink", value: "bg-pink-50/80" },
  { label: "Rose", value: "bg-rose-50/80" },
];

export const sectionBlockSchemaField = {
  label: "Design",
  name: "style",
  type: "object",
  fields: [
    {
      type: "string",
      label: "Background",
      name: "background",
      options: tailwindBackgroundOptions,
    },
    {
      type: "string",
      label: "Padding",
      name: "padding",
      options: [
        { label: "Small", value: "py-8" },
        { label: "Medium", value: "py-12" },
        { label: "Large", value: "py-24" },
        { label: "Extra Large", value: "py-32" },
        { label: "None", value: "py-0" },
      ],
    },
    {
      type: "string",
      label: "Width",
      name: "width",
      options: [
        { label: "Narrow", value: "max-w-3xl" },
        { label: "Medium", value: "max-w-5xl" },
        { label: "Wide", value: "max-w-7xl" },
        { label: "Full", value: "w-full" },
      ],
    },
    {
      type: "string",
      label: "Alignment",
      name: "alignment",
      options: [
        { label: "Left", value: "text-left" },
        { label: "Center", value: "text-center" },
        { label: "Right", value: "text-right" },
      ],
    },
  ],
};