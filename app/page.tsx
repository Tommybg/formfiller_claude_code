export default function Home() {
  return (
    <main className="container">
      <nav>
        <span className="logo">FORMFILLER</span>
        <a
          href="https://github.com/Tommybg/formfiller_claude_code"
          className="nav-link"
        >
          GitHub
        </a>
      </nav>

      <section className="hero">
        <p className="tagline">THE AI AGENT FOR</p>
        <h1 className="headline">
          <span>FORM</span>
          <span className="accent">FILL</span>
          <span>ING</span>
        </h1>
        <p className="description">
          Stop wasting hours on repetitive applications.
          <br />
          One profile. Infinite forms.
        </p>
        <a href="/extension.zip" className="cta-button">
          DOWNLOAD EXTENSION
        </a>
      </section>

      <section className="works-with">
        <p>WORKS WITH</p>
        <div className="logos">
          Google Forms &bull; Typeform &bull; Luma &bull; Any HTML form
        </div>
      </section>
    </main>
  );
}
