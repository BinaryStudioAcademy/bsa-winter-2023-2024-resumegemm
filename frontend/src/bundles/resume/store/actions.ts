import { createAsyncThunk } from '@reduxjs/toolkit';

import { openDownloadLinkForPDF } from '~/helpers/helpers.js';

import {
    type AsyncThunkConfig,
    type GeneratePdfRequestDto,
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
    type ResumeGetAllResponseDto,
    type ResumeWithRelationsAndTemplateResponseDto,
} from '../types/types';
import { name as sliceName } from './slice.js';

const getAllResumes = createAsyncThunk<
    ResumeGetAllResponseDto[],
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-all-resumes`, (_, { extra }) => {
    const { resumeApi } = extra;
    return resumeApi.getAllResumes();
});

const getCurrentResumeWithTemplate = createAsyncThunk<
    ResumeWithRelationsAndTemplateResponseDto,
    string,
    AsyncThunkConfig
>(`${sliceName}/get-current-resume`, (resumeId, { extra }) => {
    const { resumeApi } = extra;
    return resumeApi.getOneWithTemplate(resumeId);
});

const getResumeReviewFromAI = createAsyncThunk<
    ResumeAiScoreResponseDto,
    ResumeAiScoreRequestDto,
    AsyncThunkConfig
>(`${sliceName}/get-resume-review`, (resume, { extra }) => {
    const { resumeApi } = extra;
    return resumeApi.requestResumeReviewFromAI(resume);
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

export {
    downloadPDFDocument,
    getAllResumes,
    getCurrentResumeWithTemplate,
    getResumeReviewFromAI,
};
