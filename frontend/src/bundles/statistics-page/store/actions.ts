import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type GetStatisticsResponseDto } from '../types/types.js';
import { name as sliceName } from './slice.js';

const getStatistics = createAsyncThunk<
    GetStatisticsResponseDto,
    { resumeIds: string[]; period: string },
    AsyncThunkConfig
>(`${sliceName}/getStatistics`, (request, { extra }) => {
    const { statisticsApi } = extra;

    return statisticsApi.getStatistics(request.resumeIds, request.period);
});

export { getStatistics };
