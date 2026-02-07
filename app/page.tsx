export default function Home() {
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
      <section className="hero">
        <p className="tagline">THE AI FORM-FILLING AGENT</p>
        <h1 className="headline">
          <span>FORM</span>
          <span className="accent strikethrough">FILLING</span>
          <span>AGENT</span>
        </h1>
        <p className="description">
          Stop rewriting the same answers across accelerator apps, event RSVPs,
          hackathon signups, and surveys. One profile. Every form. Instantly.
        </p>
        <div className="hero-ctas">
          <a href="/demo" className="cta-button">TRY THE DEMO</a>
          <a href="/extension.zip" className="cta-button secondary">DOWNLOAD EXTENSION</a>
        </div>
      </section>

      {/* BUILT FOR EVERYONE */}
      <section className="built-for">
        <div className="section-label-row">
          <span className="pill">BUILT FOR EVERYONE</span>
        </div>

        <h2 className="section-headline">
          Whether you&apos;re building a startup
          <br />
          <span className="accent">or just filling out forms.</span>
        </h2>

        <div className="persona-grid">
          <div className="persona-card">
            <span className="persona-tag">FOUNDERS &amp; BUILDERS</span>
            <h3>Accelerator apps, hackathon signups, event RSVPs</h3>
            <ul className="persona-list">
              <li>
                <span className="persona-icon">Y</span>
                YC, Techstars, 500 Global, Antler
              </li>
              <li>
                <span className="persona-icon">H</span>
                ETHGlobal, MLH, hackathon.dev
              </li>
              <li>
                <span className="persona-icon">L</span>
                Luma events, meetup RSVPs
              </li>
            </ul>
          </div>
          <div className="persona-card">
            <span className="persona-tag">PERSONAL USE</span>
            <h3>Surveys, feedback forms, intake questionnaires</h3>
            <ul className="persona-list">
              <li>
                <span className="persona-icon">T</span>
                Typeform surveys
              </li>
              <li>
                <span className="persona-icon">G</span>
                Google Forms
              </li>
              <li>
                <span className="persona-icon">F</span>
                Feedback &amp; intake forms
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SEE IT IN ACTION */}
      <section className="in-action">
        <div className="section-label-row">
          <span className="pill">SEE IT IN ACTION</span>
        </div>

        <h2 className="section-headline">
          Real questions.
          <br />
          <span className="accent">Real answers.</span>
        </h2>

        <div className="example-questions">
          <a href="/demo?t=yc" className="example-group">
            <span className="example-source">YC APPLICATION</span>
            <div className="example-q">
              &ldquo;Describe what your company does in 50 characters or less.&rdquo;
            </div>
            <div className="example-q">
              &ldquo;What is your company going to make?&rdquo;
            </div>
            <div className="example-q">
              &ldquo;Please tell us about something impressive each founder has
              built or achieved.&rdquo;
            </div>
            <span className="example-try">Try this template &rarr;</span>
          </a>
          <a href="/demo?t=luma" className="example-group">
            <span className="example-source">LUMA RSVP</span>
            <div className="example-q">
              &ldquo;What are you most excited to learn?&rdquo;
            </div>
            <div className="example-q">
              &ldquo;Company / Organization&rdquo;
            </div>
            <span className="example-try">Try this template &rarr;</span>
          </a>
          <a href="/demo?t=hackathon" className="example-group">
            <span className="example-source">HACKATHON SIGNUP</span>
            <div className="example-q">
              &ldquo;What do you want to build?&rdquo;
            </div>
            <div className="example-q">
              &ldquo;Problem your hack addresses&rdquo;
            </div>
            <div className="example-q">
              &ldquo;Why do you want to participate?&rdquo;
            </div>
            <span className="example-try">Try this template &rarr;</span>
          </a>
        </div>

        <p className="in-action-note">
          FormFiller reads your profile and generates tailored answers for every
          question &mdash; instantly.
        </p>
        <a href="/demo" className="cta-button" style={{ marginTop: '2rem' }}>TRY THE DEMO</a>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="section-label-row">
          <span className="pill">HOW IT WORKS</span>
        </div>

        <h2 className="section-headline">
          Three steps.
          <br />
          <span className="accent">Zero</span> repetition.
        </h2>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-label">STEP</span>
            <span className="step-number">01</span>
            <h3>Set Up Profile</h3>
            <p>
              Add your details &mdash; name, bio, company, traction, writing
              samples. Add any custom field that matters to your applications.
            </p>
          </div>
          <div className="step-card">
            <span className="step-label">STEP</span>
            <span className="step-number">02</span>
            <h3>Pick a Form</h3>
            <p>
              Choose a template (YC, Luma, hackathon) or navigate to any web
              form. The AI detects every field automatically.
            </p>
          </div>
          <div className="step-card">
            <span className="step-label">STEP</span>
            <span className="step-number">03</span>
            <h3>Hit Fill</h3>
            <p>
              One click. AI reads your profile, understands each question, and
              generates tailored answers instantly.
            </p>
          </div>
        </div>
      </section>

      {/* CORE FEATURES — ALTERNATING STRIP */}
      <section className="features">
        <div className="section-label-row">
          <span className="pill">CORE FEATURES</span>
        </div>

        <div className="features-strip">
          <div className="feature-row">
            <div className="feature-row-number">01</div>
            <div className="feature-row-content">
              <span className="feature-row-tag">CLAUDE AI</span>
              <h3>AI-Powered Answers</h3>
              <p>
                Uses Claude to generate context-aware responses that match your
                writing style.
              </p>
            </div>
          </div>

          <div className="feature-row reverse">
            <div className="feature-row-number">02</div>
            <div className="feature-row-content">
              <span className="feature-row-tag">INSTANT</span>
              <h3>One-Click Fill</h3>
              <p>
                Detects form fields automatically and fills them in seconds. No
                manual input.
              </p>
            </div>
          </div>

          <div className="feature-row">
            <div className="feature-row-number">03</div>
            <div className="feature-row-content">
              <span className="feature-row-tag">SECURE</span>
              <h3>Local Storage</h3>
              <p>
                Your profile data stays in your browser. Only sent to AI when
                you trigger a fill.
              </p>
            </div>
          </div>

          <div className="feature-row reverse">
            <div className="feature-row-number">04</div>
            <div className="feature-row-content">
              <span className="feature-row-tag">EVERYWHERE</span>
              <h3>Universal Compat</h3>
              <p>
                Google Forms, Typeform, Luma, job apps, surveys &mdash; any web
                form.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PILLS ROW */}
      <div className="pills-row">
        <span className="pill">ACCELERATORS</span>
        <span className="pill">HACKATHONS</span>
        <span className="pill">LUMA EVENTS</span>
        <span className="pill">TYPEFORM</span>
        <span className="pill">GOOGLE FORMS</span>
        <span className="pill">AI POWERED</span>
        <span className="pill">OPEN SOURCE</span>
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
