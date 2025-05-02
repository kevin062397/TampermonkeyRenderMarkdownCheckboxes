// ==UserScript==
// @name         Render Markdown Checkboxes
// @author       Haoyuan Kevin Xia
// @description  Convert Markdown-style checkboxes (- [ ] and - [x]) into real checkboxes.
// @grant        none
// @match        https://bitbucket.org/*/pull-requests/*
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// ==/UserScript==

(() => {
    const replaceMarkdownCheckboxes = () => {
        document.querySelectorAll("#pull-request-description-panel .ak-renderer-wrapper ul li").forEach((listItem) => {
            const paragraphItem = listItem.querySelector("p");
            if (!paragraphItem) {
                return;
            }

            const text = paragraphItem.textContent?.trim();
            if (!text) {
                return;
            }

            const uncheckedRegex = /^\[ \]\s(.*)/i; // Matches "- [ ] Task"
            const checkedRegex = /^\[x\]\s(.*)/i; // Matches "- [x] Task"

            let match = text.match(uncheckedRegex);
            if (match) {
                const label = match[1];
                paragraphItem.innerHTML = `<input type="checkbox" disabled /> ${label}`;
                return;
            }

            match = text.match(checkedRegex);
            if (match) {
                const label = match[1];
                paragraphItem.innerHTML = `<input type="checkbox" checked disabled /> ${label}`;
            }
        });
    };

    // Run on page load
    replaceMarkdownCheckboxes();

    // Observe future changes (for dynamically loaded content)
    const observer = new MutationObserver(() => {
        replaceMarkdownCheckboxes();
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
