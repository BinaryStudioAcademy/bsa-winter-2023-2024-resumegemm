import { type Ref } from 'react';

import { type TemplateSettings } from '../../types/types';
import { ResumeEditorContainer } from './resume-editor-container/resume-editor-container';
import styles from './styles.module.scss';

type ResumeEditorPayload = {
    templateSettings: TemplateSettings;
    reference?: Ref<HTMLDivElement>;
};

const ResumeEditor: React.FC<ResumeEditorPayload> = ({
    templateSettings,
    reference,
}) => (
    <div className={styles.resume__editor__wrapper}>
        <div ref={reference} style={templateSettings.styles}>
            {templateSettings.containers.map((container) => (
                <ResumeEditorContainer key={container.id} {...container} />
            ))}
        </div>
    </div>
);

export { ResumeEditor };
