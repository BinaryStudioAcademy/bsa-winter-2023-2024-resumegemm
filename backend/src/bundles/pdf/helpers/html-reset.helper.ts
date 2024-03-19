import { resetStyles } from '../constants/constants.js';

const wrapHtml = (html: string): string => `
    <!DOCTYPE html>

    <head>
        ${resetStyles}
    </head>

    <html lang="en">

    <body>
        <div style="width: 500px; min-height: calc(500px * 1.414); transform: scale(calc(793 / 500)); transform-origin: top left;">
    ${html}
        </div>
    </body>
    </html>
    `;

export { wrapHtml };
