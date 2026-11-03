"use client";

import { useEffect } from "react";

/**
 * Netlify Identity sends admin invite / password-reset links to the home page
 * (e.g. /#invite_token=...). This forwards them to the admin editor.
 */
export function IdentityRedirect() {
  useEffect(() => {
    const h = window.location.hash;
    if (/(invite|recovery|confirmation|email_change)_token=/.test(h)) {
      window.location.replace("/admin/" + h);
    }
  }, []);
  return null;
}
