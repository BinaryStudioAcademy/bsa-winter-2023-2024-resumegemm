import { type UniqueIdentifier } from '@dnd-kit/core';
import { type SortingStrategy } from '@dnd-kit/sortable';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { DraggableItem } from '../draggable-item/draggable-item';
import { DropContainer } from '../drop-container/drop-container';

type Properties = {
    id: UniqueIdentifier;
    items: {
        id: UniqueIdentifier;
        item: React.ReactNode;
    }[];
    strategy?: SortingStrategy;
    className?: string;
};

const SortableContainer: React.FC<Properties> = ({
    id,
    items,
    strategy = verticalListSortingStrategy,
    className,
}: Properties) => {
    return (
        <DropContainer id={id} className={className}>
            <SortableContext
                items={items.map((item) => item.id)}
                strategy={strategy}
            >
                {items.map((item) => (
                    <DraggableItem key={item.id} id={item.id}>
                        {item.item}
                    </DraggableItem>
                ))}
            </SortableContext>
        </DropContainer>
    );
};

export { SortableContainer };
