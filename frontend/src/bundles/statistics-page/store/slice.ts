import { createSlice } from '@reduxjs/toolkit';

import { type StatisticsRecord } from '../types/types.js';
import { getStatistics } from './actions.js';

type State = {
    statisticsRecords: StatisticsRecord[];
    views: number;
};

const initialState: State = {
    statisticsRecords: [],
    views: 0,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'statistics',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getStatistics.fulfilled, (state, action) => {
            state.statisticsRecords = action.payload.data;
            state.views = action.payload.sum;
        });
    },
});

export { actions, name, reducer };
