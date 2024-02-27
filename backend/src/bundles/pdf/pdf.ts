import puppeteer from 'puppeteer';

import { logger } from '~/common/logger/logger.js';

import { PDFController } from './pdf.controller.js';
import { PDFService } from './pdf.service.js';

const browser = await puppeteer.launch({ headless: true });
const pdfService = new PDFService(browser);
const pdfController = new PDFController(logger, pdfService);

export { pdfController, pdfService };
