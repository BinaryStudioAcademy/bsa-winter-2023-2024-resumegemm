import { type LayoutContainer } from '~/bundles/templates-page/types/types';

import { RegularBlock } from '../template-block/regular-block';

type Properties = LayoutContainer;

const RegularContainer: React.FC<Properties> = ({ blocks, styles }) => {
    return (
        <div
            style={{
                ...styles,
            }}
        >
            {blocks.map(
                (block) =>
                    block.enabled && <RegularBlock key={block.id} {...block} />,
            )}
        </div>
    );
};

export { RegularContainer };
