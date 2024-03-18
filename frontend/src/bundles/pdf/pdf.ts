import { PDFApi } from '~/bundles/pdf/pdf-api';
import { config } from '~/framework/config/config';
import { http } from '~/framework/http/http';
import { storage } from '~/framework/storage/storage';

const pdfApi = new PDFApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { pdfApi };
