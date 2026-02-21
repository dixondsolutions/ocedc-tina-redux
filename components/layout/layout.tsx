import React, { PropsWithChildren } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { LayoutProvider, type GlobalSettings } from "./layout-context";
import { Header } from "./nav/header";
import { Footer } from "./nav/footer";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  const payload = await getPayload({ config });

  const [headerData, footerData, themeData] = await Promise.all([
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'footer' }),
    payload.findGlobal({ slug: 'theme' }),
  ]);

  const globalSettings: GlobalSettings = {
    header: headerData as any,
    footer: footerData as any,
    theme: themeData as any,
  };

  return (
    <LayoutProvider
      globalSettings={JSON.parse(JSON.stringify(globalSettings))}
      pageData={JSON.parse(JSON.stringify(rawPageData || {}))}
    >
      <Header />
      <main className="overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </LayoutProvider>
  );
}
