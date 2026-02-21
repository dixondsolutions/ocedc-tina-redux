import React from 'react';
import Link from 'next/link';
import { Section } from '../layout/section';
import { Icon } from '../icon';

const getMediaUrl = (media: any): string | null => {
    if (!media) return null;
    if (typeof media === 'string') return media;
    return media.url || null;
};

export const IndustriesGrid = ({ data }: { data: any }) => {
    return (
        <Section background={data.style?.background || undefined}>
            <div className="container mx-auto px-4">
                {data.title && (
                    <h2
                        className="text-3xl font-bold uppercase tracking-wide text-center mb-12 text-foreground"
                    >
                        {data.title}
                    </h2>
                )}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {data.industries &&
                        data.industries.map((item: any, i: number) => {
                            const imageUrl = getMediaUrl(item?.image);
                            return (
                            <div
                                key={i}
                                className="group relative flex h-[320px] flex-col justify-end overflow-hidden rounded-xl bg-[#1b1f24] p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                            >
                                {imageUrl && (
                                    <>
                                        <img
                                            src={imageUrl}
                                            alt={item.title || 'Industry image'}
                                            className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1b1f24] via-[#1b1f24]/50 to-transparent" />
                                    </>
                                )}
                                <div className="relative z-10 flex flex-col gap-3">
                                    {item?.icon && (
                                        <div className="mb-2 inline-flex size-10 items-center justify-center rounded-full bg-primary/90 text-[#1b1f24] backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                                            <Icon
                                                data={{ ...item.icon, size: 'small', color: 'custom' }}
                                            />
                                        </div>
                                    )}
                                    <h3
                                        className="text-xl font-bold uppercase tracking-wide text-white group-hover:text-primary transition-colors"
                                    >
                                        {item?.title}
                                    </h3>
                                    <p
                                        className="line-clamp-3 text-sm leading-relaxed text-gray-300 group-hover:text-white transition-colors"
                                    >
                                        {item?.description}
                                    </p>
                                    {item?.link && (
                                        <Link href={item.link} className="absolute inset-0 z-20" aria-label={`View ${item.title}`} />
                                    )}
                                </div>
                            </div>
                        )})}
                </div>
            </div>
        </Section>
    );
};
