"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const TEMPLATES: Record<
  string,
  { name: string; description: string; fields: { id: string; label: string; type: string; rows?: number }[] }
> = {
  yc: {
    name: "YC Application",
    description: "Y Combinator batch application — the classic founder form.",
    fields: [
      { id: "company_name", label: "Company name", type: "text" },
      { id: "company_short_desc", label: "Describe what your company does in 50 characters or less", type: "text" },
      { id: "company_url", label: "Company URL", type: "text" },
      { id: "what_making", label: "What is your company going to make?", type: "textarea", rows: 4 },
      { id: "who_needs", label: "Who desperately needs this?", type: "textarea", rows: 3 },
      { id: "founder_impressive", label: "Please tell us about something impressive each founder has built or achieved", type: "textarea", rows: 4 },
      { id: "founders_known", label: "How long have the founders known one another and how did you meet?", type: "textarea", rows: 3 },
      { id: "progress", label: "How far along are you? (users, revenue, traction)", type: "textarea", rows: 3 },
      { id: "revenue_model", label: "What's your revenue model?", type: "textarea", rows: 3 },
      { id: "why_this_idea", label: "Why did you pick this idea to work on?", type: "textarea", rows: 3 },
    ],
  },
  luma: {
    name: "Luma Event RSVP",
    description: "Typical Luma event registration — quick personal details.",
    fields: [
      { id: "first_name", label: "First name", type: "text" },
      { id: "last_name", label: "Last name", type: "text" },
      { id: "email", label: "Email address", type: "text" },
      { id: "company", label: "Company / Organization", type: "text" },
      { id: "role", label: "Job title / Role", type: "text" },
      { id: "linkedin", label: "LinkedIn URL", type: "text" },
      { id: "what_excited", label: "What are you most excited to learn?", type: "textarea", rows: 2 },
      { id: "dietary", label: "Dietary restrictions", type: "text" },
    ],
  },
  hackathon: {
    name: "Hackathon Registration",
    description: "Standard hackathon signup — team info, skills, and project idea.",
    fields: [
      { id: "full_name", label: "Full name", type: "text" },
      { id: "email", label: "Email address", type: "text" },
      { id: "github", label: "GitHub profile URL", type: "text" },
      { id: "experience_level", label: "Experience level (beginner / intermediate / advanced)", type: "text" },
      { id: "expertise", label: "Area of expertise or interest", type: "text" },
      { id: "team_name", label: "Team name", type: "text" },
      { id: "project_idea", label: "Project idea / What do you want to build?", type: "textarea", rows: 3 },
      { id: "problem", label: "Problem your hack addresses", type: "textarea", rows: 3 },
      { id: "why_participate", label: "Why do you want to participate?", type: "textarea", rows: 3 },
      { id: "tshirt_size", label: "T-shirt size", type: "text" },
    ],
  },
};

export default function DemoPage() {
  return (
    <Suspense>
      <DemoContent />
    </Suspense>
  );
}

