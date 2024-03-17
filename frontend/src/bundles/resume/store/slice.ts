import { createSlice } from '@reduxjs/toolkit';
import { type TemplateSettings } from 'shared/build/index.js';

import {
    type ResumeGetItemResponseDto,
    type ResumeViewsCountResponseDto,
} from '../types/types.js';
import { getAllResumesByUserId, getViewsCountByUserId } from './actions.js';

type State = {
    resumeId: string;
    resumes: ResumeGetItemResponseDto[];
    resumeViews: ResumeViewsCountResponseDto[];
    templateSettings: TemplateSettings | null;
};

const initialState: State = {
    resumeId: '',
    resumes: [],
    resumeViews: [],
    templateSettings: null,
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
