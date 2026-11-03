"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ContactForm } from "./ContactForm";
import { Icon } from "./Icon";
import { site } from "@/config/site";

/**
 * Floating "Send us a message" button.
 * Phase 1: opens the real contact form (delivered by /api/contact).
 * It is intentionally NOT labeled "live chat" — replies are not instant.
 * To route messages to a shared team inbox or texting number, set
 * MESSAGE_WEBHOOK_URL (see README).
 */
export function FloatingMessage() {
  const ref = useRef<HTMLDialogElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // The Contact page already shows the full form
  if (pathname === "/contact") return null;

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="btn btn--dark fab"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label="Send us a message"
      >
        <Icon name="message" size={22} />
        <span className="fab__label">Send us a message</span>
      </button>

      <dialog
        ref={ref}
        className="msg-dialog"
        aria-labelledby="msg-title"
        onClose={() => {
          setOpen(false);
          btnRef.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === ref.current) setOpen(false); // click on backdrop
        }}
      >
        <div className="msg-dialog__head">
          <h2 id="msg-title">Send us a message</h2>
          <button type="button" className="msg-dialog__close" onClick={() => setOpen(false)} aria-label="Close message form">
            <Icon name="close" size={20} />
          </button>
        </div>
        <div className="msg-dialog__body">
          <p className="muted" style={{ marginTop: 0, fontSize: "0.95rem" }}>
            Messages go to our team by email. Replies are not instant. If you need help right now, see{" "}
            <Link href="/resources" onClick={() => setOpen(false)}>Find Resources</Link> or call <a href="tel:211">211</a>. In an emergency, call{" "}
            <a href="tel:911">911</a>.
          </p>
          {open && <ContactForm source="floating-button" compact />}
          <p className="muted" style={{ fontSize: "0.9rem", marginBottom: 0, marginTop: "1rem" }}>
            Prefer email? <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </dialog>
    </>
  );
}
