import { createSlice } from '@reduxjs/toolkit';

import { type StatisticsRecord } from '../types/types.js';
import { getStatistics } from './actions.js';

type State = {
    statisticsRecords: StatisticsRecord[];
};

const initialState: State = {
    statisticsRecords: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'statistics',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getStatistics.fulfilled, (state, action) => {
            state.statisticsRecords = action.payload.data;
        });
    },
});

export { actions, name, reducer };
