import { createAsyncThunk } from '@reduxjs/toolkit';

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

export { editTemplate };
