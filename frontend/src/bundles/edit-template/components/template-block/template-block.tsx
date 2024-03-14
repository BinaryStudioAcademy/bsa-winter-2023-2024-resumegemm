import {
    type Active,
    type DragOverEvent,
    type DragStartEvent,
} from '@dnd-kit/core';
import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import {
    rectSortingStrategy,
    SortableContext,
    useSortable,
} from '@dnd-kit/sortable';
import clsx from 'clsx';
import { useCallback, useContext } from 'react';

import { useState, useTemplateSensors } from '~/bundles/common/hooks/hooks';
import { type LayoutBlock } from '~/bundles/templates-page/types/types';

import { TemplateContext } from '../../context/template-context';
import { findItemById, sortItems } from '../../helpers/sorting.helper';
import { ElementOverlay } from '../element-overlay/element-overlay';
import { RegularItem } from '../template-item/regular-item';
import { TemplateItem } from '../template-item/template-item';
import templateBlockStyles from './styles.module.scss';

type Properties = LayoutBlock;

const TemplateBlock: React.FC<Properties> = ({ id, items, styles }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useSortable({
        id: id,
        data: {
            type: 'block',
        },
    });

    const sensors = useTemplateSensors();

    const { templateSettings, setTemplateSettings } =
        useContext(TemplateContext);

    const [activeDraggable, setActiveDraggable] = useState<Active | null>(null);
    const [isOverlayShown, setIsOverlayShown] = useState(false);

    const handleDragStart = useCallback((event: DragStartEvent): void => {
        setActiveDraggable(event.active);
    }, []);

    const handleDragOver = useCallback(
        (event: DragOverEvent): void => {
            const { active, over } = event;
            if (!over) {
                return;
            }

            setTemplateSettings((templateSettings) => {
                if (active.data.current?.type === 'item') {
                    return sortItems(templateSettings, active, over);
                }
                return templateSettings;
            });
        },
        [setTemplateSettings],
    );

    const handleDragEnd = useCallback((): void => {
        setActiveDraggable(null);
    }, []);

    const handleDragOverlay = useCallback(
        (activeItem: Active) => {
            const item = findItemById(templateSettings, activeItem.id);
            if (item) {
                return <RegularItem {...item} />;
            }
        },
        [templateSettings],
    );

    const handleOnFocus = useCallback(() => {
        setIsOverlayShown(true);
    }, []);

    const handleOnBlur = useCallback(() => {
        setIsOverlayShown(false);
    }, []);

    return (
        <div
            ref={setNodeRef}
            style={styles}
            className={clsx(
                templateBlockStyles.template_block,
                isDragging && templateBlockStyles.dragging,
            )}
            {...attributes}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            id={id}
        >
            <DndContext
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                collisionDetection={closestCorners}
                sensors={sensors}
            >
                <SortableContext
                    items={items.map((item) => item.id)}
                    id={id}
                    strategy={rectSortingStrategy}
                >
                    {items.map((item) => (
                        <TemplateItem key={item.id} {...item} blockId={id} />
                    ))}
                </SortableContext>
                <DragOverlay>
                    {activeDraggable && handleDragOverlay(activeDraggable)}
                </DragOverlay>
                {isOverlayShown && !isDragging && (
                    <ElementOverlay {...listeners} />
                )}
            </DndContext>
        </div>
    );
};

export { TemplateBlock };
