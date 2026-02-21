'use client';

import React from 'react';
import Script from 'next/script';
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
      {/* Leaflet CSS */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"
        crossOrigin=""
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet-draw@0.4.12/dist/leaflet.draw.css"
        crossOrigin=""
      />
      {/* Google font used by LOIS */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css?family=Muli:400,600,700"
        rel="stylesheet"
      />
      {/* LOIS app CSS */}
      <link rel="stylesheet" href={`${base}/static/css/main.99f5e087.css`} />

      {/* LOIS mount point */}
      <div
        data-organization={organizationId}
        id="LoisRoot"
        className="lois-container mx-auto max-w-6xl px-4 sm:px-6"
      />

      {/* LOIS app JS — loaded after interactive so the mount div exists */}
      <Script
        src={`${base}/static/js/main.5f73a208.js`}
        strategy="afterInteractive"
      />
    </Section>
  );
};
