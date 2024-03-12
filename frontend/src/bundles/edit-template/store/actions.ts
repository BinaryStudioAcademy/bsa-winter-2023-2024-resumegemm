import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/async-thunk-config.type';

import { type TemplateDto } from '../../templates-page/types/types';
import { name as sliceName } from './slice.js';

const getTemplateById = createAsyncThunk<TemplateDto, string, AsyncThunkConfig>(
    `${sliceName}/get-by-id`,
    (id, { extra }) => {
        const { templateApi } = extra;
        return templateApi.getTemplateById(id);
    },
);

const createTemplate = createAsyncThunk<
    TemplateDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/create`, (_, { extra }) => {
    const { templateApi } = extra;
    return templateApi.createTemplate();
});

const editTemplate = createAsyncThunk<TemplateDto, string, AsyncThunkConfig>(
    `${sliceName}/edit`,
    (image, { extra, getState }) => {
        const { templateApi } = extra;
        const { id, templateSettings } = getState().editTemplate.template;

        return templateApi.editTemplate(id, {
            templateSettings,
            image,
        });
    },
);

export { createTemplate, editTemplate, getTemplateById };
