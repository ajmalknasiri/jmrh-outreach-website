"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/config/site";
import { Icon } from "./Icon";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu after navigating
  useEffect(() => setOpen(false), [pathname]);

  // Close with Escape and return focus to the toggle
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.logo.src}
            alt="" /* name is in the text next to it */
            width={site.logo.width}
            height={site.logo.height}
          />
          <span className="brand__text">
            {site.name}
            <small>Community Outreach</small>
          </span>
        </Link>

        <nav className="main-nav" id="main-nav" aria-label="Main" data-open={open}>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/resources" className="btn btn--primary header-help">
          <Icon name="search" size={20} />
<span>Find Help</span>
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={22} />
          <span className="menu-toggle__label">{open ? "Close menu" : "Menu"}</span>
        </button>
      </div>
    </header>
  );
}
