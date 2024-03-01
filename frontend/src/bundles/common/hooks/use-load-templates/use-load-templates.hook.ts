import { useEffect } from 'react';
import { type TemplateDto } from 'shared/build/bundles/templates/templates';

import { loadAllTemplates } from '~/bundles/edit-temlate/store/actions';

import { DataStatus } from '../../enums/data-status.enum';
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
        if (dataStatus === DataStatus.IDLE) {
            void dispatch(loadAllTemplates());
        }
    }, [dispatch, templates, dataStatus]);

    return {
        templates,
    };
};

export { useLoadTemplates };
