import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Page not found</span>
        <h1>We couldn’t find that page</h1>
        <p className="lead">The link may be old, or the listing may have been removed.</p>
        <div className="btn-row">
          <Link href="/resources" className="btn btn--primary">
            Find Resources
          </Link>
          <Link href="/" className="btn btn--outline">
            Go to the home page
          </Link>
        </div>
      </div>
    </section>
  );
}
