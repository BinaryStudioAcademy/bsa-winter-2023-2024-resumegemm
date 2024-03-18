import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

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
    undefined,
    AsyncThunkConfig
>(`${sliceName}/getViewsCountByUserId`, (request, { extra }) => {
    const { resumeApi } = extra;

    return resumeApi.getViewsCount();
});

export { getAllResumesByUserId, getViewsCountByUserId };
