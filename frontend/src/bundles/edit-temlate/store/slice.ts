import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type TemplateEditResponseDto } from '../types/types.js';
import { editTemplate } from './actions.js';

type State = {
    template: TemplateEditResponseDto | null;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    template: null,
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
            state.template = action.payload as TemplateEditResponseDto;
        });

        builder.addMatcher(isAnyOf(editTemplate.rejected), (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.template = null;
        });
    },
});

export { actions, name, reducer };
