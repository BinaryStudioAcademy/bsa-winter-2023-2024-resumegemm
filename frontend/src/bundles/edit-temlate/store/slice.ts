import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type TemplateDto } from '../types/types.js';
import { TemplateBlockTitles } from '../types/types.js';
import { editTemplate } from './actions.js';

type State = {
    templates: TemplateDto[];
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    templates: [
        {
            id: '1',
            isOwner: true,
            createdAt: '2021-08-09T11:51:00.000Z',
            updatedAt: '2021-08-09T11:51:00.000Z',
            deletedAt: null,
            templateSettings: {
                [TemplateBlockTitles.Contacts]: {
                    enabled: true,
                },
                [TemplateBlockTitles.Experience]: {
                    enabled: true,
                },
                [TemplateBlockTitles.Education]: {
                    enabled: true,
                },
                [TemplateBlockTitles.Languages]: {
                    enabled: true,
                },
                [TemplateBlockTitles.Portfolio]: {
                    enabled: true,
                },
                [TemplateBlockTitles.Profile]: {
                    enabled: true,
                },
                [TemplateBlockTitles.Recommendations]: {
                    enabled: true,
                },
                [TemplateBlockTitles.Skills]: {
                    enabled: true,
                },
                [TemplateBlockTitles.Socials]: {
                    enabled: true,
                },
                [TemplateBlockTitles.Summary]: {
                    enabled: true,
                },
                [TemplateBlockTitles.TechStack]: {
                    enabled: true,
                },
            },
        }
    ],
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'templates',
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(isAnyOf(editTemplate.pending), (state) => {
            state.dataStatus = DataStatus.PENDING;
        });

        builder.addMatcher(isAnyOf(editTemplate.fulfilled), (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.templates.push(action.payload as TemplateDto);
        });

        builder.addMatcher(isAnyOf(editTemplate.rejected), (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.templates = [];
        });
    },
});

export { actions, name, reducer };
