import { type Browser } from 'puppeteer';
import { type TPDFService } from 'shared/build';

class PDFService implements TPDFService {
    private browser: Browser;

    public constructor(browser: Browser) {
        this.browser = browser;
    }

    public async generatePDF(html: string): Promise<Buffer> {
        const page = await this.browser.newPage();
        await page.setContent(html, {
            waitUntil: 'networkidle0',
        });
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
        });
        await page.close();
        return pdf;
    }
}

export { PDFService };
