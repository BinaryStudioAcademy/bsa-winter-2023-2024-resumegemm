import { createAsyncThunk } from '@reduxjs/toolkit';
import { type TemplateGetAllItemResponseDto } from 'shared/build';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

const loadAllTemplates = createAsyncThunk<
    TemplateGetAllItemResponseDto[],
    undefined,
    AsyncThunkConfig
>('templates/load-all', async (_, { extra }) => {
    const { templatesApi } = extra;
    const { items } = await templatesApi.getAll();
    return items;
});

export { loadAllTemplates };
