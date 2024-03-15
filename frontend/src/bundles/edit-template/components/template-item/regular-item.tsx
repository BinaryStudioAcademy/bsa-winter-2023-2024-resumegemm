import { type LayoutItem } from '../../types/types';
import { ItemTag } from './item-tag';

type Properties = Omit<LayoutItem, 'id'>;

const RegularItem: React.FC<Properties> = ({
    name,
    tagName,
    content,
    styles,
}) => {
    return (
        <div>
            <ItemTag
                name={name}
                tagName={tagName}
                content={content}
                styles={styles}
            />
        </div>
    );
};

export { RegularItem };
