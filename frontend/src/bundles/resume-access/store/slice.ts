import { createSlice } from '@reduxjs/toolkit';

import { accessResume } from './actions.js';

type State = {
    resumeId: string | null;
};

const initialState: State = {
    resumeId: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'resumeAccess',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(accessResume.pending, (state) => {
            state.resumeId = null;
        });

        builder.addCase(accessResume.fulfilled, (state, action) => {
            state.resumeId = action.payload.resumeId;
        });

        builder.addCase(accessResume.rejected, (state) => {
            state.resumeId = null;
        });
    },
});

export { actions, name, reducer };
