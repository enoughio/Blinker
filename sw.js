
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "updateSettings") {
    chrome.storage.sync.get(["enabled", "interval"], (data) => {
      chrome.alarms.clear("blinkReminder", () => {
        if (data.enabled) {
          chrome.alarms.create("blinkReminder", {
            periodInMinutes: data.interval || 10,
          });
          console.log("[BlinkBuddy] Alarm reset to", data.interval, "minutes");
        } else {
          console.log("[BlinkBuddy] Reminders disabled");
        }
      });
    });
  }
});

// =================================


chrome.runtime.onInstalled.addListener(() => {
    console.log('[BlinkBuddy] Installed');
});


// chrome.alarms.create('blink', { when : 900, delayInMinuits : 100, periodInMinutes: 900 })

// Create an alarm when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("blinkReminder", {
    periodInMinutes: 0.5   // every 30 seconds for testing
  });
  console.log("[BlinkBuddy] Alarm scheduled every 30s");
});


// Listen for alarm events
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "blinkReminder") {
    console.log("[BlinkBuddy] Alarm fired, sending blink message...");

    // Find the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "blink" });
      }
    });
  }
});

