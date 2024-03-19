import { type Browser } from 'puppeteer';
import { type TPDFService } from 'shared/build';

import { PDFSettings } from './enums/pdf-settings.enum.js';
import { wrapHtml } from './helpers/html-reset.helper.js';

class PDFService implements TPDFService {
    private browser: Browser;

    public constructor(browser: Browser) {
        this.browser = browser;
    }

    public async generatePDF(html: string): Promise<Buffer> {
        const page = await this.browser.newPage();

        await page.setContent(wrapHtml(html), {
            waitUntil: 'networkidle0',
        });

        const height = await page.evaluate(() => document.body.scrollHeight);
        const pdf = await page.pdf({
            width: PDFSettings.DEFAULT_WIDTH,
            height: `${height + 1}px`,
            printBackground: true,
        });
        await page.close();
        return pdf;
    }
}

export { PDFService };
