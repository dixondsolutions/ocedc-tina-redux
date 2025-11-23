import React from 'react';
import type { Template } from 'tinacms';
import { PageBlocksMap } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { Section, sectionBlockSchemaField } from '../layout/section';

export const Map = ({ data }: { data: PageBlocksMap }) => {
    return (
        <Section background={data.style?.background || undefined}>
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-10 text-center">
                    {data.title && (
                        <h2
                            data-tina-field={tinaField(data, 'title')}
                            className="text-3xl font-bold uppercase tracking-wide text-foreground"
                        >
                            {data.title}
                        </h2>
                    )}
                    {data.description && (
                        <p data-tina-field={tinaField(data, 'description')} className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                            {data.description}
                        </p>
                    )}
                </div>
                <div className="w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
                    {data.embedCode ? (
                        <div
                            className="w-full h-full"
                            dangerouslySetInnerHTML={{ __html: data.embedCode }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                            <p>Map Embed Placeholder</p>
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
};

export const mapBlockSchema: Template = {
    name: 'map',
    label: 'Map',
    ui: {
        previewSrc: '/blocks/map.svg', // Placeholder
        defaultItem: {
            title: 'Our Location',
        },
        itemProps: (item) => ({ label: item.title || 'Map' }),
    },
    fields: [
        sectionBlockSchemaField as any,
        {
            type: 'string',
            label: 'Title',
            name: 'title',
        },
        {
            type: 'string',
            label: 'Embed Code',
            name: 'embedCode',
            ui: {
                component: 'textarea',
            },
            description: 'Paste the Google Maps embed iframe code here.',
        },
        {
            type: 'string',
            label: 'Description',
            name: 'description',
            ui: {
                component: 'textarea',
            },
        },
    ],
};
