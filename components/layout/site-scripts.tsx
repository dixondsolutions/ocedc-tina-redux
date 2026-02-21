import React from 'react'
import Script from 'next/script'
import type { ScriptsData } from './layout-context'

export function SiteScripts({ scripts }: { scripts: ScriptsData }) {
  const gtm = scripts?.googleTagManager
  const customScripts = scripts?.customScripts

  return (
    <>
      {/* Google Tag Manager */}
      {gtm?.enabled && gtm?.containerId && (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtm.containerId}');`}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtm.containerId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {/* Custom Scripts */}
      {customScripts
        ?.filter((s) => s?.enabled && s?.code)
        .map((script) => (
          <Script
            key={script.id || script.name}
            id={`custom-${script.id || script.name?.toLowerCase().replace(/\s+/g, '-')}`}
            strategy={(script.strategy as 'afterInteractive' | 'lazyOnload') || 'afterInteractive'}
            dangerouslySetInnerHTML={{ __html: script.code! }}
          />
        ))}
    </>
  )
}
