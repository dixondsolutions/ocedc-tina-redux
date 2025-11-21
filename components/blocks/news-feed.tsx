'use client';
import React, { useEffect, useState } from 'react';
import type { Template } from 'tinacms';
import { PageBlocksNewsFeed } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import client from '../../tina/__generated__/client';
import Link from 'next/link';
import { format } from 'date-fns';

export const NewsFeed = ({ data }: { data: PageBlocksNewsFeed }) => {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await client.queries.postConnection({
                    last: 3,
                    sort: 'date',
                });
                setPosts(postsData.data.postConnection.edges?.map((edge) => edge?.node) || []);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <Section background={data.background!}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    {data.title && (
                        <h2
                            data-tina-field={tinaField(data, 'title')}
                            className="text-3xl font-bold uppercase tracking-wide text-foreground"
                        >
                            {data.title}
                        </h2>
                    )}
                    <Link
                        href="/news"
                        className="text-primary hover:underline font-medium"
                    >
                        View All News &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="space-y-6">
                        {posts[0] && (
                            <div className="group relative overflow-hidden rounded-2xl">
                                <div className="relative aspect-video w-full overflow-hidden">
                                    {posts[0].heroImg ? (
                                        <img
                                            src={posts[0].heroImg}
                                            alt={posts[0].title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                    <div className="absolute bottom-0 left-0 p-6 text-white md:p-8">
                                        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                                            {posts[0].date ? format(new Date(posts[0].date), 'MMMM d, yyyy') : ''}
                                        </p>
                                        <h3 className="text-2xl font-bold leading-tight md:text-3xl">
                                            <Link href={`/news/${posts[0]._sys.filename}`} className="hover:text-primary transition-colors">
                                                {posts[0].title}
                                            </Link>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        {posts.slice(1).map((post) => (
                            <div key={post.id} className="group flex items-start gap-4 border-b border-border/40 pb-6 last:border-0">
                                <div className="relative aspect-square size-24 shrink-0 overflow-hidden rounded-lg bg-muted md:size-32">
                                    {post.heroImg ? (
                                        <img
                                            src={post.heroImg}
                                            alt={post.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                                        {post.date ? format(new Date(post.date), 'MMMM d, yyyy') : ''}
                                    </p>
                                    <h3 className="text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                                        <Link href={`/news/${post._sys.filename}`}>
                                            {post.title}
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export const newsFeedBlockSchema: Template = {
    name: 'newsFeed',
    label: 'News Feed',
    ui: {
        previewSrc: '/blocks/content.png', // Placeholder
        defaultItem: {
            title: 'Latest News',
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
    ],
};
