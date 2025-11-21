import React from 'react';
import type { Template } from 'tinacms';
import { PageBlocksMap } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';

export const Map = ({ data }: { data: PageBlocksMap }) => {
    return (
        <Section background={data.background!}>
            <div className="container mx-auto px-4">
                {data.title && (
                    <h2
                        data-tina-field={tinaField(data, 'title')}
                        className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white"
                    >
                        {data.title}
                    </h2>
                )}
                <div className="w-full h-[400px] md:h-[500px] bg-gray-200 rounded-lg overflow-hidden shadow-md">
                    {data.embedCode ? (
                        <div
                            className="w-full h-full"
                            dangerouslySetInnerHTML={{ __html: data.embedCode }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <p>Map Embed Placeholder</p>
                        </div>
                    )}
                </div>
                {data.description && (
                    <div className="mt-4 text-center max-w-2xl mx-auto">
                        <p data-tina-field={tinaField(data, 'description')} className="text-gray-600 dark:text-gray-300">
                            {data.description}
                        </p>
                    </div>
                )}
            </div>
        </Section>
    );
};

export const mapBlockSchema: Template = {
    name: 'map',
    label: 'Map',
    ui: {
        previewSrc: '/blocks/content.png', // Placeholder
        defaultItem: {
            title: 'Our Location',
        },
    },
    fields: [
        {
            type: 'string',
            label: 'Background',
            name: 'background',
            options: [
                { label: 'Default', value: 'bg-default' },
                { label: 'White', value: 'bg-white' },
                { label: 'Gray', value: 'bg-gray-50' },
            ],
        },
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
