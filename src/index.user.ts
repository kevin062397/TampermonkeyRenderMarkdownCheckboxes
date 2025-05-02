// ==UserScript==
// @name         Render Markdown Checkboxes
// @author       Haoyuan Kevin Xia
// @description  Convert Markdown-style checkboxes (- [ ] and - [x]) into real checkboxes.
// @grant        none
// @match        https://bitbucket.org/*/pull-requests/*
// @namespace    http://tampermonkey.net/
// @version      1.1.0
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
                paragraphItem.innerHTML = `<input class="styled-checkbox" type="checkbox" disabled /> ${label}`;
                return;
            }

            match = text.match(checkedRegex);
            if (match) {
                const label = match[1];
                paragraphItem.innerHTML = `<input class="styled-checkbox" type="checkbox" checked disabled /> ${label}`;
            }
        });
    };

    // Add custom styles to make checkboxes more prominent
    const style = document.createElement("style");
    style.textContent = `
        input.styled-checkbox {
            --tint-color: rgba(0, 122, 255, 1);
            --separator-color: rgba(60, 60, 67, 0.29);
            /* Color scheme independent properties */
            --clear-color: transparent;
            --white-color: rgba(255, 255, 255, 1);
        }

        @media (prefers-color-scheme: dark) {
            input.styled-checkbox {
                --tint-color: rgba(10, 132, 255, 1);
                --separator-color: rgba(84, 84, 88, 0.6);
            }
        }

        input.styled-checkbox {
            appearance: none;
            background-color: var(--clear-color);
            border-radius: 25%;
            border: 1px solid var(--separator-color);
            cursor: default;
            display: inline-block;
            font-size: 1em;
            height: 1em;
            margin: 0;
            vertical-align: middle;
            width: 1em;
        }

        input.styled-checkbox:checked {
            background-color: var(--tint-color);
        }

        input.styled-checkbox::before {
            color: var(--white-color);
            content: "\\2713"; /* Unicode check mark */
            display: block;
            font-size: 0.8em;
            line-height: calc(1.25em - 2px);
            text-align: center;
            visibility: hidden;
        }

        input.styled-checkbox:checked::before {
            visibility: visible;
        }
    `;
    document.head.appendChild(style);

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
