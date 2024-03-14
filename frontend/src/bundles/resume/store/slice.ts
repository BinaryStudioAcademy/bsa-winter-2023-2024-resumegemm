import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
    updateTemplateSettings,
    updateTemplateSettingsBlocks,
} from '~/bundles/resume/helpers/helpers';
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
    type TemplateSettings,
    type ValueOf,
} from '../types/types';

type State = {
    resumes: ResumeGetAllResponseDto[] | [];
    currentResume: ResumeWithRelationsAndTemplateResponseDto | null;
    dataStatus: ValueOf<typeof DataStatus>;
    resumeReview: ResumeAiScoreResponseDto | null;
    templateSettings: TemplateSettings | null;
};

const initialState: State = {
    resumes: [],
    currentResume: null,
    dataStatus: DataStatus.IDLE,
    resumeReview: null,
    templateSettings: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'resumes',
    reducers: {
        setNewTemplateSettings: (state, action) => {
            if (state.templateSettings) {
                state.templateSettings.containers = updateTemplateSettings(
                    state.templateSettings.containers,
                    action.payload,
                );
            }
        },
    },
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
                const {
                    personalInformation,
                    templates: { templateSettings },
                } = action.payload;
                state.dataStatus = DataStatus.FULFILLED;
                state.currentResume = action.payload;

                state.templateSettings = {
                    ...templateSettings,
                    containers: updateTemplateSettingsBlocks(
                        templateSettings.containers,
                        personalInformation,
                    ),
                };
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
                state.templateSettings = null;
            },
        );
    },
});

export { actions, name, reducer };
