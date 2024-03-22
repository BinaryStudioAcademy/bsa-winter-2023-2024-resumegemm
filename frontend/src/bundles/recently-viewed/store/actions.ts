import { createAsyncThunk } from '@reduxjs/toolkit';
import { type FindAllOptions } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { RESUMES_LIMIT } from '../common/resumes-limit.js';
import { type RecentlyViewedResumesResponseDto } from '../common/types/types.js';
import { name as sliceName } from './slice.js';

const getRecentlyViewedResumes = createAsyncThunk<
    RecentlyViewedResumesResponseDto[],
    FindAllOptions | undefined,
    AsyncThunkConfig
>(`${sliceName}/resumes`, (options, { extra }) => {
    const { recentlyViewedApi } = extra;

    const query = {
        direction: options?.direction ?? 'desc',
        name: options?.name ?? '',
    };

    return recentlyViewedApi.getRecentlyViewedResumes(RESUMES_LIMIT, query);
});

export { getRecentlyViewedResumes };
