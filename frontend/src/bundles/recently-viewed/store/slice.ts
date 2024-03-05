import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type RecentlyViewedTemplatesResponseDto } from '../types/types';
import { getRecentlyViewedTemplates } from './actions.js';

type State = {
    recentlyViewedTemplates: RecentlyViewedTemplatesResponseDto[];
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    recentlyViewedTemplates: [],
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'recently-viewed',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getRecentlyViewedTemplates.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(
            getRecentlyViewedTemplates.fulfilled,
            (state, action) => {
                state.recentlyViewedTemplates = action.payload;
                state.dataStatus = DataStatus.FULFILLED;
            },
        );
        builder.addCase(getRecentlyViewedTemplates.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
