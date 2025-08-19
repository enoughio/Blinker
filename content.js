

function showBlinkOverlay() {

    // avoid duplicate overlays
    if (document.getElementById("bb-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "bb-overlay";
    overlay.innerHTML = `
    <div class='bb-eye'></div>`;

    document.body.appendChild(overlay);
    
    setTimeout(() => overlay.remove(), 2000); // remove after 0.5 seconds

    // allow manually closing the overlay

    const escHeandler = (e)=> {
        if (e.key === "Escape") {
            overlay.remove()
            document.removeEventListener("keydown", escHeandler);
        }
    }
    document.addEventListener('keydown', escHeandler);
}




chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === "blink") {
        console.log("[BlinkBuddy] Blink message received, rendering overlay...");

        showBlinkOverlay();
    }
})