import { createSlice } from '@reduxjs/toolkit';

import { getAllResumes } from '~/bundles/resume/store/actions';

import { DataStatus } from '../enums/enums';
import { type ResumeGetAllResponseDto, type ValueOf } from '../types/types';

type State = {
    resumes: ResumeGetAllResponseDto[] | [];
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    resumes: [],
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'resumes',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllResumes.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getAllResumes.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.resumes = action.payload;
        });
        builder.addCase(getAllResumes.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.resumes = [];
        });
    },
});

export { actions, name, reducer };
