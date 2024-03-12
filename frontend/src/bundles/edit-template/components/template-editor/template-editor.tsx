import { forwardRef } from 'react';

import { type TemplateSettings } from '~/bundles/templates-page/types/types';

import { TemplateContainer } from '../template-container/template-container';
import styles from './styles.module.scss';

type Properties = {
    settings: TemplateSettings;
};

const TemplateEditor = forwardRef<HTMLDivElement, Properties>(
    ({ settings }, reference) => {
        return (
            <div
                style={settings.styles}
                ref={reference}
                className={styles.template_editor}
            >
                {settings.containers.map((container) => (
                    <TemplateContainer key={container.id} {...container} />
                ))}
            </div>
        );
    },
);

TemplateEditor.displayName = 'TemplateEditor';

export { TemplateEditor };
