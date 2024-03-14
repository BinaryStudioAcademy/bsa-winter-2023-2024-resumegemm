import { useSortable } from '@dnd-kit/sortable';

import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { type LayoutItem } from '~/bundles/templates-page/types/types';

import { ElementOverlay } from '../element-overlay/element-overlay';
import { ItemTag } from './item-tag';
import templateItemStyles from './styles.module.scss';

type Properties = LayoutItem;
const TemplateItem: React.FC<Properties> = ({
    id,
    name,
    tagName,
    content,
    styles,
}) => {
    const { attributes, listeners, setNodeRef, isDragging } = useSortable({
        id: id,
        data: {
            type: 'item',
        },
    });

    const [isOverlayShown, setIsOverlayShown] = useState(false);

    const handleOnFocus = useCallback(
        (event: React.FocusEvent<HTMLDivElement>) => {
            event.stopPropagation();
            setIsOverlayShown(true);
        },
        [],
    );

    const handleOnBlur = useCallback(() => {
        setIsOverlayShown(false);
    }, []);

    return (
        <div
            className={templateItemStyles.template_item}
            key={id}
            style={{
                zIndex: isDragging ? 1000 : 0,
                opacity: isDragging ? 0.5 : 1,
            }}
            ref={setNodeRef}
            {...attributes}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
        >
            {isOverlayShown && <ElementOverlay {...listeners} />}
            <ItemTag
                name={name}
                tagName={tagName}
                content={content}
                styles={styles}
            />
        </div>
    );
};

export { TemplateItem };
