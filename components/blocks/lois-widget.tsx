'use client';

import React from 'react';
import { Section } from '../layout/section';

interface LoisWidgetProps {
  baseUrl: string;
  organizationId: string;
  background?: string;
}

export const LoisWidget = ({ baseUrl, organizationId, background }: LoisWidgetProps) => {
  const normalized = /^https?:\/\//i.test(baseUrl) ? baseUrl : `https://${baseUrl}`;
  const base = normalized.replace(/\/+$/, '');

  return (
    <Section background={background}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <iframe
          title="Property Listings — LocationOne"
          src={base}
          className="h-[800px] w-full rounded-2xl border border-border shadow-lg"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allow="geolocation"
        />
      </div>
    </Section>
  );
};
