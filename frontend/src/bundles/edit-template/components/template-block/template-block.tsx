import { type LayoutBlock } from '~/bundles/templates-page/types/types';

import { TemplateItem } from '../template-item/template-item';

type Properties = LayoutBlock;

const TemplateBlock: React.FC<Properties> = ({ id, items, styles }) => {
    return (
        <div key={id} style={styles}>
            {items.map((item) => (
                <TemplateItem key={item.id} {...item} />
            ))}
        </div>
    );
};

export { TemplateBlock };