function DemoContent() {
  const searchParams = useSearchParams();
  const [activeTemplate, setActiveTemplate] = useState("yc");
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [filledFields, setFilledFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    const t = searchParams.get("t");
    if (t && TEMPLATES[t]) setActiveTemplate(t);
  }, [searchParams]);
  const [profile, setProfile] = useState<{ key: string; value: string }[]>([
    { key: "name", value: "" },
    { key: "email", value: "" },
    { key: "bio", value: "" },
  ]);
  const [writingSample, setWritingSample] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const template = TEMPLATES[activeTemplate];

  function addProfileField() {
    setProfile([...profile, { key: "", value: "" }]);
  }

  function removeProfileField(index: number) {
    setProfile(profile.filter((_, i) => i !== index));
  }

  function updateProfileField(index: number, field: "key" | "value", val: string) {
    const updated = [...profile];
    updated[index] = { ...updated[index], [field]: val };
    setProfile(updated);
  }

  function switchTemplate(key: string) {
    setActiveTemplate(key);
    setFormValues({});
    setFilledFields(new Set());
    setStatus("");
  }

  async function handleFill() {
    const profileObj: Record<string, string> = {};
    for (const { key, value } of profile) {
      if (key && value) profileObj[key] = value;
    }
    if (writingSample) profileObj["writing_sample"] = writingSample;

    if (Object.keys(profileObj).length === 0) {
      setStatus("Fill in at least one profile field.");
      return;
    }

    const formFields = template.fields.map((f) => ({
      id: f.id,
      type: f.type,
      label: f.label,
    }));

    setLoading(true);
    setFilledFields(new Set());
    setStatus("Filling with AI...");

    try {
      const res = await fetch("/api/fill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: profileObj, formFields }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        setStatus(`Error ${res.status}: ${errBody || res.statusText}`);
        setLoading(false);
        return;
      }

      const answers = await res.json();

      if (!answers || Object.keys(answers).length === 0) {
        setStatus("AI returned no answers. Try adding more profile details.");
        setLoading(false);
        return;
      }

      setFormValues(answers);
      setFilledFields(new Set(Object.keys(answers)));
      setStatus("Filled!");

      setTimeout(() => setFilledFields(new Set()), 1500);
    } catch (err: unknown) {
      setStatus(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="demo-container">
      {/* NAV */}
      <nav className="demo-nav">
        <a href="/" className="logo">FORMFILLER</a>
        <div className="demo-nav-links">
          <a href="/guide" className="nav-link">Guide</a>
          <span className="demo-badge">DEMO</span>
        </div>
      </nav>

      <div className="demo-layout">
        {/* SIDEBAR — PROFILE */}
        <aside className="demo-sidebar">
          <h2>Your Profile</h2>
          <p className="sidebar-hint">
            Add any fields that describe you. The AI uses these to fill forms.
          </p>

          <div className="profile-fields">
            {profile.map((field, i) => (
              <div key={i} className="profile-row">
                <input
                  type="text"
                  placeholder="Field name"
                  value={field.key}
                  onChange={(e) => updateProfileField(i, "key", e.target.value)}
                  className="profile-key"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={field.value}
                  onChange={(e) => updateProfileField(i, "value", e.target.value)}
                  className="profile-value"
                />
                <button
                  onClick={() => removeProfileField(i)}
                  className="remove-btn"
                  title="Remove field"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <button onClick={addProfileField} className="add-field-btn">
            + ADD FIELD
          </button>

          <label className="sidebar-label">
            Writing Sample
            <textarea
              rows={4}
              placeholder="Paste a previous application answer so AI can match your tone..."
              value={writingSample}
              onChange={(e) => setWritingSample(e.target.value)}
            />
          </label>

          {/* Fill button */}
          <button
            onClick={handleFill}
            disabled={loading}
            className="fill-btn sidebar-fill-btn"
          >
            {loading ? "FILLING..." : "FILL WITH AI"}
          </button>
          {status && <p className="demo-status sidebar-status">{status}</p>}
        </aside>

        {/* MAIN — FORM */}
        <section className="demo-main">
          <div className="demo-main-scroll">
            {/* Template selector */}
            <div className="template-tabs">
              {Object.entries(TEMPLATES).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => switchTemplate(key)}
                  className={`template-tab ${activeTemplate === key ? "active" : ""}`}
                >
                  {t.name}
                </button>
              ))}
            </div>

            <p className="template-desc">{template.description}</p>

            {/* Form fields */}
            <div className="demo-form">
              {template.fields.map((field) => (
                <label key={field.id} className="demo-field">
                  <span className="demo-field-label">{field.label}</span>
                  {field.type === "textarea" ? (
                    <textarea
                      rows={field.rows || 3}
                      value={formValues[field.id] || ""}
                      onChange={(e) =>
                        setFormValues({ ...formValues, [field.id]: e.target.value })
                      }
                      placeholder="AI will fill this..."
                      className={filledFields.has(field.id) ? "field-filled" : ""}
                    />
                  ) : (
                    <input
                      type="text"
                      value={formValues[field.id] || ""}
                      onChange={(e) =>
                        setFormValues({ ...formValues, [field.id]: e.target.value })
                      }
                      placeholder="AI will fill this..."
                      className={filledFields.has(field.id) ? "field-filled" : ""}
                    />
                  )}
                </label>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
