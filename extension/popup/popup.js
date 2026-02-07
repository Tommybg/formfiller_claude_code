const PROFILE_FIELDS = [
  "name", "email", "bio", "linkedin", "twitter",
  "company_name", "one_liner", "description", "traction", "team_size",
  "writing_sample_1", "writing_sample_2",
];
const SETTINGS_FIELDS = ["api_url", "api_key"];

// Tab switching
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// Load saved data
chrome.storage.local.get([...PROFILE_FIELDS, ...SETTINGS_FIELDS], (data) => {
  for (const key of [...PROFILE_FIELDS, ...SETTINGS_FIELDS]) {
    const el = document.getElementById(key);
    if (el && data[key]) el.value = data[key];
  }
});

// Save profile
document.getElementById("save-btn").addEventListener("click", () => {
  const data = {};
  for (const key of [...PROFILE_FIELDS, ...SETTINGS_FIELDS]) {
    const el = document.getElementById(key);
    if (el) data[key] = el.value;
  }
  chrome.storage.local.set(data, () => {
    showStatus("Profile saved!");
  });
});

// Fill this page
document.getElementById("fill-btn").addEventListener("click", async () => {
  const data = await chrome.storage.local.get([...PROFILE_FIELDS, ...SETTINGS_FIELDS]);
  const apiUrl = data.api_url;
  const apiKey = data.api_key;

  if (!apiUrl || !apiKey) {
    showStatus("Set API URL and Key in Settings first.");
    return;
  }

  const profile = {};
  for (const key of PROFILE_FIELDS) {
    if (data[key]) profile[key] = data[key];
  }

  if (Object.keys(profile).length === 0) {
    showStatus("Fill in your profile first.");
    return;
  }

  showStatus("Filling form...");

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: fillPage,
    args: [profile, apiUrl, apiKey],
  });
});

// This function is injected into the page
function fillPage(profile, apiUrl, apiKey) {
  function detectFormFields() {
    const fields = [];
    const inputs = document.querySelectorAll("input, textarea, select");

    inputs.forEach((input, index) => {
      if (input.type === "hidden" || input.type === "submit" || input.type === "button") return;

      const label = findLabel(input);
      fields.push({
        id: input.id || input.name || `field_${index}`,
        type: input.type || input.tagName.toLowerCase(),
        label: label,
        placeholder: input.placeholder || "",
      });
    });

    return fields;
  }

  function findLabel(input) {
    if (input.id) {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (label) return label.textContent.trim();
    }
    const parent = input.closest("label");
    if (parent) return parent.textContent.trim();
    if (input.getAttribute("aria-label")) return input.getAttribute("aria-label");
    return input.name || input.placeholder || "";
  }

  async function run() {
    const formFields = detectFormFields();

    if (formFields.length === 0) {
      alert("FormFiller AI: No form fields found on this page.");
      return;
    }

    try {
      const response = await fetch(apiUrl + "/api/fill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ profile, formFields }),
      });

      if (!response.ok) {
        alert(`FormFiller AI: API error (${response.status})`);
        return;
      }

      const answers = await response.json();

      for (const [fieldId, answer] of Object.entries(answers)) {
        const field =
          document.getElementById(fieldId) ||
          document.querySelector(`[name="${fieldId}"]`);
        if (field) {
          field.value = answer;
          field.dispatchEvent(new Event("input", { bubbles: true }));
          field.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    } catch (err) {
      alert("FormFiller AI: " + err.message);
    }
  }

  run();
}

function showStatus(msg) {
  const el = document.getElementById("status");
  el.textContent = msg;
  setTimeout(() => { el.textContent = ""; }, 3000);
}
