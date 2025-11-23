'use client';
import React, { useEffect, useState } from 'react';
import type { Template } from 'tinacms';
import { PageBlocksPropertyListing } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { Section, sectionBlockSchemaField } from '../layout/section';
import client from '@/lib/tina-client';
import Link from 'next/link';

export const PropertyListing = ({ data }: { data: PageBlocksPropertyListing }) => {
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const propertiesData = await client.queries.propertiesConnection({
                    last: 6,
                });
                setProperties(propertiesData.data.propertiesConnection.edges?.map((edge) => edge?.node) || []);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setProperties([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const ctaLabel = (data as any)?.ctaLabel || 'View all sites & buildings →';
    const ctaHref = (data as any)?.ctaHref || '/sites-buildings';

    return (
        <Section background={data.style?.background || undefined}>
            <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
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
                                className="mt-2 text-base text-muted-foreground"
                            >
                                {data.description}
                            </p>
                        )}
                    </div>
                    <Link href={ctaHref} className="text-sm font-semibold text-primary hover:underline">
                        {ctaLabel}
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        <div className="col-span-3 py-12 text-center text-gray-500">Loading properties...</div>
                    ) : properties.length === 0 ? (
                        <div className="col-span-3 py-12 text-center text-gray-500">No properties available at this time.</div>
                    ) : (
                        properties.map((property) => (
                            <div
                                key={property.id}
                                className="overflow-hidden rounded-3xl border border-border/70 bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg dark:bg-slate-900/80"
                            >
                                {property.gallery && property.gallery.length > 0 && (
                                    <img
                                        src={property.gallery[0]}
                                        alt={property.name}
                                        className="h-48 w-full object-cover"
                                        loading="lazy"
                                    />
                                )}
                                <div className="space-y-4 p-6">
                                    <div className="flex items-center justify-between">
                                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                                            {property.type}
                                        </span>
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                                                property.status === 'available'
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : property.status === 'under_contract'
                                                        ? 'bg-amber-100 text-amber-700'
                                                        : 'bg-slate-100 text-slate-600'
                                            }`}
                                        >
                                            {property.status?.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            <Link href={`/properties/${property._sys.filename}`} className="hover:text-primary transition-colors">
                                                {property.name}
                                            </Link>
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{property.location}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 rounded-2xl bg-muted/70 p-4 text-sm">
                                        <div>
                                            <p className="font-semibold text-muted-foreground">Size</p>
                                            <p className="text-foreground">{property.size}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-muted-foreground">Price</p>
                                            <p className="text-foreground">{property.price || 'Contact for details'}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-muted-foreground">Utilities</p>
                                            <p className="text-foreground">
                                                {property.utilities && property.utilities.length > 0 ? property.utilities.slice(0, 2).join(', ') : 'Core services'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-muted-foreground">Rail</p>
                                            <p className="text-foreground">{property.railAccess ? 'Direct access' : 'Nearby service'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Section>
    );
};

export const propertyListingBlockSchema: Template = {
    name: 'propertyListing',
    label: 'Property Listing',
    ui: {
        previewSrc: '/blocks/property-listing.svg', // Placeholder
        defaultItem: {
            title: 'Featured Properties',
        },
        itemProps: (item) => ({ label: item.title || 'Property Listing' }),
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
            label: 'Description',
            name: 'description',
            ui: {
                component: 'textarea',
            },
        },
        {
            type: 'string',
            label: 'CTA Label',
            name: 'ctaLabel',
        },
        {
            type: 'string',
            label: 'CTA Link',
            name: 'ctaHref',
        },
    ],
};
