import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    type FindAllOptions,
    type TemplateGetAllItemResponseDto,
} from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

const loadAllTemplates = createAsyncThunk<
    TemplateGetAllItemResponseDto[],
    FindAllOptions | undefined,
    AsyncThunkConfig
>('templates2/load-all', async (options, { extra }) => {
    const { templateApi } = extra;
    const query = {
        direction: options?.direction ?? 'desc',
        name: options?.name ?? '',
    };

    const { items } = await templateApi.getAll(query);
    return items;
});

export { loadAllTemplates };
