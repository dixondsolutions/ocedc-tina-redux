import React from 'react';
import type { Template } from 'tinacms';
import { PageBlocksContactForm } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';

export const ContactForm = ({ data }: { data: PageBlocksContactForm }) => {
    return (
        <Section background={data.background!}>
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-10 text-center">
                    {data.title && (
                        <h2
                            data-tina-field={tinaField(data, 'title')}
                            className="mb-4 text-3xl font-bold text-gray-900 dark:text-white"
                        >
                            {data.title}
                        </h2>
                    )}
                    {data.text && (
                        <p
                            data-tina-field={tinaField(data, 'text')}
                            className="text-lg text-gray-600 dark:text-gray-300"
                        >
                            {data.text}
                        </p>
                    )}
                </div>

                <form className="rounded-3xl bg-white p-8 shadow-lg dark:bg-gray-900">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Name*
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary/40 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label htmlFor="company" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Company
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary/40 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                placeholder="Organization"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Email*
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary/40 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                placeholder="you@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary/40 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                placeholder="(555) 555-5555"
                            />
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="inquiry" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Inquiry type
                            </label>
                            <select
                                id="inquiry"
                                name="inquiry"
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary/40 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            >
                                <option>General inquiry</option>
                                <option>Site selection</option>
                                <option>Business expansion</option>
                                <option>Media inquiry</option>
                                <option>Membership</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="file" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                File upload (RFP, specs)
                            </label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                className="w-full rounded-md border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-600 focus:border-primary focus:ring-primary/40 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={6}
                            className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-primary focus:ring-primary/40 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            placeholder="Tell us about your project, data request, or meeting needs."
                        ></textarea>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            type="submit"
                            className="rounded-full bg-blue-600 px-8 py-3 font-bold text-white transition-colors hover:bg-blue-700"
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
