import { createAsyncThunk } from '@reduxjs/toolkit';
import { type TemplateGetAllItemResponseDto } from 'shared/build';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

const loadAllTemplates = createAsyncThunk<
    TemplateGetAllItemResponseDto[],
    undefined,
    AsyncThunkConfig
>('templates2/load-all', async (_, { extra }) => {
    const { templatesApi2 } = extra;
    const { items } = await templatesApi2.getAll();
    return items;
});

export { loadAllTemplates };
