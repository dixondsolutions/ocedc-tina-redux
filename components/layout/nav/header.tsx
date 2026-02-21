"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

import { useLayout } from "../layout-context";

const getLogoUrl = (logo: any): string | null => {
  if (!logo) return null;
  if (typeof logo === "string") return null;
  return logo.url || null;
};

const hasChildren = (item: any): boolean =>
  Array.isArray(item?.children) && item.children.length > 0;

/** Desktop nav item — either a plain link or a hover-triggered dropdown */
const DesktopNavItem = ({
  item,
}: {
  item: {
    href?: string | null;
    label?: string | null;
    children?: Array<{ href?: string | null; label?: string | null }> | null;
  };
}) => {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  if (!hasChildren(item)) {
    return (
      <li>
        <Link
          href={item.href || "#"}
          className="relative py-1 transition hover:text-white"
        >
          <span>{item.label}</span>
          <span className="absolute inset-x-0 -bottom-1 h-0.5 origin-left scale-x-0 bg-primary transition-all duration-200 hover:scale-x-100" />
        </Link>
      </li>
    );
  }

  return (
    <li
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {item.href ? (
        <Link
          href={item.href}
          className="relative inline-flex items-center gap-1 py-1 transition hover:text-white"
        >
          <span>{item.label}</span>
          <ChevronDown
            className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </Link>
      ) : (
        <button
          type="button"
          className="relative inline-flex items-center gap-1 py-1 transition hover:text-white"
        >
          <span>{item.label}</span>
          <ChevronDown
            className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      )}

      <div
        className={`absolute left-1/2 top-full z-30 pt-3 -translate-x-1/2 transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="min-w-[200px] overflow-hidden rounded-lg border border-white/10 bg-[#1b1f24] shadow-xl">
          {item.children!.map(
            (child) =>
              child?.href &&
              child?.label && (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-5 py-3 text-sm font-medium normal-case tracking-normal text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </Link>
              ),
          )}
        </div>
      </div>
    </li>
  );
};

/** Mobile nav item — either a plain link or an accordion */
const MobileNavItem = ({
  item,
  onNavigate,
}: {
  item: {
    href?: string | null;
    label?: string | null;
    children?: Array<{ href?: string | null; label?: string | null }> | null;
  };
  onNavigate: () => void;
}) => {
  const [expanded, setExpanded] = React.useState(false);

  if (!hasChildren(item)) {
    return (
      <li>
        <Link href={item.href || "#"} onClick={onNavigate}>
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <div className="flex items-center justify-between">
        {item.href ? (
          <Link href={item.href} onClick={onNavigate} className="flex-1">
            {item.label}
          </Link>
        ) : (
          <span className="flex-1">{item.label}</span>
        )}
        <button
          type="button"
          onClick={() => setExpanded((s) => !s)}
          className="rounded-md p-1 hover:bg-gray-100"
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          <ChevronDown
            className={`size-4 text-foreground/60 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      <div
        className={`grid transition-all duration-300 ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <ul className="overflow-hidden pl-4 pt-2 space-y-2 text-sm font-normal text-foreground/70">
          {item.children!.map(
            (child) =>
              child?.href &&
              child?.label && (
                <li key={child.href}>
                  <Link href={child.href} onClick={onNavigate}>
                    {child.label}
                  </Link>
                </li>
              ),
          )}
        </ul>
      </div>
    </li>
  );
};

export const Header = () => {
  const { globalSettings } = useLayout();
  const header = globalSettings!.header!;
  const utility = header.utility;
  const logoUrl = getLogoUrl(header.logo) || "/images/ocedc-logo-gold.png";
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [menuState, setMenuState] = React.useState(false);

  const mobileToggle = () => setMenuState((state) => !state);

  const phoneHref =
    utility?.phoneHref ||
    (utility?.phoneNumber
      ? `tel:${utility.phoneNumber.replace(/[^\d+]/g, "")}`
      : undefined);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      suppressHydrationWarning
      className={`sticky inset-x-0 top-0 z-20 transition-all duration-300 transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-[#1b1f24]/95 backdrop-blur-sm shadow-md"
          : "bg-[#1b1f24]"
      }`}
    >
      {utility && (
        <div className="bg-primary text-[#1b1f24]">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-2 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center gap-4 text-[#1b1f24]/90 font-medium">
              {utility.links?.map(
                (link) =>
                  link?.label &&
                  link?.href && (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="uppercase tracking-wide text-[0.72rem] font-bold hover:text-[#1b1f24]/70 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ),
              )}
            </div>
            {utility.phoneNumber && (
              <a
                href={phoneHref}
                className="font-bold tracking-wide text-[#1b1f24] hover:text-[#1b1f24]/70 transition-colors"
              >
                {utility.phoneLabel && (
                  <span className="text-[#1b1f24]/70 mr-1">
                    {utility.phoneLabel}:
                  </span>
                )}
                {utility.phoneNumber}
              </a>
            )}
            <div className="flex flex-wrap items-center gap-2">
              {utility.actions?.map(
                (action) =>
                  action?.label &&
                  action?.href && (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="inline-flex rounded-full border border-[#1b1f24]/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#1b1f24] transition hover:bg-[#1b1f24] hover:text-primary"
                    >
                      {action.label}
                    </Link>
                  ),
              )}
            </div>
          </div>
        </div>
      )}

      <nav className="border-b border-white/10 bg-[#1b1f24] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3">
          <Link href="/" aria-label="home" className="flex shrink-0 items-center">
            <Image
              src={logoUrl}
              alt="OCEDC - Ogle County Economic Development Corporation"
              width={240}
              height={72}
              className="h-14 w-auto"
              priority
              unoptimized={logoUrl.startsWith("http")}
            />
          </Link>

          <div className="hidden flex-1 items-center justify-end gap-8 lg:flex">
            <ul className="flex items-center gap-6 text-sm font-medium uppercase tracking-wide text-white/80">
              {header.nav?.map(
                (item) =>
                  item?.label && (
                    <DesktopNavItem key={item.id || item.href || item.label} item={item} />
                  ),
              )}
            </ul>

            <Link
              href="/contact"
              className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Contact
            </Link>
          </div>

          <button
            onClick={mobileToggle}
            aria-label={menuState ? "Close Menu" : "Open Menu"}
            className="relative -m-2 block rounded-lg p-2 text-white lg:hidden"
          >
            <Menu
              className={`size-6 transition duration-200 ${menuState ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
            />
            <X
              className={`absolute inset-0 m-2 size-6 transition duration-200 ${menuState ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-0 opacity-0"}`}
            />
          </button>
        </div>

        <div
          className={`lg:hidden ${menuState ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} grid transition-all duration-300`}
        >
          <div className="overflow-hidden border-t border-border/60 bg-white px-4 py-6 shadow-lg">
            <ul className="space-y-4 text-base font-semibold text-foreground">
              {header.nav?.map(
                (item) =>
                  item?.label && (
                    <MobileNavItem
                      key={item.id || item.href || item.label}
                      item={item}
                      onNavigate={() => setMenuState(false)}
                    />
                  ),
              )}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setMenuState(false)}
                className="rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-[#1b1f24]"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
