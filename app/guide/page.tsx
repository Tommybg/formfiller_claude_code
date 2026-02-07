export default function GuidePage() {
  return (
    <main className="container">
      {/* NAV */}
      <nav>
        <span className="logo">FORMFILLER</span>
        <div className="nav-links">
          <a href="/demo" className="nav-link">Try Demo</a>
          <a href="/guide" className="nav-link">Guide</a>
          <a href="https://github.com/Tommybg/formfiller_claude_code" className="nav-link">GitHub</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="guide-hero">
        <div className="section-label-row">
          <span className="pill">USAGE GUIDE</span>
        </div>
        <h2 className="section-headline">
          Get started in
          <br />
          <span className="accent">2 minutes.</span>
        </h2>
      </section>

      {/* TWO PATHS */}
      <div className="guide-paths">
        {/* WEB DEMO */}
        <div className="guide-path">
          <span className="guide-path-tag">WEB DEMO</span>
          <h3>Try it in the browser</h3>
          <ol className="guide-steps">
            <li className="guide-step">
              <span className="guide-step-number">01</span>
              <span className="guide-step-text">
                Go to the <a href="/demo">Demo page</a>
              </span>
            </li>
            <li className="guide-step">
              <span className="guide-step-number">02</span>
              <span className="guide-step-text">
                Fill in your profile fields &mdash; name, email, bio, company, or
                any custom field relevant to your applications
              </span>
            </li>
            <li className="guide-step">
              <span className="guide-step-number">03</span>
              <span className="guide-step-text">
                Pick a template: YC Application, Luma RSVP, or Hackathon
                Registration
              </span>
            </li>
            <li className="guide-step">
              <span className="guide-step-number">04</span>
              <span className="guide-step-text">
                Hit &ldquo;Fill with AI&rdquo; &mdash; Claude reads your profile
                and fills every field
              </span>
            </li>
            <li className="guide-step">
              <span className="guide-step-number">05</span>
              <span className="guide-step-text">
                Review, edit if needed, and copy your answers
              </span>
            </li>
          </ol>
          <a href="/demo" className="guide-cta">GO TO DEMO</a>
        </div>

        {/* CHROME EXTENSION */}
        <div className="guide-path">
          <span className="guide-path-tag">CHROME EXTENSION</span>
          <h3>Fill forms on any site</h3>
          <ol className="guide-steps">
            <li className="guide-step">
              <span className="guide-step-number">01</span>
              <span className="guide-step-text">
                Download the extension and load it in Chrome
                (chrome://extensions &rarr; Developer mode &rarr; Load unpacked)
              </span>
            </li>
            <li className="guide-step">
              <span className="guide-step-number">02</span>
              <span className="guide-step-text">
                Click the FormFiller icon and fill your profile in the popup
              </span>
            </li>
            <li className="guide-step">
              <span className="guide-step-number">03</span>
              <span className="guide-step-text">
                Navigate to any web form &mdash; YC, Luma, Google Forms,
                Typeform, or any HTML form
              </span>
            </li>
            <li className="guide-step">
              <span className="guide-step-number">04</span>
              <span className="guide-step-text">
                Click &ldquo;Fill This Page&rdquo; &mdash; the extension detects
                fields and fills them instantly
              </span>
            </li>
            <li className="guide-step">
              <span className="guide-step-number">05</span>
              <span className="guide-step-text">
                Review the auto-filled answers and submit the form
              </span>
            </li>
          </ol>
          <a href="/extension.zip" className="guide-cta">DOWNLOAD EXTENSION</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <span className="logo">FORMFILLER</span>
          <span className="footer-text">Open Source</span>
        </div>
      </footer>
    </main>
  );
}
