import { type PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type ValueOf } from 'shared/build';

import { DataStatus } from '~/bundles/common/enums/enums.js';

import { type TemplateDto } from '../../templates-page/types/types.js';
import { createTemplate, editTemplate, getTemplateById } from './actions.js';

type State = {
    template: Pick<
        TemplateDto,
        'id' | 'name' | 'isOwner' | 'image' | 'templateSettings'
    >;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    template: {
        id: '',
        name: '',
        isOwner: false,
        image: '',
        templateSettings: {
            containers: [],
            styles: {},
        },
    },
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'editTemplate',
    reducers: {
        setBlockEnabled: (
            state,
            action: PayloadAction<{ blockName: string; enabled: boolean }>,
        ) => {
            const { blockName, enabled } = action.payload;
            const { templateSettings } = state.template;
            const newTemplateSettings = {
                ...templateSettings,
                containers: templateSettings.containers.map((container) => ({
                    ...container,
                    blocks: container.blocks.map((block) => {
                        if (block.name === blockName) {
                            return {
                                ...block,
                                enabled,
                            };
                        }
                        return block;
                    }),
                })),
            };
            state.template.templateSettings = newTemplateSettings;
        },
        setName: (state, action: PayloadAction<{ name: string }>) => {
            const { name } = action.payload;
            const defaultName = 'My template';
            if (!name) {
                state.template.name = defaultName;
                return;
            }
            state.template.name = name;
        },
    },
    extraReducers(builder) {
        builder.addMatcher(
            isAnyOf(
                getTemplateById.pending,
                createTemplate.pending,
                editTemplate.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );

        builder.addMatcher(
            isAnyOf(getTemplateById.fulfilled, createTemplate.fulfilled),
            (state, action) => {
                state.template = action.payload;
                state.dataStatus = DataStatus.FULFILLED;
            },
        );
    },
});

export { actions, name, reducer };
