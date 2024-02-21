import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type TemplateEditRequestDto,
    type TemplateEditResponseDto,
} from '../types/types.js';
import { name as sliceName } from './slice.js';

type EditTemplayePayload = Partial<TemplateEditRequestDto> & { id: string };

const editTemplate = createAsyncThunk<
    TemplateEditResponseDto,
    EditTemplayePayload,
    AsyncThunkConfig
>(`${sliceName}/edit`, (request, { extra }) => {
    const { templateApi } = extra;

    return templateApi.editTemplate(
        request.id,
        request.templateSettings as TemplateEditRequestDto,
    );
});

export { editTemplate };
