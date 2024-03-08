import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/async-thunk-config.type';

import { type TemplateDto } from '../../templates-page/types/types';
import { name as sliceName } from './slice.js';

const getTemplateById = createAsyncThunk<TemplateDto, string, AsyncThunkConfig>(
    `${sliceName}/get-by-id`,
    async (id, { extra }) => {
        const { templateApi } = extra;
        return await templateApi.getTemplateById(id);
    },
);

const createTemplate = createAsyncThunk<
    TemplateDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/create`, async (_, { extra }) => {
    const { templateApi } = extra;
    return await templateApi.createTemplate();
});

const editTemplate = createAsyncThunk<TemplateDto, undefined, AsyncThunkConfig>(
    `${sliceName}/edit`,
    async (request, { extra, getState }) => {
        const { templateApi } = extra;
        const { id, templateSettings } = getState().editTemplate.template;

        return await templateApi.editTemplate(id, { templateSettings });
    },
);

export { createTemplate, editTemplate, getTemplateById };
