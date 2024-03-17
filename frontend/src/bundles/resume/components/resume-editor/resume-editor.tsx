import { type Ref } from 'react';

import { type TemplateSettings } from '../../types/types';
import { ResumeEditorContainer } from './resume-editor-container/resume-editor-container';

type ResumeEditorPayload = {
    templateSettings: TemplateSettings;
    reference?: Ref<HTMLDivElement>;
};

const ResumeEditor: React.FC<ResumeEditorPayload> = ({
    templateSettings,
    reference,
}) => (
    <div ref={reference} style={templateSettings.styles}>
        {templateSettings.containers.map((container) => (
            <ResumeEditorContainer key={container.id} {...container} />
        ))}
    </div>
);

export { ResumeEditor };
