import { RegularBlock } from '~/bundles/edit-template/components/template-block/regular-block';
import { type LayoutContainer } from '~/bundles/resume/types/types';

const ResumeEditorContainer: React.FC<LayoutContainer> = ({
    blocks,
    styles,
}) => (
    <div style={styles}>
        {blocks.map((block) => (
            <RegularBlock key={block.id} {...block} />
        ))}
    </div>
);

export { ResumeEditorContainer };
