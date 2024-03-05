import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type RecentlyViewedTemplatesResponseDto } from '../types/types';
import { name as sliceName } from './slice.js';

const getRecentlyViewedTemplates = createAsyncThunk<
    RecentlyViewedTemplatesResponseDto[],
    undefined,
    AsyncThunkConfig
>(`${sliceName}/templates`, async (_, { extra }) => {
    const { recentlyViewedApi } = extra;

    return await recentlyViewedApi.getRecentlyViewedTemplates();
});

export { getRecentlyViewedTemplates };