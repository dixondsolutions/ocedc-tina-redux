'use client';
import React, { useEffect, useState } from 'react';
import { Section } from '../layout/section';
import Link from 'next/link';

const getMediaUrl = (media: any): string | null => {
    if (!media) return null;
    if (typeof media === 'string') return media;
    return media.url || null;
};

export const CommunityList = ({ data }: { data: any }) => {
    const [communities, setCommunities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const response = await fetch('/api/communities?limit=12&depth=1');
                const result = await response.json();
                setCommunities(result.docs || []);
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

    const getGalleryImage = (community: any): string | null => {
        if (!community.gallery || community.gallery.length === 0) return null;
        const first = community.gallery[0];
        if (typeof first === 'string') return first;
        if (first?.image) return getMediaUrl(first.image);
        return getMediaUrl(first);
    };

    return (
        <Section background={data.style?.background || undefined}>
            <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6">
                <div className="space-y-4 text-center">
                    {data.title && (
                        <h2
                            className="text-3xl font-bold uppercase tracking-wide text-foreground md:text-4xl"
                        >
                            {data.title}
                        </h2>
                    )}
                    {data.description && (
                        <p
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
                        communities.map((community) => {
                            const galleryImg = getGalleryImage(community);
                            return (
                            <div
                                key={community.id}
                                className="overflow-hidden rounded-3xl border border-border/70 bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg dark:bg-slate-900/80"
                            >
                                {galleryImg && (
                                    <img
                                        src={galleryImg}
                                        alt={community.name}
                                        className="h-48 w-full object-cover"
                                        loading="lazy"
                                    />
                                )}
                                <div className="space-y-4 p-6">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Member Community</p>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            <Link href={`/communities/${community.slug || community.id}`} className="hover:text-primary transition-colors">
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
                                                {community.keyEmployers.slice(0, 3).map((employer: any) => (
                                                    <li key={employer.id || employer.name}>{employer.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <Link
                                        href={`/communities/${community.slug || community.id}`}
                                        className="inline-flex w-full items-center justify-center rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                                    >
                                        {ctaLabel}
                                    </Link>
                                </div>
                            </div>
                        )})
                    )}
                </div>
            </div>
        </Section>
    );
};
