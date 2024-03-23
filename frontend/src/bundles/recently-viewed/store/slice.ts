import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type RecentlyViewedResumesResponseDto } from '../common/types/types';
import { getRecentlyViewedResumes } from './actions.js';

type State = {
    recentlyViewedResumes: RecentlyViewedResumesResponseDto[];
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    recentlyViewedResumes: [],
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'recently-viewed',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getRecentlyViewedResumes.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getRecentlyViewedResumes.fulfilled, (state, action) => {
            state.recentlyViewedResumes = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(getRecentlyViewedResumes.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
