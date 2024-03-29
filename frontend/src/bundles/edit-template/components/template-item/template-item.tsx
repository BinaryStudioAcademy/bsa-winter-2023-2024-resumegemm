import { useSortable } from '@dnd-kit/sortable';
import clsx from 'clsx';

import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { type LayoutItem } from '~/bundles/templates-page/types/types';

import { ElementOverlay } from '../element-overlay/element-overlay';
import { ItemTag } from './item-tag';
import templateItemStyles from './styles.module.scss';

type Properties = LayoutItem & {
    blockId: string;
};
const TemplateItem: React.FC<Properties> = ({
    id,
    name,
    tagName,
    content,
    styles,
    blockId,
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

    const onOverlayClick = useCallback(() => {
        document.querySelector<HTMLDivElement>(`#${blockId}`)?.focus();
    }, [blockId]);

    return (
        <div
            className={clsx(
                templateItemStyles.template_item,
                isDragging && templateItemStyles.dragging,
            )}
            key={id}
            ref={setNodeRef}
            {...attributes}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
        >
            {isOverlayShown && !isDragging && (
                <ElementOverlay
                    {...listeners}
                    onOverlayClick={onOverlayClick}
                />
            )}
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
