import { createSlice } from '@reduxjs/toolkit';

import { type Industry } from '../type/types';
import { getAll } from './actions.js';

type State = {
    industries: Industry[];
};

const initialState: State = {
    industries: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'industries',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.industries = action.payload;
        });
        builder.addCase(getAll.rejected, (state) => {
            state.industries = [];
        });
    },
});

export { actions, name, reducer };
