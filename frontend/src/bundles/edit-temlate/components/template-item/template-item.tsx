import { type Item } from '~/bundles/templates-page/types/types';

type Properties = Item;

const TemplateItem: React.FC<Properties> = ({
    id,
    name,
    type,
    content,
    styles,
}) => {
    return (
        <div key={id} style={styles}>
            {type === 'h1' && <h1>{content}</h1>}
            {type === 'p' && <p>{content}</p>}
            {type === 'img' && <img src={content} alt={name} />}
        </div>
    );
};

export { TemplateItem };
