import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type ResumeShareGetResponseDto } from '../types/types.js';
import { name as sliceName } from './slice.js';

const accessResume = createAsyncThunk<
    ResumeShareGetResponseDto,
    { id: string },
    AsyncThunkConfig
>(`${sliceName}/accessResume`, (request, { extra }) => {
    const { resumeAccessApi } = extra;

    return resumeAccessApi.accessResume(request.id);
});

export { accessResume };
