import Link from "next/link";
import { nav, site } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.logo.src} alt="" width={44} height={44} />
              <span>{site.name}</span>
            </div>
            <p>{site.footerMission}</p>
            <p>
              Email:{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>

          <div>
            <h2>Explore</h2>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Get help</h2>
            <ul>
              <li>
                <Link href="/resources">Resource directory</Link>
              </li>
              <li>
                <Link href="/wound-care">Wound-care guide</Link>
              </li>
              <li>
                <a href="tel:911">Emergency: call 911</a>
              </li>
              <li>
                <a href="tel:211">Local resource line: call 211</a>
              </li>
            </ul>
            {site.social.length > 0 && (
              <>
                <h2 style={{ marginTop: "1.5rem" }}>Follow us</h2>
                <ul>
                  {site.social.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} rel="noopener noreferrer">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="footer-note">
          <p>Resource details can change. Please contact providers to confirm hours and availability.</p>
          <p>
            © {year} {site.name} · <Link href="/privacy">Privacy Policy</Link> · <Link href="/terms">Terms of Use</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
