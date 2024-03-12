import { createAsyncThunk } from '@reduxjs/toolkit';
import { type TemplateGetAllItemResponseDto } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

const loadAllTemplates = createAsyncThunk<
    TemplateGetAllItemResponseDto[],
    undefined,
    AsyncThunkConfig
>('templates2/load-all', async (_, { extra }) => {
    const { templateApi } = extra;
    const { items } = await templateApi.getAll();
    return items;
});

export { loadAllTemplates };
