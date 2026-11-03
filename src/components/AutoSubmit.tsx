"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Progressive enhancement for the directory filter form.
 * Without JavaScript the form still works as a normal GET form ("Search" button).
 * With JavaScript, filters apply instantly without a full page reload,
 * keyboard focus stays where the visitor left it, and the fields stay in sync
 * with the URL (Reset links, Back/Forward buttons).
 */
export function AutoSubmit({ formId, action }: { formId: string; action: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Keep the fields matching the current URL
  useEffect(() => {
    const form = document.getElementById(formId) as HTMLFormElement | null;
    if (!form) return;
    for (const name of ["q", "region", "category"]) {
      const el = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;
      if (el) el.value = searchParams.get(name) ?? "";
    }
  }, [formId, searchParams]);

  useEffect(() => {
    const form = document.getElementById(formId) as HTMLFormElement | null;
    if (!form) return;

    const go = () => {
      const params = new URLSearchParams();
      new FormData(form).forEach((v, k) => {
        const s = String(v).trim();
        if (s) params.set(k, s);
      });
      const qs = params.toString();
      router.replace(qs ? `${action}?${qs}` : action, { scroll: false });
    };
    const onSubmit = (e: Event) => {
      e.preventDefault();
      go();
    };
    const onChange = (e: Event) => {
      if ((e.target as HTMLElement).tagName === "SELECT") go();
    };
    form.addEventListener("submit", onSubmit);
    form.addEventListener("change", onChange);
    return () => {
      form.removeEventListener("submit", onSubmit);
      form.removeEventListener("change", onChange);
    };
  }, [formId, action, router]);
  return null;
}
