import { createSlice } from '@reduxjs/toolkit';

import { type ResumeGetItemResponseDto } from '../types/types.js';
import { getAllResumesByUserId } from './actions.js';

type State = {
    resumeId: string;
    resumes: ResumeGetItemResponseDto[];
};

const initialState: State = {
    resumeId: '',
    resumes: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'resumes',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllResumesByUserId.fulfilled, (state, action) => {
            state.resumes = action.payload.resumes;
        });
    },
});

export { actions, name, reducer };
