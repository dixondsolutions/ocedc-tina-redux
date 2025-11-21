import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { PageBlocksStats } from "@/tina/__generated__/types";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';

export const Stats = ({ data }: { data: PageBlocksStats }) => {
    return (
        <Section background={data.background!} className="py-16 md:py-24">
            <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl" data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
                    {data.description && (
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground" data-tina-field={tinaField(data, 'description')}>{data.description}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {data.stats?.map((stat) => (
                        <div key={stat?.type} className="group flex flex-col items-center text-center rounded-2xl bg-white/80 dark:bg-[#1b1f24] p-8 shadow-sm ring-1 ring-black/5 dark:ring-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                            <dt className="text-xs font-bold uppercase tracking-widest text-primary" data-tina-field={tinaField(stat, 'type')}>{stat!.type}</dt>
                            <dd className="mt-3 text-5xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors" data-tina-field={tinaField(stat, 'stat')}>{stat!.stat}</dd>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}


export const statsBlockSchema: Template = {
    name: "stats",
    label: "Stats",
    ui: {
        previewSrc: "/blocks/stats.png",
        defaultItem: {
            title: "TinaCMS by the numbers",
            description: "TinaCMS is an open-source content management system that allows developers to create and manage content for their websites and applications. It provides a flexible and customizable framework for building content-driven applications.",
            stats: [
                {
                    stat: "12K",
                    type: "Stars on GitHub",
                },
                {
                    stat: "11K",
                    type: "Active Users",
                },
                {
                    stat: "22K",
                    type: "Powered Apps",
                },
            ],
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
            label: "Stats",
            name: "stats",
            list: true,
            ui: {
                defaultItem: {
                    stat: "12K",
                    type: "Stars on GitHub",
                },
                itemProps: (item) => {
                    return {
                        label: `${item.stat} ${item.type}`,
                    };
                },
            },
            fields: [
                {
                    type: "string",
                    label: "Stat",
                    name: "stat",
                },
                {
                    type: "string",
                    label: "Type",
                    name: "type",
                },
            ],
        },
    ],
};