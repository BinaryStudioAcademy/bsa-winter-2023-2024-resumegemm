import { ItemTag } from '~/bundles/edit-template/components/template-item/item-tag';
import { type LayoutBlock } from '~/bundles/resume/types/types';

const ResumeEditorBlock: React.FC<LayoutBlock> = ({ items, styles }) => (
    <div style={styles}>
        {items.map((item) => (
            <ItemTag key={item.id} {...item} />
        ))}
    </div>
);

export { ResumeEditorBlock };
