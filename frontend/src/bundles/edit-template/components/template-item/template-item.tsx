import { useCallback } from 'react';

import { type Item } from '~/bundles/templates-page/types/types';

type Properties = Item;

const TemplateItem: React.FC<Properties> = ({
    id,
    name,
    type,
    content,
    styles,
}) => {
    const handleType = useCallback(
        (type: string) => {
            switch (type) {
                case 'h1': {
                    return <h1>{content}</h1>;
                }
                case 'p': {
                    return <p>{content}</p>;
                }
                case 'img': {
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
            {handleType(type)}
        </div>
    );
};

export { TemplateItem };
