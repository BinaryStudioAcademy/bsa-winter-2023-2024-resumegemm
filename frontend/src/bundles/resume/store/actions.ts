import { createAsyncThunk } from '@reduxjs/toolkit';
import { type GeneratePdfRequestDto } from 'shared/build/bundles/pdf/pdf.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { openDownloadLinkForPDF } from '~/helpers/helpers.js';

import {
    type ResumeGetAllResponseDto,
    type ResumeViewsCountResponseDto,
} from '../types/types.js';
import { name as sliceName } from './slice.js';

const getAllResumesByUserId = createAsyncThunk<
    ResumeGetAllResponseDto,
    { userId: string },
    AsyncThunkConfig
>(`${sliceName}/getAllResumesByUserId`, (request, { extra }) => {
    const { resumeApi } = extra;

    return resumeApi.getAllByUserId(request);
});

const getViewsCountByUserId = createAsyncThunk<
    ResumeViewsCountResponseDto[],
    { userId: string },
    AsyncThunkConfig
>(`${sliceName}/getViewsCountByUserId`, (request, { extra }) => {
    const { resumeApi } = extra;

    return resumeApi.getViewsCount(request.userId);
});

const downloadPDFDocument = createAsyncThunk<
    unknown,
    GeneratePdfRequestDto,
    AsyncThunkConfig
>(`${sliceName}/download-pdf-doc`, async (html, { extra }) => {
    const { pdfApi } = extra;
    const blob = await pdfApi.generatePDFFileFromHTMLString(html);
    openDownloadLinkForPDF(blob);
});

export { downloadPDFDocument, getAllResumesByUserId, getViewsCountByUserId };
