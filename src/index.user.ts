// ==UserScript==
// @name         Render Markdown Checkboxes
// @author       Haoyuan Kevin Xia
// @description  Convert Markdown-style checkboxes (- [ ] and - [x]) into real checkboxes.
// @grant        none
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABKElEQVQ4jaWTT0rDQBTGv5lJTA0h0lXSpRt3QskFPEQPYApuRA+QI3gA980FvIN7QYruuhaarIIhxPzxOS6maYlKpsUPZjG89/veNwOPSSlxcvsaiq/6DpI87CMmUuJW9H5/HjP35iUUVC7aozEqy8en6Q6yRptjVCcwmwwk7DkbXz8lrel6hXO21/BOTrGC2eYphySvsvyDYACoLB+Q5HEA2tidwgB4vAKmE4AMGwBg7DsxDIDFbHeXTKH8UHj+ACzXu9rWYDpR8cJgGI6f+/XeEy5O1QFUow7uJViuVROgoHimh3sG3dTO5DLQw78MfproYGDzB4JKkLB7JlqwzTcJmEiPP96Gu//QqE4AJlJO3IrMJoNTrLauQxJUqj1oMhC3Ivbfdf4GJhx/4PVmSy4AAAAASUVORK5CYII=
// @icon64       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAACxKAAAsSgF3enRNAAAEWklEQVR4nO2bz2sbRxTHv29nbPTDlepTCM3JUHAKLnbbW3wo5A9Ib4aQgws9tQqlPebkS3NsCRU9FdpDCfiW/AGBHuybW4kIkkDApxSTkytVv7Bm9HpYqZF2V/KOtNqdVfoFYzwzO7zPV6O3T2s9YmaEUbFUu0Gs94j1LrHaCXVRzGKSFSZxxCQO6+Wt4zDX0GUGFEu1fYfVPepfvB9JlPGpqkXuQb289eu0RRMNKNx9til056Gtr3ZYMcmKFtnbjR8/eBE07wQNFku1famaJ2mHBwBitSNV86RYqu0Hz3tOwLulp984uvP9pA17q+tQsgAlcgAAtVKIMFxzyV7D/a3bkKqBlYvziWv7Ivvt3+UPfxgdGzOgWKrtC93+JejibvYaupkrYJKRBL4oEStkuq+R6bwKnNci9/loXvjPgMLdZ5tSNU8Azo9fkEdrbQN68IqnRUK3kW+eQuiWZ4ZaSq59MswJzpsLOg+D4P8pbKYOHgC0yA1iz3tmOO+yunIA9+h7E94Q3vYjP01MMtAEYrUzTIoOAAjd/tp7cWttI9XwQzFJtNY2fOMOq3sAQIWvnt4Qun00OtnNXkMn+15MIcajbOcvX2LUIrfrEOs97+Ju5kpsgcWlICZivecQ693Rwd7q+lIcfa+YJHqr62NjxHrX8SY/JZMtbBYpLxux2vGVwiqFt7ywCmIL/CzwNsl/AhKu7U20fRV4dAfg79yfR3fcsUnScolOwPZV4PcvgFvX34zduu6OTTIhKLmn0oAhfDHjnytmgIOb4fdKnQHT4IcaPRWXKVUGhIE3VWoMMIF//Dz8vqkwwAS+3gUOnoTf23oDTOE//RmonoXf32oDFg0PWGxAHPCApQbEBQ9YaECc8IChAaa1t6nihgcMDJil9jZREvCAgQEHNyfX3vOakBQ8YGDAtPp6HhOShAciTIKzmJA0PGBgQJj62sQEG+ABkxzwxA3kMoUxwRZ4wMCA6pkbyLwm2AQPGOaAeU2wDR6YIQnOaoKN8MCMd4FZTLARHpjjNmhqgo3wwJx1gIkJlykJeCCCQigKE5KCByKqBOcxIUl4IMJSeBYTkoYHIn4gYmKCDfDAAp4IhTHBFnhgQY/EpplgEzywwGeCQxNGP0U+fm4XPAD4/l8se43IviNQPQM++y2SrSLR8HvFo7LuqXDc8hkgdTuJOGJREJvDJCtji5T/mCyLvGxMsuIwibFvia5cnINYxRpYHCJWvl4CJnHkMIlD7+JM93VsgcWlICYmcejUy1vH7Ky+HFvceQWxRLlA6HZQA0W1Xt46dgCgT/K+dzbfPF2KtwKxQr556hvXIvfAnR90jKx/+cefy9YzQKzwTuOFr2uESVbOf/r4I2DkNqhF9jZAYyuFbg02SN/bQeh2IDxALZd18Nf/TVMpb5sTug3qq2ja5oZyT0Kn7G2iSq+opUW2FNRG+9a3zoZqnh40VW0vIsBFiZ3Vl32S92dunvZqWdvn/wXFNo0MKXKlfAAAAABJRU5ErkJggg==
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
