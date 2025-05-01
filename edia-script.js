(function() {
    'use strict';

    // --- Key Validation ---
    const key = new URLSearchParams(window.location.search).get('k');
    const VALID_KEY = '123456'; // Change this to your secret key

    if (key !== VALID_KEY) {
        alert('Unauthorized. This script requires a valid key.');
        throw new Error('Access denied due to invalid key.');
    }

    // --- Script Functionality Below ---

    let removerEnabled = false;

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
        if (removerEnabled) removeEffect();
    });

    const observer = new MutationObserver(removeEffect);
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(removeEffect, 2000);
})();
