import { type TPDFService } from 'shared/build';

import { type ApiHandlerResponse } from '~/common/controller/controller.js';
import { Controller } from '~/common/controller/controller.package.js';
import { ApiPath } from '~/common/enums/enums.js';
import { type HttpError } from '~/common/http/http.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { PDFApiPath } from './enums/enums.js';

class PDFController extends Controller {
    private pdfService: TPDFService;

    public constructor(logger: ILogger, pdfService: TPDFService) {
        super(logger, ApiPath.PDF);
        this.pdfService = pdfService;

        this.addRoute({
            path: PDFApiPath.GENERATE,
            method: 'GET',
            handler: () => this.generatePDF(),
        });
    }

    private async generatePDF(): Promise<ApiHandlerResponse<Buffer>> {
        const testHTML = `
            <html>
                <body>
                    <h1>Hello, World!</h1>
                </body>
                <style>
                    h1 {
                        color: red;
                    }
                </style>
            </html>
        `;
        try {
            return {
                status: HttpCode.OK,
                payload: await this.pdfService.generatePDF(testHTML),
                contentType: 'application/pdf',
            };
        } catch (error: unknown) {
            const { message, status } = error as HttpError;
            return {
                status,
                payload: {
                    message,
                    status,
                },
            };
        }
    }
}

export { PDFController };
