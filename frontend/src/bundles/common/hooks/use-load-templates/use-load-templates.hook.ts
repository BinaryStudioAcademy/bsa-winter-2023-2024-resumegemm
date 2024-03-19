import { useEffect } from 'react';
import { type TemplateDto } from 'shared/build/bundles/templates/templates';

import { loadAllTemplates } from '~/bundles/templates-page/store/actions';

import { useAppDispatch, useAppSelector } from '../hooks';

type ReturnValue = {
    templates: TemplateDto[];
};

const useLoadTemplates = (searchParameters?: URLSearchParams): ReturnValue => {
    const dispatch = useAppDispatch();
    const { templates } = useAppSelector((state) => state.templates);

    useEffect(() => {
        void dispatch(loadAllTemplates(searchParameters));
    }, [dispatch, searchParameters]);

    return {
        templates,
    };
};

export { useLoadTemplates };
