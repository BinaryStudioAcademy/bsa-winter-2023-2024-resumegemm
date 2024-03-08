import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type TemplateDto } from '../types/types.js';
import { loadAllTemplates } from './actions.js';

type State = {
    templates: TemplateDto[];
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    templates: [],
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'templates',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadAllTemplates.fulfilled, (state, action) => {
            state.templates = action.payload;
        });
        builder.addMatcher(isAnyOf(loadAllTemplates.pending), (state) => {
            state.dataStatus = DataStatus.PENDING;
        });

        builder.addMatcher(isAnyOf(loadAllTemplates.rejected), (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.templates = [];
        });
    },
});

export { actions, name, reducer };
