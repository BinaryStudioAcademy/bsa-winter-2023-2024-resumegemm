import styles from '~/bundles/edit-template/components/template-editor/styles.module.scss';

import { type TemplateSettings } from '../../types/types';
import { ResumeEditorContainer } from './resume-editor-container/resume-editor-container';

type ResumeEditorPayload = {
    templateSettings: TemplateSettings;
};

const ResumeEditor: React.FC<ResumeEditorPayload> = ({ templateSettings }) => {
    return (
        <div style={templateSettings.styles} className={styles.template_editor}>
            {templateSettings.containers.map((container) => (
                <ResumeEditorContainer key={container.id} {...container} />
            ))}
        </div>
    );
};

export { ResumeEditor };
