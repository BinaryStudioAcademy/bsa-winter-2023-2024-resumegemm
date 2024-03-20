import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type ResumeWithShare } from 'shared/build/bundles/resumes/types/resume-with-share.type.js';

import { type ResumeShareAccessGetResponseDto } from '../types/types.js';
import {
    accessResume,
    accessResumeDetails,
    deleteAccessResume,
    getUserResumesWithLinks,
} from './actions.js';

type State = {
    resumeId: string | null;
    details: ResumeShareAccessGetResponseDto[];
    resumes: ResumeWithShare[];
};

const initialState: State = {
    resumeId: null,
    details: [],
    resumes: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'resumeAccess',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(accessResume.fulfilled, (state, action) => {
            state.resumeId = action.payload.resumeId;
        });

        builder.addCase(getUserResumesWithLinks.fulfilled, (state, action) => {
            state.resumes = action.payload.resumes;
        });

        builder.addCase(accessResumeDetails.fulfilled, (state, action) => {
            state.details = action.payload.accesses;
        });

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
