"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, footer } = globalSettings!;

  return (
    <footer className="bg-[#1b1f24] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="space-y-6">
            <Link href="/" aria-label="go home" className="inline-block">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary text-[#1b1f24]">
                  <Icon
                    data={{
                      name: header?.icon?.name || "BiBuilding",
                      size: "custom",
                      color: "custom",
                    }}
                    className="size-8 fill-current"
                  />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  {header?.name}
                </span>
              </div>
            </Link>
            {footer?.contact && (
              <div className="space-y-4 text-sm text-gray-400">
                {footer.contact.address && (
                  <p className="whitespace-pre-line">{footer.contact.address}</p>
                )}
                {footer.contact.email && (
                  <p>
                    <a
                      href={`mailto:${footer.contact.email}`}
                      className="hover:text-primary transition-colors"
                    >
                      {footer.contact.email}
                    </a>
                  </p>
                )}
                {footer.contact.phone && (
                  <p>
                    <a
                      href={`tel:${footer.contact.phone.replace(/[^\d+]/g, "")}`}
                      className="hover:text-primary transition-colors"
                    >
                      {footer.contact.phone}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-primary">
              Quick Links
            </h3>
            <ul className="space-y-4 text-sm">
              {header?.nav?.map(
                (item) =>
                  item?.href && (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-primary">
              Connect
            </h3>
            <div className="flex flex-wrap gap-4">
              {footer?.social?.map((link, index) => (
                <Link
                  key={`${link?.icon?.name}-${index}`}
                  href={link?.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-primary hover:text-[#1b1f24]"
                >
                  <Icon
                    data={{ ...link?.icon, size: "xs", color: "custom" }}
                    className="fill-current"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div>
            {footer?.newsletter && (
              <div className="rounded-2xl bg-white/5 p-6">
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {footer.newsletter.title || "Stay Updated"}
                </h3>
                <p className="mb-4 text-sm text-gray-400">
                  {footer.newsletter.description ||
                    "Subscribe to our newsletter for the latest economic development news."}
                </p>
                <form className="space-y-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-white/10 bg-[#1b1f24] px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-bold text-[#1b1f24] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {footer.newsletter.buttonText || "Subscribe"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {header?.name || "OCEDC"}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
