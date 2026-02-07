const SETTINGS_FIELDS = ["api_url"];
const SAMPLE_FIELDS = ["writing_sample_1", "writing_sample_2"];

const DEFAULT_PROFILE = [
  { key: "name", value: "" },
  { key: "email", value: "" },
  { key: "bio", value: "" },
];

let profileFields = [];

// ─── Tab switching ───
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// ─── Render dynamic profile fields ───
function renderProfileFields() {
  const container = document.getElementById("profile-fields");
  container.innerHTML = "";

  profileFields.forEach((field, i) => {
    const row = document.createElement("div");
    row.className = "profile-row";

    const keyInput = document.createElement("input");
    keyInput.type = "text";
    keyInput.placeholder = "Field name";
    keyInput.value = field.key;
    keyInput.className = "profile-key";
    keyInput.addEventListener("input", (e) => { profileFields[i].key = e.target.value; });

    const valInput = document.createElement("input");
    valInput.type = "text";
    valInput.placeholder = "Value";
    valInput.value = field.value;
    valInput.className = "profile-value";
    valInput.addEventListener("input", (e) => { profileFields[i].value = e.target.value; });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "\u00d7";
    removeBtn.className = "remove-btn";
    removeBtn.addEventListener("click", () => {
      profileFields.splice(i, 1);
      renderProfileFields();
    });

    row.appendChild(keyInput);
    row.appendChild(valInput);
    row.appendChild(removeBtn);
    container.appendChild(row);
  });
}

// ─── Add field ───
document.getElementById("add-field-btn").addEventListener("click", () => {
  profileFields.push({ key: "", value: "" });
  renderProfileFields();
});

// ─── Load saved data ───
chrome.storage.local.get(["profileFields", ...SAMPLE_FIELDS, ...SETTINGS_FIELDS], (data) => {
  profileFields = data.profileFields && data.profileFields.length > 0
    ? data.profileFields
    : DEFAULT_PROFILE;
  renderProfileFields();

  for (const key of [...SAMPLE_FIELDS, ...SETTINGS_FIELDS]) {
    const el = document.getElementById(key);
    if (el && data[key]) el.value = data[key];
  }
});

// ─── Save profile ───
document.getElementById("save-btn").addEventListener("click", () => {
  const data = { profileFields };
  for (const key of [...SAMPLE_FIELDS, ...SETTINGS_FIELDS]) {
    const el = document.getElementById(key);
    if (el) data[key] = el.value;
  }
  chrome.storage.local.set(data, () => {
    showStatus("Profile saved!");
  });
});

// ─── Fill this page ───
document.getElementById("fill-btn").addEventListener("click", async () => {
  const data = await chrome.storage.local.get(["profileFields", ...SAMPLE_FIELDS, ...SETTINGS_FIELDS]);
  const apiUrl = data.api_url || "http://localhost:3000";

  // Build profile object from key-value pairs
  const profile = {};
  const fields = data.profileFields || profileFields;
  for (const { key, value } of fields) {
    if (key && value) profile[key] = value;
  }
  if (data.writing_sample_1) profile["writing_sample_1"] = data.writing_sample_1;
  if (data.writing_sample_2) profile["writing_sample_2"] = data.writing_sample_2;

  if (Object.keys(profile).length === 0) {
    showStatus("Fill in your profile first.");
    return;
  }

  showStatus("Filling form...");

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: fillPage,
    args: [profile, apiUrl],
  });
});

// ─── Injected function ───
function fillPage(profile, apiUrl) {
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
