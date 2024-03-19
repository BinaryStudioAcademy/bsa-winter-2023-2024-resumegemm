import { createAsyncThunk } from '@reduxjs/toolkit';
import { type TemplateGetAllItemResponseDto } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type getAllTemplatesQuery } from '../types/types.js';

const loadAllTemplates = createAsyncThunk<
    TemplateGetAllItemResponseDto[],
    getAllTemplatesQuery | undefined,
    AsyncThunkConfig
>('templates2/load-all', async (options = {}, { extra }) => {
    const { templateApi } = extra;
    const query = {
        direction: options.direction,
        filterByName: options.filterByName,
    };

    const { items } = await templateApi.getAll(query);

    return items;
});

export { loadAllTemplates };
