"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";

const getLogoUrl = (logo: any): string | null => {
  if (!logo) return null;
  if (typeof logo === 'string') return null;
  return logo.url || null;
};

function NewsletterForm({
  title,
  description,
  buttonText,
}: {
  title?: string | null;
  description?: string | null;
  buttonText?: string | null;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Subscription failed.");
      }

      setStatus("success");
      setEmail("");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <div className="rounded-2xl bg-white/5 p-6">
      <h3 className="mb-2 text-lg font-semibold text-white">
        {title || "Stay Updated"}
      </h3>
      {status === "success" ? (
        <p className="text-sm text-primary">
          You have been subscribed. Thank you!
        </p>
      ) : (
        <>
          <p className="mb-4 text-sm text-gray-400">
            {description ||
              "Subscribe to our newsletter for the latest economic development news."}
          </p>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#1b1f24] px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-bold text-[#1b1f24] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : buttonText || "Subscribe"}
            </button>
            {status === "error" && (
              <p className="text-xs text-red-400">{errorMsg}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
}

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, footer } = globalSettings!;
  const logoUrl = getLogoUrl(header?.logo) || "/images/ocedc-logo-gold.png";

  return (
    <footer className="bg-[#1b1f24] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="space-y-6">
            <Link href="/" aria-label="go home" className="inline-block">
              <Image
                src={logoUrl}
                alt="OCEDC - Ogle County Economic Development Corporation"
                width={496}
                height={207}
                className="h-14 w-auto"
                unoptimized={logoUrl.startsWith("http")}
              />
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
              {header?.nav?.map((item) => {
                if (!item?.label) return null;
                const kids = Array.isArray(item.children) ? item.children : [];
                return (
                  <React.Fragment key={item.id || item.href || item.label}>
                    {item.href && (
                      <li>
                        <Link
                          href={item.href}
                          className="text-gray-400 transition-colors hover:text-white"
                        >
                          {item.label}
                        </Link>
                      </li>
                    )}
                    {kids.map(
                      (child) =>
                        child?.href &&
                        child?.label && (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="text-gray-400 transition-colors hover:text-white"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ),
                    )}
                  </React.Fragment>
                );
              })}
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
              <NewsletterForm
                title={footer.newsletter.title}
                description={footer.newsletter.description}
                buttonText={footer.newsletter.buttonText}
              />
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
