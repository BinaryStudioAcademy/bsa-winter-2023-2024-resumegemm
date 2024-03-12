import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    type AsyncThunkConfig,
    type ResumeGetAllResponseDto,
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

export { getAllResumes };
