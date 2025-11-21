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
        <Section>
            <div className="mx-auto max-w-4xl rounded-3xl bg-[#1b1f24] px-8 py-16 text-center shadow-2xl md:px-16">
                <h2 className="text-balance text-3xl font-bold uppercase tracking-wide text-white lg:text-4xl" data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70" data-tina-field={tinaField(data, 'description')}>{data.description}</p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    {data.actions && data.actions.map(action => (
                        <div
                            key={action!.label}
                            data-tina-field={tinaField(action)}>
                            <Button
                                asChild
                                size="lg"
                                variant={action!.type === 'link' ? 'ghost' : 'default'}
                                className={`rounded-full px-8 text-base transition-all duration-300 ${
                                    action!.type === 'link'
                                        ? 'bg-transparent text-white ring-1 ring-white/40 hover:bg-white/10'
                                        : 'bg-primary text-[#1b1f24] hover:bg-primary/90 hover:shadow-lg'
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
        previewSrc: "/blocks/cta.png",
        defaultItem: {
            title: "Start Building",
            description: "Get started with TinaCMS today and take your content management to the next level.",
            actions: [
                {
                    label: 'Get Started',
                    type: 'button',
                    link: '/',
                },
                {
                    label: 'Book Demo',
                    type: 'link',
                    link: '/',
                },
            ],
        },
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
