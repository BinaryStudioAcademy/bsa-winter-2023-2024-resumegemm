import { Controller } from '~/common/controller/controller.package.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';

import { PDFApiPath } from './enums/enums.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    type GeneratePdfRequestDto,
    type HTTPError,
    type ILogger,
    type TPDFService,
} from './types/types.js';

class PDFController extends Controller {
    private pdfService: TPDFService;

    public constructor(logger: ILogger, pdfService: TPDFService) {
        super(logger, ApiPath.PDF);
        this.pdfService = pdfService;

        this.addRoute({
            path: PDFApiPath.GENERATE,
            method: 'POST',
            handler: (options) =>
                this.generatePDF(
                    options as ApiHandlerOptions<{
                        body: GeneratePdfRequestDto;
                    }>,
                ),
        });
    }

    private async generatePDF(
        options: ApiHandlerOptions<{
            body: GeneratePdfRequestDto;
        }>,
    ): Promise<ApiHandlerResponse<Buffer>> {
        const { html } = options.body;
        try {
            return {
                status: HttpCode.OK,
                payload: await this.pdfService.generatePDF(html),
                contentType: 'application/pdf',
            };
        } catch (error: unknown) {
            const { message, status } = error as HTTPError;
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
