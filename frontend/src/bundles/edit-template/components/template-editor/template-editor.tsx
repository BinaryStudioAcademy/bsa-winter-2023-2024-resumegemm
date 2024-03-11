import { useAppSelector } from '~/bundles/common/hooks/hooks';

import { TemplateContainer } from '../template-container/template-container';
import styles from './styles.module.scss';

const TemplateEditor: React.FC = () => {
    const templateSettings = useAppSelector(
        (state) => state.editTemplate.template.templateSettings,
    );

    return (
        <div style={templateSettings.styles} className={styles.template_editor}>
            {templateSettings.containers.map((container) => (
                <TemplateContainer key={container.id} {...container} />
            ))}
        </div>
    );
};

export { TemplateEditor };
