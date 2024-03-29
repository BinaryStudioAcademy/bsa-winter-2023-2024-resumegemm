import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type GetUserResumeSharesResponse,
    type ResumeShareCreateResponseDto,
    type ResumeShareDetailsGetResponseDto,
    type ResumeShareGetResponseDto,
} from '../types/types.js';
import { name as sliceName } from './slice.js';

const accessResume = createAsyncThunk<
    ResumeShareGetResponseDto,
    { id: string },
    AsyncThunkConfig
>(`${sliceName}/accessResume`, (request, { extra }) => {
    const { resumeAccessApi } = extra;

    return resumeAccessApi.accessResume(request.id);
});

const getUserResumesWithLinks = createAsyncThunk<
    GetUserResumeSharesResponse,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/getUserResumesWithLinks`, (request, { extra }) => {
    const { resumeAccessApi } = extra;

    return resumeAccessApi.getUserResumesWithLinks();
});

const accessResumeDetails = createAsyncThunk<
    ResumeShareDetailsGetResponseDto,
    { id: string },
    AsyncThunkConfig
>(`${sliceName}/accessResumeDetails`, (request, { extra }) => {
    const { resumeAccessApi } = extra;

    return resumeAccessApi.accessResumeDetails(request.id);
});

const deleteAccessResume = createAsyncThunk<
    ResumeShareGetResponseDto,
    { id: string },
    AsyncThunkConfig
>(`${sliceName}/deleteAccessResume`, (request, { extra }) => {
    const { resumeAccessApi } = extra;

    return resumeAccessApi.deleteResumeAccess(request.id);
});

const createResumeAccess = createAsyncThunk<
    ResumeShareCreateResponseDto,
    { resumeId: string },
    AsyncThunkConfig
>(`${sliceName}/createAccessResume`, (request, { extra }) => {
    const { resumeAccessApi } = extra;

    return resumeAccessApi.createResumeAccess(request.resumeId);
});

export {
    accessResume,
    accessResumeDetails,
    createResumeAccess,
    deleteAccessResume,
    getUserResumesWithLinks,
};
