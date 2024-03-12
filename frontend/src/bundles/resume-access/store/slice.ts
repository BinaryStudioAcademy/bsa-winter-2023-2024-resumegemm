import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { type ResumeShareAccessGetResponseDto } from '../types/types.js';
import {
    accessResume,
    accessResumeDetails,
    deleteAccessResume,
    getResumeAccessByResumeId,
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
        builder.addCase(accessResume.fulfilled, (state, action) => {
            state.resumeId = action.payload.resumeId;
        });

        builder.addCase(accessResumeDetails.fulfilled, (state, action) => {
            state.details = action.payload.accesses;
        });
        builder.addCase(
            getResumeAccessByResumeId.fulfilled,
            (state, action) => {
                state.resumeId = action.payload.resumeId;
            },
        );

        builder.addMatcher(
            isAnyOf(
                deleteAccessResume.fulfilled,
                accessResume.rejected,
                accessResume.pending,
            ),
            (state) => {
                state.resumeId = null;
            },
        );

        builder.addMatcher(
            isAnyOf(accessResumeDetails.rejected, accessResumeDetails.pending),
            (state) => {
                state.details = [];
            },
        );
    },
});

export { actions, name, reducer };
