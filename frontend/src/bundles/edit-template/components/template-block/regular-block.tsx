import { type LayoutBlock } from '../../types/types';
import { RegularItem } from '../template-item/regular-item';

type Properties = LayoutBlock;

const RegularBlock: React.FC<Properties> = ({ id, items, styles }) => {
    return (
        <div
            key={id}
            style={{
                ...styles,
            }}
        >
            {items.map((item) => (
                <RegularItem key={item.id} {...item} />
            ))}
        </div>
    );
};

export { RegularBlock };
