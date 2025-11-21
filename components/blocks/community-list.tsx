'use client';
import React, { useEffect, useState } from 'react';
import type { Template } from 'tinacms';
import { PageBlocksCommunityList } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import client from '../../tina/__generated__/client';
import Link from 'next/link';

export const CommunityList = ({ data }: { data: PageBlocksCommunityList }) => {
    const [communities, setCommunities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const communitiesData = await client.queries.communitiesConnection({
                    last: 12,
                });
                setCommunities(communitiesData.data.communitiesConnection.edges?.map((edge) => edge?.node) || []);
            } catch (error) {
                console.error('Error fetching communities:', error);
                setCommunities([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCommunities();
    }, []);

    const ctaLabel = (data as any)?.ctaLabel || 'View Profile';

    return (
        <Section background={data.background!}>
            <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6">
                <div className="space-y-4 text-center">
                    {data.title && (
                        <h2
                            data-tina-field={tinaField(data, 'title')}
                            className="text-3xl font-bold uppercase tracking-wide text-foreground md:text-4xl"
                        >
                            {data.title}
                        </h2>
                    )}
                    {data.description && (
                        <p
                            data-tina-field={tinaField(data, 'description')}
                            className="mx-auto max-w-3xl text-base text-muted-foreground md:text-lg"
                        >
                            {data.description}
                        </p>
                    )}
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        <div className="col-span-3 py-12 text-center text-gray-500">Loading communities...</div>
                    ) : communities.length === 0 ? (
                        <div className="col-span-3 py-12 text-center text-gray-500">No communities available at this time.</div>
                    ) : (
                        communities.map((community) => (
                            <div
                                key={community.id}
                                className="overflow-hidden rounded-3xl border border-border/70 bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg dark:bg-slate-900/80"
                            >
                                {community.gallery && community.gallery.length > 0 && (
                                    <img
                                        src={community.gallery[0]}
                                        alt={community.name}
                                        className="h-48 w-full object-cover"
                                        loading="lazy"
                                    />
                                )}
                                <div className="space-y-4 p-6">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Member Community</p>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            <Link href={`/communities/${community._sys.filename}`} className="hover:text-primary transition-colors">
                                                {community.name}
                                            </Link>
                                        </h3>
                                        {community.population && (
                                            <p className="text-sm text-muted-foreground">Population: {community.population}</p>
                                        )}
                                    </div>
                                    {community.keyEmployers && community.keyEmployers.length > 0 && (
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Key Employers</p>
                                            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                                                {community.keyEmployers.slice(0, 3).map((employer: string) => (
                                                    <li key={employer}>{employer}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <Link
                                        href={`/communities/${community._sys.filename}`}
                                        className="inline-flex w-full items-center justify-center rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                                    >
                                        {ctaLabel}
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Section>
    );
};

export const communityListBlockSchema: Template = {
    name: 'communityList',
    label: 'Community List',
    ui: {
        previewSrc: '/blocks/content.png', // Placeholder
        defaultItem: {
            title: 'Our Member Communities',
            description: 'Six municipalities collaborate through OCEDC to provide a seamless service area.',
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
            label: 'Description',
            name: 'description',
            ui: {
                component: 'textarea',
            },
        },
        {
            type: 'string',
            label: 'Button Label',
            name: 'ctaLabel',
        },
    ],
};
