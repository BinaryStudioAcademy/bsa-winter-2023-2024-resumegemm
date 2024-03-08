import { createSlice } from '@reduxjs/toolkit';
import { type UserWithProfileRelation } from 'shared/build';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type State = {
    profile: UserWithProfileRelation['userProfile'] | null;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    profile: null,
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'profile',
    reducers: {},
});

export { actions, name, reducer };
