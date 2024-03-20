import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { updateTemplateSettings } from '~/bundles/resume/helpers/helpers';
import {
    createResume,
    deleteResume,
    getAllResumes,
    getCurrentResumeWithTemplate,
    getResumeReviewFromAI,
    getViewsCountByUserId,
    setTemplateSettingsOnResumeCreate,
    updateCurrentResume,
} from '~/bundles/resume/store/actions';

import { DataStatus } from '../enums/enums';
import {
    type ResumeAiScoreResponseDto,
    type ResumeGetAllResponseDto,
    type ResumeViewsCountResponseDto,
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
    currentTemplateId: string | null;
    resumeViews: ResumeViewsCountResponseDto[];
};

const initialState: State = {
    resumes: [],
    currentResume: null,
    dataStatus: DataStatus.IDLE,
    resumeReview: null,
    templateSettings: null,
    currentTemplateId: null,
    resumeViews: [],
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
        setUserAvatarInTemplateSettings: (state, action) => {
            if (state.templateSettings) {
                state.templateSettings.containers =
                    state.templateSettings.containers.map((container) => {
                        return {
                            ...container,
                            blocks: container.blocks.map((block) => {
                                return {
                                    ...block,
                                    items: block.items.map((item) => {
                                        if (item.id === 'avatar') {
                                            return {
                                                ...item,
                                                content: action.payload,
                                            };
                                        }
                                        return item;
                                    }),
                                };
                            }),
                        };
                    });
            }
        },
        setCurrentTemplateId: (state, action) => {
            state.currentTemplateId = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(createResume.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.resumes = [...state.resumes, action.payload];
        });
        builder.addCase(getResumeReviewFromAI.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.resumeReview = action.payload;
        });
        builder.addCase(updateCurrentResume.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.currentResume = action.payload;
        });
        builder.addCase(
            setTemplateSettingsOnResumeCreate.fulfilled,
            (state, action) => {
                state.templateSettings = action.payload;
            },
        );
        builder.addCase(
            getCurrentResumeWithTemplate.fulfilled,
            (state, action) => {
                const {
                    templateSettingsWithUpdatedUserData,
                    resumeWithTemplate,
                } = action.payload;
                state.dataStatus = DataStatus.FULFILLED;
                state.currentResume = resumeWithTemplate;
                state.templateSettings = templateSettingsWithUpdatedUserData;
            },
        );
        builder.addCase(getViewsCountByUserId.fulfilled, (state, action) => {
            state.resumeViews = action.payload;
        });
        builder.addMatcher(
            isAnyOf(getAllResumes.fulfilled, deleteResume.fulfilled),
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.resumes = action.payload;
            },
        );
        builder.addMatcher(
            isAnyOf(
                getAllResumes.pending,
                deleteResume.pending,
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
