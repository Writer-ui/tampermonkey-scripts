// ==UserScript==
// @name         Edia Anti-Cheat Effect Remover with Toggle
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Remove anti-cheating effect on Edia with GUI toggle
// @match        https://edia.app/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    let removerEnabled = false;

    // Function to remove the anti-cheating effect
    function removeEffect() {
        if (!removerEnabled) return;
        const targets = document.querySelectorAll('[class*="question"]');
        targets.forEach(el => {
            if (el.className.includes("antiCheatingEffect")) {
                const newEl = document.createElement('div');
                newEl.className = 'question';
                while (el.firstChild) {
                    newEl.appendChild(el.firstChild);
                }
                el.parentNode.replaceChild(newEl, el);
            }
        });
    }

    // Create and style the GUI
    const toggleBtn = document.createElement('div');
    toggleBtn.innerHTML = 'Anti-Cheat: OFF';
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.top = '10px';
    toggleBtn.style.right = '10px';
    toggleBtn.style.padding = '10px 15px';
    toggleBtn.style.zIndex = '10000';
    toggleBtn.style.background = '#222';
    toggleBtn.style.color = '#fff';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.borderRadius = '6px';
    toggleBtn.style.boxShadow = '0 0 5px rgba(0,0,0,0.5)';
    toggleBtn.style.fontSize = '14px';
    toggleBtn.style.userSelect = 'none';
    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', () => {
        removerEnabled = !removerEnabled;
        toggleBtn.innerHTML = `Anti-Cheat: ${removerEnabled ? 'ON' : 'OFF'}`;
        if (removerEnabled) removeEffect(); // Run once when turned on
    });

    // Observe for changes in case element appears later
    const observer = new MutationObserver(removeEffect);
    observer.observe(document.body, { childList: true, subtree: true });

    // Optional: run once after a short delay (in case already loaded)
    setTimeout(removeEffect, 2000);
})();
