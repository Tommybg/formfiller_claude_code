# FormFiller AI - Build Instructions for Claude Code
> **GOAL**: Build a Chrome Extension + Next.js landing page that auto-fills forms using AI.
---
## Project Overview
**FormFiller AI** is a Chrome extension that:
1. Stores user profile data (personal info, company details, writing samples)
2. Detects form fields on any webpage
3. Auto-fills forms with AI-generated answers based on the profile
4. Calls a Vercel-hosted API endpoint that uses the AI SDK
---
## Tech Stack
- **Frontend/Landing**: Next.js 14 (App Router)
- **AI Backend**: Vercel AI SDK with OpenAI
- **Extension**: Chrome Manifest V3
- **Styling**: CSS (modern, bold typography design)
- **Deployment**: Vercel
---
## File Structure to Create
```
/
├── app/
│   ├── layout.tsx              # Root layout with fonts
│   ├── page.tsx                # Landing page (bold typography)
│   ├── globals.css             # Global styles
│   └── api/
│       └── fill/
│           └── route.ts        # AI SDK form fill endpoint
├── extension/
│   ├── manifest.json           # Chrome Manifest V3
│   ├── popup/
│   │   ├── popup.html          # Profile setup UI
│   │   ├── popup.js            # Profile management
│   │   └── popup.css           # Popup styling
│   ├── content.js              # Form detection + auto-fill
│   └── background.js           # API calls to Vercel
├── public/
│   └── icons/                  # Extension icons
├── package.json
├── next.config.js
└── .env.local                  # OPENAI_API_KEY
```
---
## Step 1: Initialize Next.js Project
```bash
npx create-next-app@latest . --typescript --tailwind=no --eslint --app --src-dir=no
npm install ai @ai-sdk/openai
```
---
## Step 2: Create Landing Page (`app/page.tsx`)
Design requirements:
- **Bold typography** with large, impactful headlines
- Black text on white background, with RED accent color
- Split headline across multiple lines (like "FORM / FILL / ING")
- Minimal layout, lots of whitespace
- Single CTA button: "Download Extension"
- "Works with" section showing: Google Forms, Typeform, Luma, etc.
```tsx
export default function Home() {
  return (
    <main className="container">
      <nav>
        <span className="logo">FORMFILLER</span>
        <a href="#" className="nav-link">GitHub</a>
      </nav>
      
      <section className="hero">
        <p className="tagline">THE AI AGENT FOR</p>
        <h1 className="headline">
          <span>FORM</span>
          <span className="accent">FILL</span>
          <span>ING</span>
        </h1>
        <p className="description">
          Stop wasting hours on repetitive applications.<br/>
          One profile. Infinite forms.
        </p>
        <a href="/extension.zip" className="cta-button">
          DOWNLOAD EXTENSION
        </a>
      </section>
      
      <section className="works-with">
        <p>WORKS WITH</p>
        <div className="logos">
          Google Forms • Typeform • Luma • Any HTML form
        </div>
      </section>
    </main>
  );
}
```
---
## Step 3: Global Styles (`app/globals.css`)
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root {
  --accent: #E53935;
  --black: #111;
  --white: #FAFAFA;
}
body {
  font-family: 'Inter', -apple-system, sans-serif;
  background: var(--white);
  color: var(--black);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--black);
}
.logo {
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
}
.hero {
  padding: 8rem 0;
}
.tagline {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  margin-bottom: 2rem;
}
.headline {
  font-size: clamp(4rem, 15vw, 12rem);
  font-weight: 900;
  line-height: 0.9;
  display: flex;
  flex-direction: column;
}
.headline .accent {
  color: var(--accent);
  text-decoration: line-through;
}
.description {
  margin-top: 3rem;
  font-size: 1rem;
  max-width: 400px;
  line-height: 1.6;
}
.cta-button {
  display: inline-block;
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: var(--black);
  color: var(--white);
  text-decoration: none;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  transition: all 0.2s;
}
.cta-button:hover {
  background: var(--accent);
}
.works-with {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #ddd;
}
.works-with p {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
}
.logos {
  font-size: 0.875rem;
  color: #666;
}
```
---
## Step 4: API Route (`app/api/fill/route.ts`)
```typescript
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
export const maxDuration = 30;
export async function POST(req: Request) {
  const { profile, formFields } = await req.json();
  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: `You are filling out a form for ${profile.name}. 
Use their profile information to answer each question authentically.
Match their writing style if samples are provided.
Return ONLY a JSON object where keys are field IDs and values are the answers.`,
    prompt: `
USER PROFILE:
${JSON.stringify(profile, null, 2)}
FORM FIELDS TO FILL:
${JSON.stringify(formFields, null, 2)}
Return JSON: { "fieldId1": "answer1", "fieldId2": "answer2", ... }
`
  });
  return result.toTextStreamResponse();
}
```
---
## Step 5: Chrome Extension
### `extension/manifest.json`
```json
{
  "manifest_version": 3,
  "name": "FormFiller AI",
  "version": "1.0.0",
  "description": "Auto-fill forms with AI using your profile",
  "permissions": ["activeTab", "storage", "scripting"],
  "host_permissions": ["<all_urls>"],
  "action": {
    "default_popup": "popup/popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "js": ["content.js"]
  }],
  "background": {
    "service_worker": "background.js"
  }
}
```
### `extension/popup/popup.html`
Create a tabbed form with sections for:
- **Personal**: name, email, bio, linkedin, twitter
- **Startup**: company_name, one_liner, description, traction, team_size
- **Samples**: writing_sample_1, writing_sample_2 (previous application answers)
- **Settings**: api_url (defaults to your Vercel URL)
Include a "Fill This Page" button that triggers the fill action.
### `extension/popup/popup.js`
- On load: Retrieve profile from `chrome.storage.local`
- On save: Store profile to `chrome.storage.local`
- On "Fill" button: Send message to content script to start filling
### `extension/content.js`
```javascript
// Listen for fill command
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fill') {
    fillForm(request.profile, request.apiUrl);
  }
});
async function fillForm(profile, apiUrl) {
  // 1. Find all form fields
  const fields = detectFormFields();
  
  // 2. Call API
  const response = await fetch(apiUrl + '/api/fill', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile, formFields: fields })
  });
  
  // 3. Parse response and fill fields
  const text = await response.text();
  const answers = JSON.parse(text);
  
  for (const [fieldId, answer] of Object.entries(answers)) {
    const field = document.getElementById(fieldId) || 
                  document.querySelector(`[name="${fieldId}"]`);
    if (field) {
      field.value = answer;
      field.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}
function detectFormFields() {
  const fields = [];
  const inputs = document.querySelectorAll('input, textarea, select');
  
  inputs.forEach((input, index) => {
    const label = findLabel(input);
    fields.push({
      id: input.id || input.name || `field_${index}`,
      type: input.type || input.tagName.toLowerCase(),
      label: label,
      placeholder: input.placeholder || ''
    });
  });
  
  return fields;
}
function findLabel(input) {
  // Try associated label
  if (input.id) {
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (label) return label.textContent.trim();
  }
  // Try parent label
  const parent = input.closest('label');
  if (parent) return parent.textContent.trim();
  // Try aria-label
  if (input.getAttribute('aria-label')) return input.getAttribute('aria-label');
  // Fallback to name
  return input.name || input.placeholder || '';
}
```
---
## Step 6: Deploy
```bash
# Deploy to Vercel
vercel
# Package extension
cd extension
zip -r ../public/extension.zip .
```
---
## Environment Variables
Create `.env.local`:
```
OPENAI_API_KEY=your_key_here
```
---
## Test Checklist
1. [ ] Landing page loads with bold typography design
2. [ ] Extension installs in Chrome (developer mode)
3. [ ] Profile saves and persists in extension
4. [ ] "Fill This Page" button triggers form detection
5. [ ] API receives request and returns JSON answers
6. [ ] Form fields get populated with AI answers
---
## Quick Commands
```bash
# Dev server
npm run dev
# Build
npm run build
# Deploy
vercel --prod
```
