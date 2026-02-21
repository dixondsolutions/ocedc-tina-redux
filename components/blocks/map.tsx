import React from 'react';
import { Section } from '../layout/section';

export const Map = ({ data }: { data: any }) => {
    return (
        <Section background={data.style?.background || undefined}>
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-10 text-center">
                    {data.title && (
                        <h2
                            className="text-3xl font-bold uppercase tracking-wide text-foreground"
                        >
                            {data.title}
                        </h2>
                    )}
                    {data.description && (
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
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
