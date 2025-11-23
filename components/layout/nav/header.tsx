"use client";

import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Icon } from "../../icon";
import { Button } from "../../ui/button";
import { useLayout } from "../layout-context";

export const Header = () => {
  const { globalSettings } = useLayout();
  const header = globalSettings!.header!;
  const utility = header.utility;
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
      
      // Determine visibility based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
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
        isScrolled ? "bg-[#1b1f24]/95 backdrop-blur-sm shadow-md" : "bg-[#1b1f24]"
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
                  <span className="text-[#1b1f24]/70 mr-1">{utility.phoneLabel}:</span>
                )}
                {utility.phoneNumber}
              </a>
            )}
            <div className="flex flex-wrap items-center gap-2">
              {utility.actions?.map(
                (action, index) =>
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
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/" aria-label="home" className="flex items-center gap-3">
            <Icon
              parentColor={header.color!}
              data={{
                name: header.icon!.name,
                color: "primary",
                style: header.icon!.style,
              }}
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xs uppercase tracking-[0.35em] text-white/60">
                Ogle County
              </span>
              <span className="font-semibold text-lg tracking-tight text-white">
                {header.name}
              </span>
            </div>
          </Link>

          <div className="hidden flex-1 items-center justify-end gap-8 lg:flex">
            <ul className="flex items-center gap-6 text-sm font-medium uppercase tracking-wide text-white/80">
              {header.nav?.map(
                (item) =>
                  item?.href &&
                  item?.label && (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="relative py-1 transition hover:text-white"
                      >
                        <span>{item.label}</span>
                        <span className="absolute inset-x-0 -bottom-1 h-0.5 origin-left scale-x-0 bg-primary transition-all duration-200 hover:scale-x-100" />
                      </Link>
                    </li>
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
              className={`absolute inset-0 size-6 transition duration-200 ${menuState ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-0 opacity-0"}`}
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
                  item?.href &&
                  item?.label && (
                    <li key={item.href}>
                      <Link href={item.href} onClick={() => setMenuState(false)}>
                        {item.label}
                      </Link>
                    </li>
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
