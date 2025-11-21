import React from 'react';
import type { Template } from 'tinacms';
import { PageBlocksContactForm } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';

export const ContactForm = ({ data }: { data: PageBlocksContactForm }) => {
    return (
        <Section background={data.background!}>
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <div className="mb-12 text-center">
                    {data.title && (
                        <h2
                            data-tina-field={tinaField(data, 'title')}
                            className="text-3xl font-bold uppercase tracking-wide text-foreground"
                        >
                            {data.title}
                        </h2>
                    )}
                    {data.text && (
                        <p
                            data-tina-field={tinaField(data, 'text')}
                            className="mt-4 text-lg text-muted-foreground"
                        >
                            {data.text}
                        </p>
                    )}
                </div>

                <form className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5 dark:bg-[#1b1f24] dark:ring-white/10 md:p-12">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                                Name*
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label htmlFor="company" className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                                Company
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                                placeholder="Organization"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                                Email*
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                                placeholder="you@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                                placeholder="(555) 555-5555"
                            />
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="inquiry" className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                                Inquiry type
                            </label>
                            <select
                                id="inquiry"
                                name="inquiry"
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                            >
                                <option>General inquiry</option>
                                <option>Site selection</option>
                                <option>Business expansion</option>
                                <option>Media inquiry</option>
                                <option>Membership</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="file" className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                                File upload (RFP, specs)
                            </label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                className="w-full rounded-xl border border-dashed border-border bg-background px-4 py-3 text-sm text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={6}
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                            placeholder="Tell us about your project, data request, or meeting needs."
                        ></textarea>
                    </div>

                    <div className="mt-10 text-center">
                        <button
                            type="submit"
                            className="rounded-full bg-primary px-10 py-4 text-base font-bold text-[#1b1f24] shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </Section>
    );
};

export const contactFormBlockSchema: Template = {
    name: 'contactForm',
    label: 'Contact Form',
    ui: {
        previewSrc: '/blocks/content.png', // Placeholder
        defaultItem: {
            title: 'Get in Touch',
            text: 'We would love to hear from you.',
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
            label: 'Text',
            name: 'text',
            ui: {
                component: 'textarea',
            },
        },
    ],
};
