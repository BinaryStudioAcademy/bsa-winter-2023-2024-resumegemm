import { useCallback } from 'react';

import { TemplateItemTags } from '~/bundles/templates-page/enums/enums';
import { type LayoutItem } from '~/bundles/templates-page/types/types';

type Properties = LayoutItem;

const TemplateItem: React.FC<Properties> = ({
    id,
    name,
    tagName,
    content,
    styles,
}) => {
    const handleType = useCallback(
        (tagName: string) => {
            switch (tagName) {
                case TemplateItemTags.HEADING: {
                    return <h1>{content}</h1>;
                }
                case TemplateItemTags.PARAGRAPH: {
                    return <p>{content}</p>;
                }
                case TemplateItemTags.IMAGE: {
                    return <img src={content} alt={name} />;
                }
                default: {
                    return null;
                }
            }
        },
        [content, name],
    );

    return (
        <div key={id} style={styles}>
            {handleType(tagName)}
        </div>
    );
};

export { TemplateItem };
