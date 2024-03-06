import { type UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Properties = {
    id: UniqueIdentifier;
    children?: React.ReactNode;
};

const DraggableItem: React.FC<Properties> = ({ id, children }: Properties) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: id,
        data: {
            type: 'item',
        },
    });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
                transform: CSS.Translate.toString(transform),
                transition,
                opacity: isDragging ? 0.2 : 1,
            }}
        >
            {children}
        </div>
    );
};

export { DraggableItem };
