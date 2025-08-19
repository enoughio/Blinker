document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle");
  const intervalInput = document.getElementById("interval");
  const status = document.getElementById("status");

  // Load saved settings
  chrome.storage.sync.get(["enabled", "interval"], (data) => {
    toggle.checked = data.enabled ?? true;
    intervalInput.value = data.interval ?? 10;
  });

  // Save settings when button clicked
  document.getElementById("save").addEventListener("click", () => {
    const enabled = toggle.checked;
    const interval = parseInt(intervalInput.value, 10);

    chrome.storage.sync.set({ enabled, interval }, () => {
      status.textContent = "Saved!";
      setTimeout(() => (status.textContent = ""), 1000);

      // Tell SW to update alarms
      chrome.runtime.sendMessage({ type: "updateSettings" });
    });
  });
});
