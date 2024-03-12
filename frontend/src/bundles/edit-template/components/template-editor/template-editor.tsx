import { type TemplateSettings } from '~/bundles/templates-page/types/types';

import { TemplateContainer } from '../template-container/template-container';
import styles from './styles.module.scss';

type Properties = {
    settings: TemplateSettings;
};

const TemplateEditor: React.FC<Properties> = ({ settings }) => {
    return (
        <div style={settings.styles} className={styles.template_editor}>
            {settings.containers.map((container) => (
                <TemplateContainer key={container.id} {...container} />
            ))}
        </div>
    );
};

export { TemplateEditor };
