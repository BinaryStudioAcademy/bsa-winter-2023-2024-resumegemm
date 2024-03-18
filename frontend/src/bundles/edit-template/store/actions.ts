import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/async-thunk-config.type';

import {
    type TemplateDto,
    type TemplateSettings,
} from '../../templates-page/types/types';
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

const editTemplate = createAsyncThunk<
    TemplateDto,
    { templateSettings: TemplateSettings; image: string },
    AsyncThunkConfig
>(`${sliceName}/edit`, ({ templateSettings, image }, { extra, getState }) => {
    const { templateApi } = extra;
    const { id, name } = getState().editTemplate.template;

    return templateApi.editTemplate(id, { name, templateSettings, image });
});

export { createTemplate, editTemplate, getTemplateById };
