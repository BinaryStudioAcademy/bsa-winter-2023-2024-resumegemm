import { createSlice } from '@reduxjs/toolkit';

import {
    type ResumeGetItemResponseDto,
    type ResumeViewsCountResponseDto,
} from '../types/types.js';
import { getAllResumesByUserId, getViewsCountByUserId } from './actions.js';

type State = {
    resumeId: string;
    resumes: ResumeGetItemResponseDto[];
    resumeViews: ResumeViewsCountResponseDto[];
};

const initialState: State = {
    resumeId: '',
    resumeId: '',
    resumes: [],
    resumeViews: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'resumes',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllResumesByUserId.fulfilled, (state, action) => {
            state.resumes = action.payload.resumes;
        });
        builder.addCase(getViewsCountByUserId.fulfilled, (state, action) => {
            state.resumeViews = action.payload;
        });
    },
});

export { actions, name, reducer };
