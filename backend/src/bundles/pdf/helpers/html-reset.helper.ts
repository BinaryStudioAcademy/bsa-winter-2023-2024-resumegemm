import { resetStyles } from '../constants/constants.js';

const wrapHtml = (html: string): string => `
    <!DOCTYPE html>

    <head>
        ${resetStyles}
    </head>

    <html lang="en">

    <body>
        <div class="reset">
    ${html}
        </div>
    </body>
    </html>
    `;

export { wrapHtml };
