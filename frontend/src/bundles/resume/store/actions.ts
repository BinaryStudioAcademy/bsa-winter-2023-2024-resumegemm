import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    type AsyncThunkConfig,
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

export { getAllResumes, getCurrentResumeWithTemplate, getResumeReviewFromAI };
