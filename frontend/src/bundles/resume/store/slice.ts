import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
    getAllResumes,
    getCurrentResumeWithTemplate,
    getResumeReviewFromAI,
} from '~/bundles/resume/store/actions';

import { DataStatus } from '../enums/enums';
import {
    type ResumeAiScoreResponseDto,
    type ResumeGetAllResponseDto,
    type ResumeWithRelationsAndTemplateResponseDto,
    type ValueOf,
} from '../types/types';

type State = {
    resumes: ResumeGetAllResponseDto[] | [];
    currentResume: ResumeWithRelationsAndTemplateResponseDto | null;
    dataStatus: ValueOf<typeof DataStatus>;
    resumeReview: ResumeAiScoreResponseDto | null;
};

const initialState: State = {
    resumes: [],
    currentResume: null,
    dataStatus: DataStatus.IDLE,
    resumeReview: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'resumes',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllResumes.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.resumes = action.payload;
        });
        builder.addCase(getResumeReviewFromAI.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.resumeReview = action.payload;
        });
        builder.addCase(
            getCurrentResumeWithTemplate.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.currentResume = action.payload;
            },
        );
        builder.addMatcher(
            isAnyOf(
                getAllResumes.pending,
                getCurrentResumeWithTemplate.pending,
                getResumeReviewFromAI.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(
                getAllResumes.rejected,
                getCurrentResumeWithTemplate.rejected,
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
                state.resumes = [];
                state.currentResume = null;
                state.resumeReview = null;
            },
        );
    },
});

export { actions, name, reducer };
