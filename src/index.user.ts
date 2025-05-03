// ==UserScript==
// @name         Render Markdown Checkboxes
// @author       Haoyuan Kevin Xia
// @description  Convert Markdown-style checkboxes (- [ ] and - [x]) into real checkboxes.
// @grant        none
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABWklEQVQ4jaWTsUsCYRjGf3fndYeInZM6WUvQEIhjS39AQ0GNDSe0RA0FDf4JbTW069CoUEO7U0uL1BC4SJM6aSJyal/X8NLRldpBD3zw8r33PO/3+/hO832f5ZNn1/gYX+CrNFGkGV2lW6W3642Kljx+cg01Kk+XUnhWhnczudAbmw6wxx3MSQ9lxIta6uixMzWT6WFiLdLwLyWGTczpoKvjq7RnZSKZ3ALUDyGfBc/KgK/SMeDPY4OYyntSOzaoWFyQokx2bLg9kPruBeotQBOrHiWgsg85B1774FbDvSAgnxU+txD+4HQTdtal3r2BvhfuBwiODVurshptWfksXG5L/+xe9n4qOEG9JXwgvCupMPfVw2y80B24VeHMOdA6n889N6DvCed3zeL+FWCoUbDRaEOxJpOLtdncIE8a4P9PWelWyZz0SAybQeoiGWok5kkPpVsl7b+/8yezv46av+jU0QAAAABJRU5ErkJggg==
// @icon64       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAACxKAAAsSgF3enRNAAAE6ElEQVR4nO2bPWgcRxiG329nJe5HuZMqI2IwCAJSQEFyUsUqDC5dKEVAYFRcIFVyInFKV2riMpbJkSoQF8EgUCEVKQMpJFVKdFhgGQyCgINwJZ1yf0gzmhR7F8/tzWln7/b2x8kDQmhmdjXft/O+N3N3H0kpYUK+eHCLpFgiKRZI8nmji0JGkr0viW1LYuuV0uyOyTXklYB88aBgSf6ALs/fC2SW4VEWLPO4Upp9ctWgngnIrTyfZqLxNK5P2xRJ9r5g6Xtn37//Qtdv6RrzxYOCzat7SQ8eAEjyeZtX9/LFg4K+37UCxovP7lui8V2vG16MToDbOXCWAQDwkVyA0/WPfXHm/BZ12PwMI+cnPcdesvQ3p6UPHqltHQnIFw8KTNR/0l3cTF9HM3UNkuxAJj4sSHKkmq+RarzS9guW+Uz1hX8TkFt5Pm3z6h4gs50XZFEbm4JoPfGkwEQd2eoRmKi5eqjG7bGP2p5gvbmg8VQX/N+56cQFDwCCZVpzz7p6ZNaJ1cECnKXvNrx28HFf8lchydYmgSSfb5uiBQBM1L9yX1wbm0p08G0k2aiNTXW1W5I/AADKffnsFhP1bbWzmb6ORvrdkKYYDunGX13GKFhmwSIpltyDm6lroU0sLHQxkRRLFkmxoDZejE4kZunPTQKby4D81vnZXHbadEiycTE60dFGUixYbvPjdrQbG1PmJoHfPgcWZ960Lc44bb2S4I6NJJ/v2grzBLzkjaecp51PdfflU8DqHf11uti0Z4G48+RT4MZ47351VXjRvQIi3tt78fXH/gJUEXbCV8DcJPDorve4rUN9u87cE5OAtu5NWP3V/L6JSYCX7tvc/wUoH5vfNxEJMNX91iGwtuvv3rFPgKnu/zwFChv+7x/rBPjR/Sc/A6dN//8j1gkYlu5VYpuAYepeJZYJGLbuVWKXgDB0rxK7BIShexVfCfBz/u6HsHSvYpyAfs7ffghT9yrGCVi90/v8vbnsaLdfwta9inECrlqaN8Yd7fZL2LpXCcwEF2ccDfslCt2rGCeg1xlb5dFdf34Qle5VzD3A8Ixt6gdR6l7FOAHlY0eDXpj6QZS6V/HlAWu7ZlLw8oOoda/i2wQLG44mvejlB3HQvYrvBJw2HU2a4PaDuOhepa+XwX79IC66V+n7Q8C1XeD2lLeWVT+Ii+5VBvoUtLABlFe8n6qJ5oHwdK8y0E7Qjx+YEJbuVQbeCpv6gRdh6l4lkLOA6f6gF2HrXiWww5Dp/sBNFLpXCSwB/fpBFLpXCfQ9Qb9+EJXuVboS0P7ubb+Y+kEUutfFNpR3hb38IGrdq3SvAFEf+KZtP6hotF1pRqd7XWyWJHu/YxAfTAJtysfA7R875bB16LRFpXt3bJLsfVsS21a/KjdyfgKSPJDvCpaPg90pDgJJ3lVLIIltW5LYuntwqvk6tImFhS4mSWzdqpRmd6Q1+rJjcOMVWABeEBeYqOsKKMqV0uyOBQCXZD9092arRyDJw5jfUCHJka0edbULlnns9LcqRia++P2Pt61mgCTHO2cvuqpGJNn7Jz98eBNQXgYFS98DqGMkE7XWDZInBybq2uABqjmxtv76v2gq4WVzTNRBlzyYsrk2zkpolNxFVMmFaoKli7oy2v986axR8XSrqGpuGBMcFtIafXlJ9sO+i6fdvK3l8/8AwCB0m1+h8GwAAAAASUVORK5CYII=
// @match        https://bitbucket.org/*/pull-requests/*
// @namespace    http://tampermonkey.net/
// @version      1.4.0
// ==/UserScript==

