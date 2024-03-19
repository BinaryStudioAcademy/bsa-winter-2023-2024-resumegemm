import { useEffect } from 'react';
import { type FindAllOptions } from 'shared/build';
import { type TemplateDto } from 'shared/build/bundles/templates/templates';

import { loadAllTemplates } from '~/bundles/templates-page/store/actions';

import { useAppDispatch, useAppSelector } from '../hooks';

type ReturnValue = {
    templates: TemplateDto[];
};

const useLoadTemplates = ({ name }: FindAllOptions): ReturnValue => {
    const dispatch = useAppDispatch();
    const { templates } = useAppSelector((state) => state.templates);

    useEffect(() => {
        void dispatch(loadAllTemplates({ name }));
    }, [dispatch, name]);

    return {
        templates,
    };
};

export { useLoadTemplates };
