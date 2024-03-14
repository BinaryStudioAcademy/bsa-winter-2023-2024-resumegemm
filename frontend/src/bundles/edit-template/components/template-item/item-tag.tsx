import { useCallback } from '~/bundles/common/hooks/hooks';
import { TemplateItemTags } from '~/bundles/templates-page/enums/enums';

import { type LayoutItem } from '../../types/types';

type ItemTagProperties = Omit<LayoutItem, 'id'>;

const ItemTag: React.FC<ItemTagProperties> = ({
    name,
    tagName,
    content,
    styles,
}) => {
    const handleType = useCallback(
        (tagName: string) => {
            switch (tagName) {
                case TemplateItemTags.HEADING: {
                    return <h1 style={styles}>{content}</h1>;
                }
                case TemplateItemTags.PARAGRAPH: {
                    return <p style={styles}>{content}</p>;
                }
                case TemplateItemTags.IMAGE: {
                    return <img style={styles} src={content} alt={name} />;
                }
                default: {
                    return null;
                }
            }
        },
        [content, name, styles],
    );

    return <>{handleType(tagName)}</>;
};

export { ItemTag };
