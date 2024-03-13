import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type Industry } from '../type/types';
import { name as sliceName } from './slice.js';

const getAll = createAsyncThunk<Industry[], undefined, AsyncThunkConfig>(
    `${sliceName}`,
    (_, { extra }) => {
        const { industriesApi } = extra;

        return industriesApi.getAll();
    },
);

export { getAll };
