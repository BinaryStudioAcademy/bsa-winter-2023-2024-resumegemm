import { type LayoutContainer } from '~/bundles/resume/types/types';

import { ResumeEditorBlock } from '../resume-editor-block/resume-editor.block';

const ResumeEditorContainer: React.FC<LayoutContainer> = ({
    blocks,
    styles,
}) => (
    <div style={styles}>
        {blocks.map((block) => (
            <ResumeEditorBlock key={block.id} {...block} />
        ))}
    </div>
);

export { ResumeEditorContainer };
