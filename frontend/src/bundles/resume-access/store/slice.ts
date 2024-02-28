import { createSlice } from '@reduxjs/toolkit';

import { type ResumeShareAccessGetResponseDto } from '../types/types.js';
import {
    accessResume,
    accessResumeDetails,
    deleteAccessResume,
} from './actions.js';

type State = {
    resumeId: string | null;
    details: ResumeShareAccessGetResponseDto[];
};

const initialState: State = {
    resumeId: null,
    details: [],
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

        builder.addCase(deleteAccessResume.fulfilled, (state) => {
            state.resumeId = null;
        });

        builder.addCase(accessResumeDetails.fulfilled, (state, action) => {
            state.details = action.payload.accesses;
        });

        builder.addCase(accessResumeDetails.rejected, (state) => {
            state.details = [];
        });

        builder.addCase(accessResumeDetails.pending, (state) => {
            state.details = [];
        });
    },
});

export { actions, name, reducer };
