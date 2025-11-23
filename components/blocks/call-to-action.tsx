import Link from 'next/link'
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { iconSchema } from '@/tina/fields/icon';
import { Button } from '@/components/ui/button'
import { PageBlocksCta } from '@/tina/__generated__/types';
import { Icon } from '../icon';
import { Section } from '../layout/section';

export const CallToAction = ({ data }: { data: PageBlocksCta }) => {
    return (
    <Section fullBleed className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[95%] rounded-[2.5rem] bg-gradient-to-br from-sidebar to-sidebar-border px-8 py-20 text-center shadow-2xl md:px-16 lg:py-24 relative overflow-hidden dark">
        <div className="absolute inset-0 bg-[url('/texture.png')] opacity-5 mix-blend-overlay"></div>
                <h2 className="text-balance text-3xl font-bold uppercase tracking-wide text-foreground lg:text-5xl" data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground" data-tina-field={tinaField(data, 'description')}>{data.description}</p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    {data.actions && data.actions.map(action => (
                        <div
                            key={action!.label}
                            data-tina-field={tinaField(action)}>
                            <Button
                                asChild
                                size="lg"
                                variant={action!.type === 'link' ? 'ghost' : 'default'}
                                className={`rounded-full px-8 text-lg font-semibold transition-all duration-300 ${
                                    action!.type === 'link'
                                        ? 'bg-transparent text-foreground ring-1 ring-foreground/40 hover:bg-foreground/10'
                                        : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5'
                                }`}>
                                <Link href={action!.link!}>
                                    {action?.icon && (<Icon data={action?.icon} />)}
                                    <span className="text-nowrap">{action!.label}</span>
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}


export const ctaBlockSchema: Template = {
    name: "cta",
    label: "CTA",
    ui: {
        previewSrc: '/blocks/cta.svg',
        defaultItem: {
            title: "Ready to Grow in Ogle County?",
            description: "Connect with us to explore opportunities, incentives, and sites available for your business.",
            actions: [
                {
                    label: 'Contact Us',
                    type: 'button',
                    link: '/contact',
                },
                {
                    label: 'View Sites',
                    type: 'link',
                    link: '/sites-buildings',
                },
            ],
        },
        itemProps: (item) => ({ label: item.title || 'CTA' }),
    },
    fields: [
        {
            type: "string",
            label: "Title",
            name: "title",
        },
        {
            type: "string",
            label: "Description",
            name: "description",
            ui: {
                component: "textarea",
            },
        },
        {
            label: 'Actions',
            name: 'actions',
            type: 'object',
            list: true,
            ui: {
                defaultItem: {
                    label: 'Action Label',
                    type: 'button',
                    icon: {
                        name: "Tina",
                        color: "white",
                        style: "float",
                    },
                    link: '/',
                },
                itemProps: (item) => ({ label: item.label }),
            },
            fields: [
                {
                    label: 'Label',
                    name: 'label',
                    type: 'string',
                },
                {
                    label: 'Type',
                    name: 'type',
                    type: 'string',
                    options: [
                        { label: 'Button', value: 'button' },
                        { label: 'Link', value: 'link' },
                    ],
                },
                iconSchema as any,
                {
                    label: 'Link',
                    name: 'link',
                    type: 'string',
                },
            ],
        },
    ],
};