(() => {
    const uuid = window.crypto.randomUUID();

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
                paragraphItem.innerHTML = `<input class="checkbox-${uuid}" type="checkbox" disabled /> ${label}`;
                return;
            }

            match = text.match(checkedRegex);
            if (match) {
                const label = match[1];
                paragraphItem.innerHTML = `<input class="checkbox-${uuid}" type="checkbox" checked disabled /> ${label}`;
            }
        });
    };

    const minifyCSS = (css: string): string => {
        return css
            .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
            .replace(/\s*([\{\}:;,])\s*/g, "$1") // Remove spaces around symbols
            .replace(/\n/g, "") // Remove new lines
            .replace(/\s{2,}/g, " ") // Collapse multiple spaces
            .trim();
    };

    const minifySVG = (svg: string): string => {
        return svg
            .replace(/<!--[\s\S]*?-->/g, "") // Remove comments
            .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_match, css) => {
                return `<style>${minifyCSS(css)}</style>`; // Minify inline CSS
            })
            .replace(/\s*\n\s*/g, "") // Remove newlines and surrounding spaces
            .replace(/\s{2,}/g, " ") // Collapse multiple spaces
            .replace(/>\s+</g, "><") // Remove spaces between tags
            .trim();
    };

    const svgToDataURL = (svg: string): string => {
        const minifiedSVG = minifySVG(svg);
        const encoded = encodeURIComponent(minifiedSVG);
        return `data:image/svg+xml,${encoded}`;
    };

    const checkMarkSVG = `
        <?xml version="1.0" encoding="UTF-8"?>
        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 16">
            <!-- Generator: Adobe Illustrator 29.4.0, SVG Export Plug-In . SVG Version: 2.1.0 Build 152)  -->
            <defs>
                <style>
                .st0 {
                    fill: none;
                    stroke: #fff;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 2px;
                }
                </style>
            </defs>
            <polyline class="st0" points="3.5 8 6.5 12 12.5 4"/>
        </svg>
    `;

    // Add custom styles to make checkboxes more prominent
    const style = document.createElement("style");
    style.textContent = minifyCSS(`
        .checkbox-${uuid} {
            --tint-color: rgba(0, 122, 255, 1);
            --separator-color: rgba(60, 60, 67, 0.29);
            --gray-color: rgba(142, 142, 147, 1);
            /* Color scheme independent properties */
            --clear-color: transparent;
            --white-color: rgba(255, 255, 255, 1);
        }

        @media (prefers-color-scheme: dark) {
            .checkbox-${uuid} {
                --tint-color: rgba(10, 132, 255, 1);
                --separator-color: rgba(84, 84, 88, 0.6);
                --gray-color: rgba(142, 142, 147, 1);
            }
        }

        .checkbox-${uuid} {
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

        .checkbox-${uuid}:checked {
            background-color: var(--gray-color);
        }

        .checkbox-${uuid}::before {
            content: url("${svgToDataURL(checkMarkSVG)}");
            display: block;
            height: 1em;
            line-height: 1em;
            margin: -1px;
            visibility: hidden;
            width: 1em;
        }

        .checkbox-${uuid}:checked::before {
            visibility: visible;
        }
    `);
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
