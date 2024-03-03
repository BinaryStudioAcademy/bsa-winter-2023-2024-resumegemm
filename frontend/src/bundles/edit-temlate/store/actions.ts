import { createAsyncThunk } from '@reduxjs/toolkit';
import { type TemplateGetAllItemResponseDto } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type TemplateUpdateItemRequestDto,
    type TemplateUpdateItemResponseDto,
} from '../types/types.js';
import { name as sliceName } from './slice.js';

type EditTemplayePayload = Partial<TemplateUpdateItemRequestDto> & {
    id: string;
};

const editTemplate = createAsyncThunk<
    TemplateUpdateItemResponseDto,
    EditTemplayePayload,
    AsyncThunkConfig
>(`${sliceName}/edit`, (request, { extra }) => {
    const { templateApi } = extra;

    return templateApi.editTemplate(
        request.id,
        request.templateSettings as TemplateUpdateItemRequestDto,
    );
});

const loadAllTemplates = createAsyncThunk<
    TemplateGetAllItemResponseDto[],
    undefined,
    AsyncThunkConfig
>('templates2/load-all', async (_, { extra }) => {
    const { templateApi } = extra;
    const { items } = await templateApi.getAll();
    return items;
});

export { editTemplate, loadAllTemplates };
