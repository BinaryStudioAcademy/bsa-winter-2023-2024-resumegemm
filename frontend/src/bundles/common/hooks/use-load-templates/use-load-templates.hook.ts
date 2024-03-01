import { useEffect } from 'react';
import { type TemplateDto } from 'shared/build/bundles/templates/templates';

import { loadAllTemplates } from '~/bundles/edit-temlate/store/actions';

import { useAppDispatch, useAppSelector } from '../hooks';

type ReturnValue = {
    templates: TemplateDto[];
};

const useLoadTemplates = (): ReturnValue => {
    const dispatch = useAppDispatch();
    const { templates, dataStatus } = useAppSelector(
        (state) => state.templates,
    );

    useEffect(() => {
        if (templates.length === 0 && dataStatus === 'idle') {
            void dispatch(loadAllTemplates());
        }
    }, [dispatch, templates, dataStatus]);

    return {
        templates,
    };
};

export { useLoadTemplates };
