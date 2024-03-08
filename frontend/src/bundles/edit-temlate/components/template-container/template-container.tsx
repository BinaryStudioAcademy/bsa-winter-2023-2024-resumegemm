import { type Container } from '~/bundles/templates-page/types/types';

import { TemplateBlock } from '../template-block/template-block';

type Properties = Container;
const TemplateContainer: React.FC<Properties> = ({ id, blocks, styles }) => {
    return (
        <div key={id} style={styles}>
            {blocks.map((block) => {
                if (block.enabled) {
                    return <TemplateBlock key={block.id} {...block} />;
                }
            })}
        </div>
    );
};

export { TemplateContainer };
