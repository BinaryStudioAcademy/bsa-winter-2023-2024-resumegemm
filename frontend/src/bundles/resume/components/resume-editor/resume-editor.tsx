import { type TemplateSettings } from '../../types/types';
import { ResumeEditorContainer } from './resume-editor-container/resume-editor-container';

type ResumeEditorPayload = {
    templateSettings: TemplateSettings;
};

const ResumeEditor: React.FC<ResumeEditorPayload> = ({ templateSettings }) => (
    <div style={templateSettings.styles}>
        {templateSettings.containers.map((container) => (
            <ResumeEditorContainer key={container.id} {...container} />
        ))}
    </div>
);

export { ResumeEditor };
