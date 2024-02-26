import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type TemplateGetAllItemResponseDto, type ValueOf } from 'shared/build';

import { DataStatus } from '~/bundles/common/enums/data-status.enum';

import { loadAllTemplates } from './actions';

type State = {
    templates: TemplateGetAllItemResponseDto[];
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    templates: [],
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'templates2',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadAllTemplates.fulfilled, (state, action) => {
            (state.dataStatus = DataStatus.FULFILLED),
                (state.templates = action.payload);
        });
        builder.addMatcher(isAnyOf(loadAllTemplates.pending), (state) => {
            state.dataStatus = DataStatus.PENDING;
        });

        builder.addMatcher(isAnyOf(loadAllTemplates.rejected), (state) => {
            (state.dataStatus = DataStatus.REJECTED), (state.templates = []);
        });
    },
});

export { actions, name, reducer };
